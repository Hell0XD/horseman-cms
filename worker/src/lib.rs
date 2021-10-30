use routes::route;
use worker::*;

mod auth;
mod cors;
mod jwt;
mod routes;
mod types;
mod utils;

fn log_request(req: &Request) {
    console_log!(
        "{} - [{}], located at: {:?}, within: {}",
        Date::now().to_string(),
        req.path(),
        req.cf().coordinates().unwrap_or_default(),
        req.cf().region().unwrap_or("unknown region".into())
    );
}

#[event(fetch)]
pub async fn fetch(req: Request, env: Env) -> Result<Response> {
    log_request(&req);

    utils::set_panic_hook();

    return main(req, env).await;
}

fn preflight_response(_headers: &worker::Headers) -> Result<Response> {
    let mut headers = worker::Headers::new();
    headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    )?;
    headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")?;
    headers.set("Access-Control-Allow-Origin", "*")?;

    headers.set("Access-Control-Max-Age", "86400")?;
    Ok(Response::empty()
        .unwrap()
        .with_headers(headers)
        .with_status(204))
}

async fn main(req: Request, env: Env) -> Result<Response> {
    let router = Router::new();

    if req.method() == Method::Options {
        return preflight_response(req.headers());
    }

    route(router).run(req, env).await
}
