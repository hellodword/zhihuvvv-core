#!/bin/bash

set -e
set -x

assert(){
    if [[ -z "$2" ]]; then
        echo "no $1"
        exit 1
    fi
}

assert CLOUDFLARE_ACCOUNT_ID "$CLOUDFLARE_ACCOUNT_ID"
assert CLOUDFLARE_API_TOKEN "$CLOUDFLARE_API_TOKEN"
assert CLOUDFLARE_KV_NAME "$CLOUDFLARE_KV_NAME"
assert CLOUDFLARE_KV_ID "$CLOUDFLARE_KV_ID"

cp template.wrangler.toml wrangler.toml
sed -i "s/CLOUDFLARE_KV_NAME/$CLOUDFLARE_KV_NAME/" wrangler.toml
sed -i "s/CLOUDFLARE_KV_ID/$CLOUDFLARE_KV_ID/" wrangler.toml
