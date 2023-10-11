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

wrangler deploy ./src/index.ts

sleep 2s

wrangler deployments list
