
# Horseman CMS 🎃

Self hosted Headless CMS on cloudflare platform. The front-end can be switched to any other and you can just use the worker part. Currently front-end is not mobile friendly (or just overall responsive). The purpose of the front-end is just to show what you can do, not to be production ready solution.

## Used technologies
At first I wanted to use reason or elm as my front-end language, but in the end i chose Typescript, React and Tailwind as my main stack. The whole design was done in Figma even tho I'm terrible at colors with my color-blindness.

#### Front-end
- React
- Typescript
- Tailwind - Styling
- Recoil - Manage state
- Slate - Customizable framework for building rich text editors

- deployed on Cloudflare pages

#### Back-end
- Rust

- deployed on Cloudflare workers with worker KV


## About this project

I created this project for Cloudflare Developer Summer Challenge and to see if I can create Headless CMS in 4 days on platform I never developed on. The plan was to create simple Headless CMS for blogs that can anyone setup or customize. The whole back-end is one cloudflare worker written in Rust 🦀 and uses 2 KV stores. The whole project needed about 2-3 days to be what I wanted it to be, but it is what it is.

<img alt="office" src="https://www.dictionary.com/e/wp-content/uploads/2018/12/it-is-what-it-is-6.jpg" width="200">

The name Horseman CMS because I finished the project 31.11. and the main theme of halloween is Headless Horseman so i chose this name for my Headless CMS. Overall i enjoyed working with workers because I don't have to setup whole server, but error unfortunately handling sucks right now ☹.

## How to setup

All of this could probably be done using setup script that I don't have time to write 😅.

requirements
- wrangler (`$ npm i @cloudflare/wrangler -g` or `$ cargo install wrangler`)
- Cloudflare account (free account is ok)

Pull the repo.

`$ wrangler secret put JWT_SECRET`

then enter secret to be used by CMS.

`$ wrangler secret put PASSWORD`

then enter password used for loging into cms

After this create wrangler.toml file in root of worker folder with contents:
```
name = "horseman-cms-worker"
type = "javascript"
account_id = "295c434ac7687fdcbe66a24d6569dd5f"
workers_dev = true
compatibility_date = "2021-10-28"
compatibility_flags = [ "formdata_parser_supports_files" ] # required

kv_namespaces = [
    { binding = "POSTS", id = $POSTS },
    { binding = "MISCS", id = $MISCS }
]

[vars]
EMAIL = $EMAIL

[build]
command = "cargo install -q worker-build && worker-build --release" # required

[build.upload]
dir    = "build/worker"
format = "modules"
main   = "./shim.mjs"

[[build.upload.rules]]
globs = ["**/*.wasm"]
type  = "CompiledWasm"


```
and fill $EMAIL with email address you want to log in.

```
$ wrangler kv:namespace create "POSTS"
$ wrangler kv:namespace create "MISCS"
```
and fill $POSTS and $MISCS in wranler.toml with returned ids from these commands.

And some database initilization
`$ wrangler kv:key put --binding= "categories" "[]"`

and as last step do `wrangler publish`🎉✨🎉

Front-end part is just classic React based site that you can host on Cloudflare pages.


## API docs

Can be seen in API.yaml

## Known bugs

Front-end of the cms sometimes does not refresh the lists after you add something.

It does not log you out if you do not have jwt token (you have to go back to login to get it)