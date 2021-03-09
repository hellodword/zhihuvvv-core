#!/bin/bash

# export CF_ACCOUNT_ID=""
# export CF_API_TOKEN=""

source ".env"

# 防止域名暴露
wrangler publish >/dev/null 2>&1