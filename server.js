var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = express();
var config = {
  port: process.env.PORT || 5000,
  distFolder: path.resolve(__dirname, 'public'),
  serverFolder: path.resolve(__dirname)
};

app.use(favicon(path.join(config.distFolder, 'images/favicon-circle.ico')));
app.use('/static', express.static(config.distFolder));
app.use(bodyParser.json());

app.all('/*', (req, res) => {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: config.distFolder });
});

app.listen(config.port, () => {
  console.log('Server started at port: ' + config.port);
});
