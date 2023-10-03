import { Env } from "./env";

import { tokenSave } from "./kv";
import { regDevice, regToken } from "./zhihu/init";


export default async function scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    const device = await regDevice();
    const token = await regToken(device);
    const tokenStr = await tokenSave(env, token);

    console.log(`trigger fired at ${event.cron}: ${tokenStr}`);
}