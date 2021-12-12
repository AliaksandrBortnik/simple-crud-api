module.exports.getRequestPayload = (request) => {
  return new Promise((resolve, reject) => {
    try {
      let payload = '';

      request.on('data', chunk => payload += chunk.toString());

      request.on('end', async () => {
        const parsedPayload = tryParseJSONObject(payload); // if not JSON, it will be false

        if (parsedPayload) {
          resolve(parsedPayload);
        } else {
          reject(new Error('Invalid JSON'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function tryParseJSONObject (jsonString){
  // See for more details https://stackoverflow.com/a/20392392/7142637
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === "object") return o;
  }
  catch (e) {}

  return false;
}