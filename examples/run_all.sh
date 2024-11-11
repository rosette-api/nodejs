#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 API_KEY [ALT_URL]" 1>&2
    exit 1
fi

for file in *.js; do
  if [ -n "$2" ]; then
    node "${file}" --key "$1" --url "$2"
  else
    node "${file}" --key "$1"
  fi
done