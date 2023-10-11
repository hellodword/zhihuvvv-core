#!/bin/bash

set -e
set -x

cd $PWD

assert(){
    if [[ -z "$2" ]]; then
        echo "no $1"
        exit 1
    fi
}

assert CLOUDFLARE_ACCOUNT_ID "$CLOUDFLARE_ACCOUNT_ID"
assert CLOUDFLARE_API_TOKEN "$CLOUDFLARE_API_TOKEN"
assert CLOUDFLARE_KV_NAME "$CLOUDFLARE_KV_NAME"

wrangler kv:namespace list | grep -A 2 -B 2 "\"worker-$CLOUDFLARE_KV_NAME\"" || \
wrangler kv:namespace create "$CLOUDFLARE_KV_NAME"
