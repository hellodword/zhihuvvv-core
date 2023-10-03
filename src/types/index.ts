export interface Device {
    sn: string
    udid: string
    ua: string
}

export interface Token {
    access_token: string
    device: Device
    headers: { [key: string]: string };
}

export interface DeviceResponse {
    udid: string
}


export interface TokenResponse {
    access_token: string
}