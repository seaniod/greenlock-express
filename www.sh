#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('node-rest:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');
var path = require('path');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8066');
var https_port = normalizePort(process.env.PORT || '8443');
app.set('port', port);
app.set('https_port', https_port);

/**/
var ssl_key;
var ssl_cert;
var https_config = get_https_config();
var server;

/**
 * Create HTTP server.
 */

if (https_config) {
  var options = {
    key: fs.readFileSync('/home/ec2-user/Minardo-Snapshots/certs/minardo.org.key'),
    cert: fs.readFileSync('/home/ec2-user/Minardo-Snapshots/certs/minardo.org.crt'),
    requestCert: false,
    rejectUnauthorized: false
  };
  var http_port = port;
  port = https_config.port;
  http_app = express();
  http_router = express.Router();
  http_app.use('/', http_router);
  http_router.get('*', function (req, res) {
    if (!/https/.test(req.protocol)) {
      var host = req.get('Host');
      var destination = ['https://', host, req.url].join('');
      console.log('destination');
      console.log(destination);

      return res.redirect(destination);
    } else {
      return next();
    }
  });
  var http_server = http.createServer(http_app);
  http_server.listen(http_port, function () {
    console.log("Express http server listening on port " + http_port);
  });
  server = https.createServer(options, app);
  server.listen(port);
  // server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log('Minardo http listening on port: ' + port);
} else {
  server = http.createServer(app);
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log('Minardo http listening on port: ' + port);
}

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function get_https_config() {
  try {
    ssl_key = fs.readFileSync('/home/ec2-user/Minardo-Snapshots/certs/minardo.org.key');
    ssl_cert = fs.readFileSync('/home/ec2-user/Minardo-Snapshots/certs/minardo.org.crt');
    console.log('ssl_key: ' + ssl_key);
    console.log('ssl_cert: ' + ssl_cert);
  } catch (err) {
    console.log('Cannot find SSL key and/or certificate. Err: ' + err);
  }

  if (!(port && ssl_key && ssl_cert)) {
    return false;
  }
  var result = {};
  result.port = https_port;
  result.key = ssl_key;
  result.cert = ssl_cert;
  return result;
}