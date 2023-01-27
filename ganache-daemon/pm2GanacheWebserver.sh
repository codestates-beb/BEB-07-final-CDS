#!/bin/bash
# This file inits ganache network and log web server
npx pm2 start ./initGanache.sh -o ./out.log -e ./err.log --time
npx pm2 start app.js
