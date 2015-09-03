var express = require('express'),
		parser = require('body-parser'),
		status = require('./tools/status');

var send = require('./routes/send'),
		register = require('./routes/register'),
		authenticate = require('./routes/authenticate');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

var router = express.Router();

router.post('/register', register.process);
router.post('/send', send.process);
router.post('/authenticate', authenticate.process);

app.use('/api/v1', router);

app.all('*', function(request, response) {
  response.json(status(404));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
})
