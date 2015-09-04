var pg = require ('pg');

module.exports = {
  process: function(request, response) {
    var credentials = request.body.credentials;
    var keys = require('../secret.json');

    var database_url = keys.DATABASE_URL;

    pg.connect(database_url, function(err, client, done) {
      client.query("SELECT * FROM users WHERE email=$1 AND password=$2;", [credentials.email, credentials.password], function(err, result) {
        if (err) {
          response.json({result: false});
        }
        else {
          if (result.rows.length > 0) {
            response.json({result: true});
          }
          else {
            response.json({result: false});
          }
        }
      });
    });
  }
}
