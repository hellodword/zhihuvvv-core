export async function HmacSHA1(message: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const secretKeyData = encoder.encode(key);
    const k = await crypto.subtle.importKey(
        "raw",
        secretKeyData,
        { name: "HMAC", hash: "SHA-1" },
        false,
        ["sign"]
    );
    const mac = await crypto.subtle.sign(
        "HMAC",
        k,
        encoder.encode(message)
    );
    return [...new Uint8Array(mac)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}