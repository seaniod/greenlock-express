'use strict';

// https://git.rootprojects.org/root/greenlock-express.js/src/branch/master/examples/http/server.js

// The WRONG way:
//var http = require('http');
//var httpServer = http.createServer(redirectToHttps);
//
// Why is that wrong?
// Greenlock needs to change some low-level http and https options.
// Use glx.httpServer(redirectToHttps) instead.

//require("greenlock-express")
require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",

        maintainerEmail: "jon@example.com",
        cluster: false
    })
    .ready(httpsWorker);

function httpsWorker(glx) {
    //
    // HTTP can only be used for ACME HTTP-01 Challenges
    // (and it is not required for DNS-01 challenges)
    //

    // Get the raw http server:
    var httpServer = glx.httpServer(function(req, res) {
        // Construct the full URL for logging
        const fullUrl = `http://${req.headers.host}${req.url}`;
        console.log(`Received HTTP request: ${req.method} ${fullUrl}`);
    
        // Perform the redirect
        res.statusCode = 301;
        res.setHeader("Location", "https://" + req.headers.host + req.url);
        res.end("Insecure connections are not allowed. Redirecting...");
    });
    
    httpServer.listen(8066, "0.0.0.0", function() {
        console.info("Listening on ", httpServer.address());
    });
}



