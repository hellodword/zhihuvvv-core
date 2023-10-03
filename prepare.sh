#!/bin/bash

set -e
set -x

source ".env"

assert(){
    if [[ -z "$2" ]]; then
        echo "no $1"
        exit 1
    fi
}

assert CLOUDFLARE_ACCOUNT_ID "$CLOUDFLARE_ACCOUNT_ID"
assert CLOUDFLARE_API_TOKEN "$CLOUDFLARE_API_TOKEN"
assert CLOUDFLARE_KV_ID "$CLOUDFLARE_KV_ID"
# assert CF_ZONE_ID "$CF_ZONE_ID"
# assert CF_ROUTE "$CF_ROUTE"

cp template.wrangler.toml wrangler.toml
sed -i "s/CLOUDFLARE_KV_ID/$CLOUDFLARE_KV_ID/" wrangler.toml
