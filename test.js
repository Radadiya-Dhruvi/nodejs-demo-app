const http = require('http');
const app = require('./app');

const server = app.listen(0, () => {
  const port = server.address().port;
  http.get(`http://localhost:${port}/`, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Test Passed: App responded with status 200');
      server.close();
      process.exit(0);
    } else {
      console.error('❌ Test Failed: Status code', res.statusCode);
      server.close();
      process.exit(1);
    }
  }).on('error', (err) => {
    console.error('❌ Request error:', err);
    server.close();
    process.exit(1);
  });
});