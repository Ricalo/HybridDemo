var querystring = require('querystring');
var https = require('https');
var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/signin', function(req, res) {
  var redirectUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?'
  + 'client_id=2c0257d6-c28d-4d27-9b04-eca300f62dd1&'
  + 'response_type=code&'
  + 'redirect_uri=http://localhost:3000/microsoft/callback&'
  + 'scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read';  

  res.redirect(redirectUrl);
});

router.get('/callback', function(req, res1) {
  var postData = querystring.stringify(
    {
      client_id: '2c0257d6-c28d-4d27-9b04-eca300f62dd1',
      //scope: 'openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read',
      code: req.query.code,
      redirect_uri: 'http://localhost:3000/microsoft/callback',
      grant_type: 'authorization_code',
      client_secret: '1RA7r5ZiAmHc7c4XcggvzmN'
  });

  var postOptions = {
      host: 'login.microsoftonline.com',
      path: '/common/oauth2/v2.0/token',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
      }
  };

  var postReq = https.request(postOptions, function(res) {
    var responseBody = ''; 
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      responseBody = responseBody + chunk;
    });
    res.on('end', function () {
      var accessToken = JSON.parse(responseBody).access_token;
      console.log(accessToken);
      res1.send('The server has an access token');
    });
  });

  postReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  postReq.write(postData);
  postReq.end();
  
});


module.exports = router;
