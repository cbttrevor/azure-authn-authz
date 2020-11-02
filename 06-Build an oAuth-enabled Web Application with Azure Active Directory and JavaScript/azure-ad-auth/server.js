const express = require('express');
const msal = require('@azure/msal-node');
// const azres = require('@azure/arm-resources');
const azauth = require('@azure/ms-rest-nodeauth');
const msrest = require('@azure/ms-rest-js');
const azurerest = require('@azure/ms-rest-azure-js');
const azsubs = require('@azure/arm-subscriptions');
const cookie = require('cookie-session');
const azid = require('@azure/identity');

const config = {
    auth: {
        clientId: '',
        authority: "",
        clientSecret: ''
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

const msalapp = new msal.ConfidentialClientApplication(config);
const app = express();
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('static'));
app.use(cookie({
    name: 'azure-session',
    keys: [""]
}));

app.get('/', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    // get url to sign user in and consent to scopes needed for applicatio
    msalapp.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});



app.get('/redirect', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:3000/redirect",
    };

    msalapp.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        req.session.azuretoken = response.accessToken;
        console.log(req.session.azuretoken);
        res.render('loggedin');
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
});

app.get('/resgroups', (req, res) => {
    res.render('azsignin');
});


app.listen({ port: 3000, callback: () => {}});