use worker::Router;

mod category;
mod login;
mod post;

pub fn route(router: Router<()>) -> Router<()> {
    login::route(post::route(category::route(router)))
}
