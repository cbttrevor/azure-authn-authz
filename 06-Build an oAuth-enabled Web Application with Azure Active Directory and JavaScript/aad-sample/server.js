const express = require('express');
const msal = require('@azure/msal-node');

const config = {
    auth: {
        clientId: "d99b2daa-4d25-4988-970d-fda6455a7cfc",
        authority: "https://login.microsoftonline.com/9dd73edd-56fe-49da-8ea3-f776b1f331a3",
        clientSecret: "7mc_l_.tK4ZJN0H21H2k5564pzA8~97BvB"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
const pca = new msal.ConfidentialClientApplication(config);
const server = express();

server.get('/login', (req, res) => {
    // Initiate login process
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    // get url to sign user in and consent to scopes needed for applicatio
    pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
})

server.get('/redirect', (req, res) => {
    // Successfully logged in
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    pca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
})

server.listen(3000);