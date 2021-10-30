use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Category {
    pub name: String,
}

#[derive(Deserialize)]
pub struct User {
    pub email: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct Post {
    pub name: String,
    pub content: String,
    #[serde(default)]
    pub category: String,
    pub date: String,
}

pub type Categories = Vec<String>;

#[derive(Deserialize, Serialize)]
pub struct PostMetadata {
    pub category: String,
    pub date: String,
}
