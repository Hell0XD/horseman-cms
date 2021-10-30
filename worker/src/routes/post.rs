use std::borrow::Borrow;

use serde_json::json;
use worker::{Response, Router};

use crate::{
    auth::is_admin,
    cors::Cors,
    types::{Categories, Post, PostMetadata},
};

pub fn route(router: Router<()>) -> Router<()> {
    router
        .get_async("/post", |req, ctx| async move {
            let url = req.url()?;
            let query = url.query_pairs();

            let mut limit: Option<u32> = None;
            let mut offset: Option<u32> = None;
            let mut name: Option<String> = None;
            let mut category: Option<String> = None;

            for q in query {
                match q.0.borrow() {
                    "limit" => limit = Some(q.1.parse().map_err(|_| "limit has be a number")?),
                    "offset" => {
                        offset = Some(q.1.parse().map_err(|_| "offset has to be a number")?)
                    }
                    "name" => name = Some(q.1.to_string()),
                    "category" => category = Some(q.1.to_string()),
                    _ => (),
                }
            }

            let mut builder = ctx.kv("POSTS")?.list();

            if let Some(name) = name {
                builder = builder.prefix(name);
            }

            let mut keys: Vec<_> = builder
                .execute()
                .await?
                .keys
                .into_iter()
                .filter_map(|key| {
                    let val = key.metadata.as_ref().unwrap().as_object().unwrap();
                    let cat = val.get("category").unwrap().as_str().unwrap();
                    if let Some(category) = &category {
                        if category != cat {
                            return None;
                        }
                    }
                    let date = val.get("date").unwrap().as_str().unwrap();

                    Some((key.name, cat.to_string(), date.to_string()))
                })
                .collect();

            keys.sort_by(|a, b| a.2.cmp(&b.2));

            let values: Vec<_> = keys
                .into_iter()
                .map(|(name, category, date)| {
                    if category.is_empty() {
                        json!({
                            "name": name,
                            "date": date,
                        })
                    } else {
                        json!({
                            "name": name,
                            "date": date,
                            "category": category
                        })
                    }
                })
                .skip(offset.unwrap_or(0) as usize)
                .take(limit.unwrap_or(1000) as usize)
                .map(|val| val.to_string())
                .collect();

            Response::ok(format!("[{}]", values.join(",")))?.allow_cors("*")
        })
        .get_async("/post/:name", |_req, ctx| async move {
            Response::from_json(
                &ctx.kv("POSTS")?
                    .get_with_metadata::<PostMetadata>(
                        &ctx.param("name").unwrap().replace("%20", " "),
                    )
                    .await?
                    .ok_or("Post with this name does not exist")
                    .map(|(v, metadata)| {
                        if metadata.category.is_empty() {
                            json!({
                                "content": v.as_string(),
                                "date": metadata.date,
                            })
                        } else {
                            json!({
                                "content": v.as_string(),
                                "category": metadata.category,
                                "date": metadata.date,
                            })
                        }
                    })?,
            )?
            .allow_cors("*")
        })
        .delete_async("/post/:name", |req, ctx| async move {
            if let Err(err) = is_admin(&req, &ctx) {
                return Response::error(err, 401)?.allow_cors("*");
            }

            ctx.kv("POSTS")?.delete(ctx.param("name").unwrap()).await?;
            Response::empty()?.allow_cors("*")
        })
        .post_async("/post", |mut req, ctx| async move {
            if let Err(msg) = is_admin(&req, &ctx) {
                return Response::error(msg, 401)?.allow_cors("*");
            }

            let Post {
                name,
                content,
                category,
                date,
            } = req.json().await?;

            if !category.is_empty() {
                if let Option::Some(value) = ctx.kv("MISCS")?.get("categories").await? {
                    if value
                        .as_json::<Categories>()?
                        .into_iter()
                        .find(|cat| cat == &category)
                        .is_none()
                    {
                        return Response::error("Unknown category", 422)?.allow_cors("*");
                    }
                }
            }

            ctx.kv("POSTS")?
                .put(&name, &content)?
                .metadata::<PostMetadata>(PostMetadata { category, date })?
                .execute()
                .await?;

            Response::empty()?.allow_cors("*")
        })
}
