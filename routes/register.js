var pg = require ('pg');

module.exports = {
  process: function(request, response) {
    var credentials = request.body.credentials;
    var keys = require('../secret.json');

    var database_url = keys.DATABASE_URL;

    pg.connect(database_url, function(err, client, done) {
      client.query("SELECT * FROM users WHERE email='"+credentials.email+"';", function(err, result) {
        if (err) {
          error['error'] = true;
            response.send('error');
        }
        else {
          if (result.rows.length > 0) {
            response.json({error: 'A user already exists with that email.'})
          }
          else {
            client.query("INSERT INTO users (email, password) VALUES ('"+credentials.email+"', '"+credentials.password+"') RETURNING id;", function(err, result) {
              done();

              if (err) {
                error['error'] = true;
                  response.send('error');
              }
              else {
                if (result.rows.length == 1) {
                  response.json({result: true});
                }
                else {
                  response.json(status(500));
                }
              }
            });
          }
        }
      });
    });
  }
}
