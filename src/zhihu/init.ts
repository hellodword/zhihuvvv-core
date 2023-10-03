import { HmacSHA1 } from '../utils/crypto';
import { Device, TokenResponse, DeviceResponse, Token } from '../types';

// TODO refactor

const x_app_id = 1355;
const x_sign_version = 2;
const x_sign_key = 'dd49a835-56e7-4a0f-95b5-efd51ea5397f';
const x_api_version = '3.0.66'; //   "x-api-version": "3.0.66",
const appBuild = 528;
const appVersion = '5.0.0';
const pkgName = 'com.zhihu.android';
const bundleId = pkgName;


export async function regDevice(): Promise<Device> {

    // @Key(value="app_build") public String appBuild;
    // @Key(value="app_version") public String appVersion;
    // @Key(value="bt_ck") public int bluetoothCheck;
    // @Key(value="bundle_id") public String bundleId;
    // @Key(value="cp_ct") public int cpuCount;
    // @Key(value="cp_fq") public String cpuFrequency;
    // @Key(value="cp_tp") public String cpuType;
    // @Key(value="cp_us") public String cpuUsage;
    // @Key(value="device_token") public String deviceToken;
    // @Key(value="d_n") public String deviceUsername;
    // @Key(value="fr_mem") public int freeMemory;
    // @Key(value="fr_st") public int freeStorage;
    // @Key(value="icid") public String icid;
    // @Key(value="idfa") public String idfa;
    // @Key(value="im_e") public String imei;
    // @Key(value="im_s") public String imsi;
    // @Key(value="mc_ad") public String macAddress;
    // @Key(value="mcc") public String mcc;
    // @Key(value="mnc") public String mnc;
    // @Key(value="nt_st") public int notiSettings;
    // @Key(value="ph_br") public String phoneBrand;
    // @Key(value="ph_md") public String phoneModel;
    // @Key(value="ph_os") public String phoneOs;
    // @Key(value="ph_sn") public String phoneSN;
    // @Key(value="pvd_nm") public String providerName;
    // @Key(value="tz_of") public long timezoneOffset;
    // @Key(value="tt_mem") public int totalMemory;
    // @Key(value="tt_st") public int totalStorage;
    // @Key(value="uuid") public String uuid;

    const freeStorage = Math.round(Math.random() * 9000) + 1000;
    const bluetoothCheck = Math.floor(Math.random() * (1 + 1));// 0/1
    const cpuCount = 4 + 4 * Math.floor(Math.random() * (1 + 1));// 4/8
    const cpuFrequency = (Math.round(Math.random() * 5000) + 18000) * 100;
    const cpuUsage = ((Math.round(Math.random() * 8888) + 1000) / 100).toFixed(2);
    const freeMemory = Math.round(Math.random() * 60) + 10;

    let phoneSN = Array.prototype.map.call(new TextEncoder().encode(Math.random().toString(36)), x => ('00' + x.toString(16)).slice(-2)).join('').slice(-16);


    // const payload = `app_build=${appBuild}&app_version=${appVersion}&bt_ck=${bluetoothCheck}&bundle_id=${bundleId}&cp_ct=${cpuCount}&cp_fq=${cpuFrequency}&cp_tp=ARMv7+Processor+rev+0+%28v7l%29&cp_us=${cpuUsage}&d_n=PIXEL+2+XL&fr_mem=${freeMemory}&fr_st=${freeStorage}&mc_ad=02%3A00%3A00%3A00%3A00%3A00&mcc&nt_st=1&ph_br=google&ph_md=PIXEL+2+XL&ph_os=Android+7.1.2&ph_sn=${phoneSN}&pvd_nm&tt_mem=40&tt_st=12853&tz_of=28800`;

    let searchParams = new URLSearchParams('');
    searchParams.set('app_build', '' + appBuild);
    searchParams.set('app_version', '' + appVersion);
    searchParams.set('bt_ck', '' + bluetoothCheck);
    searchParams.set('bundle_id', '' + bundleId);
    searchParams.set('cp_ct', '' + cpuCount);
    searchParams.set('cp_fq', '' + cpuFrequency);
    searchParams.set('cp_tp', 'ARMv7 Processor rev 0 (v7l)');
    searchParams.set('cp_us', '' + cpuUsage);
    searchParams.set('d_n', 'PIXEL 2 XL');
    searchParams.set('fr_mem', '' + freeMemory);
    searchParams.set('fr_st', '' + freeStorage);
    searchParams.set('mc_ad', '02:00:00:00:00:00');
    searchParams.set('mcc', '');
    searchParams.set('nt_st', '1');
    searchParams.set('ph_br', 'google');
    searchParams.set('ph_md', 'PIXEL 2 XL');
    searchParams.set('ph_os', 'Android 7.1.2');
    searchParams.set('ph_sn', phoneSN);
    searchParams.set('pvd_nm', '');
    searchParams.set('tt_mem', '' + 40);
    searchParams.set('tt_st', '' + 12853);
    searchParams.set('tz_of', '' + 28800);

    const payload = searchParams.toString();

    // Mozilla/5.0 (Linux; Android 7.1.2; PIXEL 2 XL Build/NOF26V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 10; Pixel Build/QP1A.190711.019; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 8.1.0; Pixel Build/OPM4.171019.021.P1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 7.1.1; Pixel Build/NOF26V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 8.1.0; Pixel Build/OPM1.171019.021) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 9; Pixel Build/PPR2.180905.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 10; Pixel Build/QP1A.191005.007.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.162 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 10; Pixel Build/QP1A.191005.007.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.149 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 8.0.0; Pixel Build/OPR6.170623.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 10; Pixel Build/QP1A.191005.007.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 8.0.0; Pixel Build/OPR3.170623.008) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 9; Pixel Build/PQ2A.190405.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.136 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 8.0.0; Pixel Build/OPR3.170623.013) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36
    // Mozilla/5.0 (Linux; Android 8.0.0; Pixel Build/OPR6.170623.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.125 Mobile Safari/537.36

    const ua = 'Mozilla/5.0 (Linux; Android 7.1.2; PIXEL 2 XL Build/NOF26V; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/72.0.3626.121 Mobile Safari/537.36';

    const ts = '' + Math.floor(+new Date() / 1000);

    const sign = await HmacSHA1('' + x_app_id + x_sign_version + payload + ts, x_sign_key);


    try {
        let res: DeviceResponse = await fetch('https://appcloud.zhihu.com/v1/device', {

            method: 'POST',
            headers: {

                'User-Agent': ua,
                'x-app-id': '' + x_app_id,
                'x-req-ts': ts,
                'x-sign-version': '' + x_sign_version,// '2',
                'x-req-signature': sign,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'Keep-Alive',
            },
            body: payload,

        }).then(r => {
            return r.json();
        });

        return { sn: phoneSN, udid: res.udid, ua: ua };
    } catch (error) {
        return Promise.reject(error);
    }

}



export async function regToken(data: Device): Promise<Token> {

    try {
        const payload = `source=${pkgName}`;

        let headers = {
            'x-api-version': x_api_version,
            'x-app-version': appVersion,
            'x-app-build': 'release',
            'x-network-type': 'WiFi',
            'x-udid': data.udid,
            'x-app-za': `OS=Android&Release=7.1.2&Model=PIXEL+2+XL&VersionName=${appVersion}&VersionCode=${appBuild}&Width=1080&Height=1776&Installer=%E8%B1%8C%E8%B1%86%E8%8D%9A&WebView=44.0.2403.117`,
            'User-Agent': data.ua,
        };
        let res: TokenResponse = await fetch('https://api.zhihu.com/guests/token', {

            method: 'POST',
            headers: {
                ...headers,
                'x-app-id': '' + x_app_id,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'Keep-Alive',
            },
            body: payload,

        }).then(r => {
            return r.json();
        });

        return {
            access_token: res.access_token,
            device: data,
            headers: {
                ...headers,
                'Authorization': `Bearer ${res.access_token}`,
            },
        };
    } catch (error) {
        return Promise.reject(error);
    }

}
