const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const { sequelize } = require('./models');
const blockListener = require('./blockListener');
const syncDB = require('./syncDB');

app.set('port', process.env.PORT || 5051);
app.set('view engine', 'ejs');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공.');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
setInterval(syncDB, 300 * 1000);

app.listen(app.get('port'), () => {
  syncDB();
  console.log(app.get('port'), 'is up and listening');
});

blockListener();

module.exports = app;
