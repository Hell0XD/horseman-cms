use worker::{Response, Router};

use crate::{
    auth::is_admin,
    cors::Cors,
    types::{Categories, Category},
};

pub fn route(router: Router<()>) -> Router<()> {
    router
        .get_async("/category", |_reg, ctx| async move {
            Response::ok(
                ctx.kv("MISCS")?
                    .get("categories")
                    .await?
                    .unwrap()
                    .as_string(),
            )?
            .allow_cors("*")
        })
        .delete_async("/category/:category", |req, ctx| async move {
            if let Err(msg) = is_admin(&req, &ctx) {
                return Response::error(msg, 401)?.allow_cors("*");
            }

            let category = ctx.param("category").unwrap();

            let kv = ctx.kv("MISCS")?;

            let mut categories = kv
                .get("categories")
                .await?
                .unwrap()
                .as_json::<Categories>()?;

            if let Some(i) = categories.iter().position(|cat| cat == category) {
                categories.remove(i);
            }

            kv.put("categories", serde_json::to_string(&categories)?)
                .unwrap()
                .execute()
                .await?;

            Response::empty()?.allow_cors("*")
        })
        .post_async("/category", |mut req, ctx| async move {
            if let Err(msg) = is_admin(&req, &ctx) {
                return Response::error(msg, 401)?.allow_cors("*");
            }

            let Category { name } = req.json::<Category>().await?;

            let kv = ctx.kv("MISCS")?;

            let mut categories = kv
                .get("categories")
                .await?
                .unwrap()
                .as_json::<Categories>()?;

            categories.push(name);

            kv.put("categories", serde_json::to_string(&categories)?)
                .unwrap()
                .execute()
                .await?;

            return Response::empty()?.allow_cors("*");
        })
}
