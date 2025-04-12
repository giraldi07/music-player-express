// test.js
import http from 'http';

http.createServer((req, res) => {
  res.end('ok');
}).listen(5000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:5000');
});
