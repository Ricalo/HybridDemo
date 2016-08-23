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

module.exports = router;
