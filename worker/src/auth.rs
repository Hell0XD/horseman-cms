use worker::{Request, Response, Result as WorkerResult, RouteContext};

use crate::jwt;

pub trait GetAuth {
    fn get_auth(&self) -> Option<String>;
}

impl GetAuth for Request {
    fn get_auth(&self) -> Option<String> {
        self.headers()
            .get("Authorization")
            .unwrap()
            .map(|s| s.trim_start_matches("Bearer ").to_owned())
    }
}

pub trait SetAuth
where
    Self: Sized,
{
    fn set_auth(self, jwt: &str) -> WorkerResult<Self>;
}

impl SetAuth for Response {
    fn set_auth(mut self, jwt: &str) -> WorkerResult<Self> {
        let headers = self.headers_mut();
        headers.set("Authorization", &format!("Bearer {}", jwt))?;

        Ok(self)
    }
}

pub fn is_admin(req: &Request, ctx: &RouteContext<()>) -> Result<(), &'static str> {
    let jwt = req.get_auth().ok_or("Auth token is missing")?;

    jwt::decode(&jwt, &ctx).map_err(|_| "Invalid Auth token")?;
    Ok(())
}
