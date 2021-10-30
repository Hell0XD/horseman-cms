
const base_url = (!process.env.NODE_ENV || process.env.NODE_ENV === "development") ? "http://127.0.0.1:8787" : "https://horseman-cms-worker.max-muller.workers.dev";

function object2URLparams(obj: {[key: string]: any}) {
    return Object.entries(obj).map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val.toString())}`).join("&");
}

interface Post {
    name: string;
    content: string;
    category?: string;
    date: string; // seconds since epoch 
}

export interface apiGetPostsBody {
    limit?: number;
    offset?: number;
    name?: string;
}

export interface Posts {
    name: string;
    category?: string;
    date: string; // seconds since epoch 
}

export const apiGetPosts = (body: apiGetPostsBody): Promise<Array<Posts>> =>
    fetch(`${base_url}/post?${object2URLparams(body)}`, {
        method: "GET",
        mode: "cors",
    }).then(response => response.json());


export const apiGetPost = (name: string): Promise<Post> => 
    fetch(`${base_url}/post/${encodeURIComponent(name)}}`, {
        method: "GET",
        mode: "cors",
    }).then(response => response.json());

interface apiNewPostBody {
    name: string;
    content: string;
    category?: string;
    date: string;
}

export const apiNewPost = (body: apiNewPostBody, jwt: string) => 
    fetch(`${base_url}/post`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(body)
    });

export const apiDeletePost = (name: string, jwt: string) => 
    fetch(`${base_url}/post/${name}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    });


export const apiGetCategories = (): Promise<Array<string>> => 
    fetch(`${base_url}/category`, {
        method: "GET",
        mode: "cors",
    }).then(r => r.json());

export const apiNewCategory = (name: string, jwt: string) =>
    fetch(`${base_url}/category`, {
        method: "POST",
        mode: "cors",
        body: `{"name":"${name}"}`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    });

export const apiDeleteCategory = (name: string, jwt: string) =>
    fetch(`${base_url}/category/${name}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });


interface apiLoginBody {
    email: string;
    password: string;
}

export const apiLogin = (body: apiLoginBody) => 
    fetch(`${base_url}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((res) => res.headers.get("authorization")?.replace("Bearer ", ""));

export const apiIsLoged = (jwt: string): Promise<boolean> =>
    fetch(`${base_url}/is-loged`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }).then(res => res.json()).then((b: boolean) => b);