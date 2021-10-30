use jwt_compact::{
    alg::{Hs256, Hs256Key},
    Claims, Header,
};
use jwt_compact::{AlgorithmExt, Token, UntrustedToken};
use serde::{Deserialize, Serialize};
use worker::RouteContext;

#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct JWTClaims {
    pub email: String,
}

pub fn new(claims: JWTClaims, ctx: &RouteContext<()>) -> String {
    let key = Hs256Key::new(ctx.secret("JWT_SECRET").unwrap().to_string());
    let header = Header::default();
    let claims = Claims::new(claims);
    Hs256.token(header, &claims, &key).unwrap()
}

pub fn decode(token_string: &str, ctx: &RouteContext<()>) -> Result<Token<JWTClaims>, ()> {
    let key = Hs256Key::new(ctx.secret("JWT_SECRET").unwrap().to_string());
    let token = UntrustedToken::new(&token_string).map_err(|_| ())?;
    let token: Token<JWTClaims> = Hs256.validate_integrity(&token, &key).map_err(|_| ())?;
    Ok(token)
}
