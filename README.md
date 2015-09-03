# Hedwig

Hedwig is middleware for Hoot, the command line tool that sends done notifications to your phone from the console.  Hoot is a simple command line tool to alert you when a Terminal process has finished, with a push notification right to your device!

## Use

To use Hedwig for local use or Hoot testing, do the following:

```bash
git clone git@github.com:ruddfawcett/hedwig.git
cd hedwig && npm install
```
That will install the required modules that Hedwig uses.

To start the server, just run `node index.js`, and the app should be available on http://localhost:5000.

## Development

In order to setup Hedwig, you will need the following:
- A [Parse](https://parse.com) app, with the application ID and the JavaScript client key.  Make sure that "client push" is enabled.
- A Postgre database named `hoot`, or something similar.  You will need the extension `CITEXT` installed on it.

You can use the `users.sql` file in [db/users.sql](db/users.sql) to setup the `users` database in Postgres.  Then insert a user in the database that you can test with:

```sql
INSERT INTO users (email, password) VALUES ('YOUR_EMAIL', 'SHA1_PASSWORD');
```

## Heroku

You can run your own custom version of Hedwig on a Heroku app -- just remember to replace:
```js
var database_url = keys['DATABASE_URL']; // with
var database_url = process.env.DATABASE_URL;
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/ruddfawcett/hedwig.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
