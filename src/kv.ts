import { generate } from "xksuid";

import { Token } from "./types";
import { Env } from "./env";


export async function tokenSave(env: Env, token: Token): Promise<string> {
    const tokenStr = JSON.stringify(token);
    await env.ZHIHUVVV.put(generate(true), tokenStr, { expirationTtl: 60 * 60 * 24 * 60 });
    return tokenStr;
}

export async function tokenGet(env: Env): Promise<Token | undefined> {
    const list = await env.ZHIHUVVV.list({ limit: 100 });
    const keys = list.keys;

    if (!keys || keys.length <= 0) {
        return;
    }

    const index = Math.floor(Math.random() * (keys.length));
    const name = keys[index].name;
    const value = await env.ZHIHUVVV.get(name);
    if (!value) {
        return;
    }

    const token: Token = JSON.parse(value);
    return token;
}