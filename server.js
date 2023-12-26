'use strict';

var app = require('./app.js');

function approveDomains(opts, certs, callback) {
    if(!/^(www\.)?minardo\.org$/.test(opts.domains)) {
        callback(new Error(`no config for '${opts.domain}'`));
        return;
    }
    opts.email = 'contact@minardo.org';
    opts.agreeTos = true;
    opts.domains = ['minardo.org', 'www.minardo.org'];
    callback(null, {options: opts, certs: certs});
}

var staging = 'https://acme-staging-v02.api.letsencrypt.org/directory';
var live = 'https://acme-v02.api.letsencrypt.org/directory';

var greenlock = require('greenlock-express').init({
    packageRoot: __dirname,
    maintainerEmail: "contact@minardo.org",
    configDir: './certificates',
    cluster: false,
    server: staging, // live
    approveDomains: function(opts, certs, callback) {
        approveDomains(opts, certs, callback)
    }
});

// Get & update certificates automatically
var server = greenlock.serve(app); 
