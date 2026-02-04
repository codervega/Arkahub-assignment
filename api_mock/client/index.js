const axios = require("axios");
const {
  BASE_URL,
  ENDPOINT,
  RATE_LIMIT_MS,
  BATCH_SIZE
} = require("./config");

const {
  getTimestamp,
  generateSignature,
  sleep
} = require("./utils");

// Example: generate SNs 0–49 (you can scale to 500)
const serialNumbers = Array.from({ length: 50 }, (_, i) => `SN-${i}`);

async function callApi(batch) {
  const timestamp = getTimestamp();
  const signature = generateSignature(ENDPOINT, timestamp);

  const headers = {
    signature,
    timestamp,
    "Content-Type": "application/json"
  };

  const response = await axios.post(
    BASE_URL + ENDPOINT,
    { sn_list: batch },
    { headers }
  );

  return response.data;
}

async function main() {
  console.log("Starting EnergyGrid client...");

  for (let i = 0; i < serialNumbers.length; i += BATCH_SIZE) {
    const batch = serialNumbers.slice(i, i + BATCH_SIZE);

    try {
      console.log(`📡 Sending batch:`, batch);
      const result = await callApi(batch);
      console.log("Response:", result);
    } catch (err) {
      console.error(
        "Error:",
        err.response ? err.response.data : err.message
      );
    }

    // Respect rate limit
    await sleep(RATE_LIMIT_MS);
  }

  console.log("All requests completed.");
}

main();
