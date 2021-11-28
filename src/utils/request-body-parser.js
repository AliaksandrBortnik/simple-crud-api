module.exports.getRequestPayload = (request) => {
  return new Promise((resolve, reject) => {
    try {
      let payload = '';
      request.on('data', chunk => payload += chunk.toString());
      request.on('end', async () => resolve(JSON.parse(payload || '{}')));
    } catch (error) {
      reject(error);
    }
  });
}