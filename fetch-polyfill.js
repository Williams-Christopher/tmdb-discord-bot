
if (!globalThis.fetch) {
  console.log('Using node-fetch...');
  globalThis.fetch = require('node-fetch');
}
else {
  console.log('Using Node.js Core fetch...');
}
