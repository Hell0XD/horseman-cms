use worker::{Response, Result};

pub trait Cors
where
    Self: Sized,
{
    fn allow_cors(self, allowed: &str) -> Result<Self>;
}

impl Cors for Response {
    fn allow_cors(mut self, allowed: &str) -> Result<Self> {
        let headers = self.headers_mut();
        headers.set("Access-Control-Allow-Credentials", "true")?;
        headers.set("Access-Control-Allow-Origin", allowed)?;
        headers.set("Access-Control-Expose-Headers", " authorization")?;

        Ok(self)
    }
}
