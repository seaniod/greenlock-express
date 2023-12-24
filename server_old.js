"use strict";
 
const greenlock = require('greenlock-express');

const glx = greenlock.init({
    packageRoot: __dirname,
    configDir: './certificates',
    maintainerEmail: 'contact@minardo.org',
    cluster: false,
    packageAgent: 'greenlock-express/v4.0.0',
    agreeTos: true,
    approveDomains: ['minardo.org', 'www.minardo.org']
});


const app = require('express')();

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);
    // If you also want to log the body, you need to parse it as JSON first
    // You can uncomment the following lines if needed
    // app.use(express.json());
    // console.log(`Body: ${JSON.stringify(req.body)}`);
    next(); // Continue to the next middleware or route handler
});


app.use('/', (req, res) => {
    res.send('Hello, World!');
});

 // Get's SSL certificates 'magically'
glx.serve(app);

// you need to run the following
// npx greenlock add --subject m-url.org --altnames m-url.org,www.m-url.org
// npx greenlock add --subject minardo.org --altnames minardo.org,www.minardo.org

//Public Accessibility: For Let's Encrypt to validate your domain using the HTTP-01 challenge, your server must be publicly accessible on the internet, specifically on port 80. Ensure that your DNS settings are correct, and your domain (e.g., m-url.org) points to the server where greenlock-express is running.
//Firewall and Port Forwarding: Check if the server's firewall settings allow inbound connections on port 80. If you are behind a router or a firewall, ensure that port 80 is forwarded to your server.