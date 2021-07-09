# rss-hook

## how it works

1. download rss feed and parse
2. get new items from rss and execute hook in config.js
3. if the hook already done for the item, mark the key and store data to s3
4. next time will skip items that already ran hook

## Deploy

`$ up`

See more detail on apex up document
