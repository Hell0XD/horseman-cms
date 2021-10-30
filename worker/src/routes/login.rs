use worker::{Response, Router};

use crate::{
    auth::{is_admin, SetAuth},
    cors::Cors,
    jwt::{self, JWTClaims},
    types::User,
};

pub fn route(router: Router<()>) -> Router<()> {
    router
        .post_async("/login", |mut req, ctx| async move {
            let User { email, password } = req.json::<User>().await?;

            if email == ctx.var("EMAIL")?.to_string()
                && password == ctx.secret("PASSWORD")?.to_string()
            {
                Response::empty()?
                    .allow_cors("*")?
                    .set_auth(&jwt::new(JWTClaims { email }, &ctx))
            } else {
                Response::error("Incorrect credentials", 401)?.allow_cors("*")
            }
        })
        .get("/is-loged", |req, ctx| {
            Response::ok(is_admin(&req, &ctx).is_ok().to_string())?.allow_cors("*")
        })
}
