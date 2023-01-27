const express = require('express');
require('dotenv').config();
const createError = require('http-errors');
const fs = require('fs');

const delimString =
  '----------------------------------------------------------------------------------------';
const path = require('path');
const morgan = require('morgan');
const port = 8080;

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);
app.set('processedIdx', 0);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

app.use('/originalLog', (req, res, next) => {
  console.log('GET /log called');
  processLog();
  return res.status(200).sendFile(path.join(__dirname + '/out.log'));
});

app.use('/log', (req, res, next) => {
  console.log('GET /log called');
  processLog();
  return res.status(200).sendFile(path.join(__dirname + '/processed.log'));
});

app.use('/', (req, res, next) => {
  // console.log(req.get('host'));
  return res.status(302).redirect(`${req.get('host')}/log`);
});

app.use(function (req, res, next) {
  next(createError(404, 'There is no router'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

function processLog() {
  const beforeProcessedIdx = app.get('processedIdx');
  if (beforeProcessedIdx === 0) {
    fs.writeFileSync('./processed.log', '', { overwrite: true });
  }
  console.log('Log process Start');
  console.log({ beforeProcessedIdx });
  const fileData = fs.readFileSync('./out.log');
  let fileDataArray = fileData.toString().split('\n');
  const afterProcessedIdx = fileDataArray.length;
  app.set('processedIdx', afterProcessedIdx);

  fileDataArray = fileData.toString().split('\n').slice(beforeProcessedIdx);
  fileDataArray = fileDataArray.filter((line) => {
    return !(line.includes('net_version') || line.includes('eth_blockNumber'));
  });

  fs.appendFileSync(
    './processed.log',
    fileDataArray.join('\n').trim(),
    'utf-8',
  );
  console.log('Log process Done');
  console.log({ afterProcessedIdx });
}
