#!/bin/sh
npm run $(jq -r '.scripts | "test"' package.json)