module.exports.getRequestPayload = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let payload = '';
      req.on('data', chunk => payload += chunk.toString());
      req.on('end', async () => resolve(JSON.parse(payload || '{}')));
    } catch (error) {
      reject(error);
    }
  });
}