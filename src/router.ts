import { Router, json } from 'itty-router';
import { StatusCodes } from 'http-status-codes';
import { createCors } from 'itty-cors';

import { Env } from "./env";

import { regDevice, regToken } from './zhihu/init';
import { tokenGet, tokenSave } from './kv';


const helpRedirect = () => {
    return Response.redirect('https://github.com/REToys/xhu', StatusCodes.MOVED_PERMANENTLY);
};

const defaultPageNotFound = () => {
    return json({}, { status: StatusCodes.NOT_FOUND });
};

const defaultInternalServerError = () => {
    return json({}, { status: StatusCodes.INTERNAL_SERVER_ERROR });
};


const removeResponseHeaders = (response: Response): Response => {
    if (!response) {
        throw new Error('No fetch handler responded and no upstream to proxy to specified.');
    }

    const { headers, status, statusText, body } = response;

    if (status === 101) return response; // bypass for protocol shifts

    let newHeaders = new Headers();

    for (const pair of headers.entries()) {

        if (pair[0].toLowerCase().indexOf('content-') === 0
            // https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Standard_response_fields
            || [
                'Accept-CH',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Credentials',
                'Access-Control-Expose-Headers',
                'Access-Control-Max-Age',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers',
                'Accept-Patch',
                'Accept-Ranges',
                'Age',
                'Allow',
                'Alt-Svc',
                'When',
                'Cache-Control',
                'Connection',
                'Must',
                'Content-Disposition',
                'Content-Encoding',
                'Content-Language',
                'Content-Length',
                'Content-Location',
                'Content-MD',
                'Content-Range',
                'Content-Type',
                'Date',
                'Delta-Base',
                // 'ETag',
                'Expires',
                'IM',
                'Last-Modified',
                'Link',
                'Location',
                'Pragma',
                'Preference-Applied',
                'Proxy-Authenticate',
                'Public-Key-Pins',
                'Retry-After',
                'Permanent',
                'Server',
                // 'Set-Cookie',
                'Strict-Transport-Security',
                'Trailer',
                'Transfer-Encoding',
                'Must',
                'Tk',
                'Upgrade',
                'Must',
                'Vary',
                'Via',
                'Warning',
                'WWW-Authenticate',
                'X-Frame-Options'
            ].findIndex(element => { return element.toLowerCase() === pair[0].toLowerCase(); }) !== -1) {

            newHeaders.append(pair[0], pair[1]);

        }
    }

    return new Response(body, {
        status,
        statusText,
        headers: newHeaders,
    })
}


const { preflight, corsify } = createCors({
    origins: ['*'],
})
const router = Router();

router
    .all('*', preflight)

    .get('/', helpRedirect)
    .get('/help', helpRedirect)
    .get('/git', helpRedirect)
    .get('/github', helpRedirect)
    .get('/readme', helpRedirect)

    .get('/appcloud/v1/device', async (req: Request, env: Env) => {
        // const device = await regDevice();
        // return corsify(new Response(JSON.stringify(device), {
        //     headers: { 'Content-Type': 'application/json' },
        // }));
        return corsify(json({}));
    })
    .get('/guests/token', async (req: Request, env: Env) => {
        const device = await regDevice();
        const token = await regToken(device);
        const tokenStr = await tokenSave(env, token);
        return corsify(json(token));
    })

    /*
        let h = 0 === r.pathname.toLowerCase().indexOf('/v2/') ? '' : 'appview=1&', f = {
                content_padding_top: t.content_padding_top ? t.content_padding_top : 0,
                content_padding_bottom: t.content_padding_bottom ? t.content_padding_bottom : 0,
                content_padding_left: t.content_padding_left ? t.content_padding_left : 0,
                content_padding_right: t.content_padding_right ? t.content_padding_right : 0,
                title_font_size: t.title_font_size ? t.title_font_size : 22,
                body_font_size: t.body_font_size ? t.body_font_size : 16,
                is_dark_theme: !!t.is_dark_theme,
                can_auto_load_image: !!t.can_auto_load_image,
                app_info: `OS=Android&Release=6.0.1&Model=Nexus+5&VersionName=${ s.appVersion }&VersionCode=${ s.appBuild }&Width=1080&Height=1776&Installer=%E8%B1%8C%E8%B1%86%E8%8D%9A&WebView=44.0.2403.117`,
                font_resize: t.font_resize ? `${ t.font_resize }` : '1.00',
                is_enable_double_click_voteup: t.is_enable_double_click_voteup ? 1 : 0,
                'X-AD': 'canvas_version:v=3.0'
            };
        h += 'config=' + encodeURIComponent(JSON.stringify(f)), r.search = h, r.host = 'www.zhihu.com', r.protocol = 'https:';
        let g = r.toString();
        return g = g.replace(/\/+$/, ''), await d(g, p, i, n);
    */
    .get('/appview', () => corsify(defaultPageNotFound()))
    .get('/appview/*', () => corsify(defaultPageNotFound()))
    .get('/appviewvvv', () => corsify(defaultPageNotFound()))
    .get('/appviewvvv/*', () => corsify(defaultPageNotFound()))
    // .get('/appviewvvv/*', async (req: Request, env: Env) => {
    //     const token = await tokenGet(env);
    //     if (!token) {
    //         return corsify(defaultInternalServerError());
    //     }

    //     const url = new URL(req.url);
    //     url.host = 'www.zhihu.com';
    //     url.protocol = 'https:';
    //     url.pathname = url.pathname.replace(/^\/appviewvvv/, '/appview');

    //     return corsify(await fetch(url.toString(), {
    //         headers: {
    //             'User-Agent': token.headers['User-Agent'],
    //         },
    //     }));
    // })

    .get('*', async (req: Request, env: Env) => {
        const token = await tokenGet(env);
        if (!token) {
            return corsify(defaultInternalServerError());
        }

        const url = new URL(req.url);
        url.host = 'api.zhihu.com';
        url.protocol = 'https:';

        return corsify(removeResponseHeaders(await fetch(url.toString(), {
            headers: token.headers,
        })));
    });

export default router.handle;
