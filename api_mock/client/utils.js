const crypto = require("crypto");
const { SECRET_TOKEN } = require("./config");

// Generate timestamp
function getTimestamp() {
  return Date.now().toString();
}

// Generate signature: MD5(url + token + timestamp)
function generateSignature(url, timestamp) {
  return crypto
    .createHash("md5")
    .update(url + SECRET_TOKEN + timestamp)
    .digest("hex");
}

// Sleep function (for rate limiting)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  getTimestamp,
  generateSignature,
  sleep
};
