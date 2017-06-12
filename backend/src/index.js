const app = require('express')();
const http = require('http').Server(app);
require('./socket')(http);

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

app.get('/download-json/:crawl.json', function(req, res) {
  try {
    const json = JSON.parse(req.query.json);
    res.set('Content-Type', 'application/octet-stre');
    res.send(JSON.stringify(json, null, 2));
  } catch (e) {
    console.log('Invalid json passed to download helper.');

    res.send('Error parsing JSON');
  }
});

http.listen(7000, () => console.log('Listening on :7000'));
