var Parse = require('parse').Parse,
    pg = require('pg');

var status = require('../tools/status');
var keys = require('../secret.json');

Parse.initialize(keys.PARSE_APP_ID, keys.PARSE_JAVASCRIPT_KEY);

module.exports = {
  process: function(request, response) {
    var credentials = request.body.credentials;
    var database_url = keys.DATABASE_URL;

    pg.connect(database_url, function(err, client, done) {
      client.query("SELECT * FROM users WHERE email=$1 AND password=$2;", [credentials.email, credentials.password], function(err, result) {
        done();
        if (err) {
          error['error'] = true;
            response.send('error');
        }
        else {
          if (result.rows.length > 0) {
            send_notification();
          }
          else {
            response.json(status(404));
          }
        }
      });
    });

    function send_notification() {
      function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      }

      var base64 = new Buffer(credentials.email).toString('base64');
      base64 = base64.replace(new RegExp(escapeRegExp('='), 'g'), '');

      var message = request.body.message;

      var metadata_original = request.body.metadata; // we want to strip down bytes here
      var metadata = {};

      metadata['desc'] = metadata_original.description;
      metadata['dev'] = metadata_original.device;

      if (!message) {
        message = 'Hoot! Your process has finished! Come back!';
      }

      Parse.Push.send({
        channels: [base64],
        data: {
          badge: 'Increment',
          alert: message,
          meta: metadata
        }
      },
      {
        success: function() {
          response.json({result: true});
        },
        error: function(error) {
          response.json({error: error});
        }
      });
    }
  }
}
