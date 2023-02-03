#!/bin/bash
npx sequelize-cli db:migrate:undo:all --config ./src/config/dbconfig.js --migrations-path ./src/migrations/
npx sequelize-cli db:migrate --config ./src/config/dbconfig.js --migrations-path ./src/migrations