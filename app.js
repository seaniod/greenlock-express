'use strict';

// Original app function
var originalApp = function(req, res) {
    res.end('Hello, Encrypted World!');
};

// Wrapper function to log requests and then call the original app function
var app = function(req, res) {
    // Log the request details
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);

    // Call the original app function
    originalApp(req, res);
};

module.exports = app;
