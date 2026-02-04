# EnergyGrid Data Aggregator Client

Overview

This project is a client-side Node.js application that fetches real-time telemetry data for 500 solar inverters from a provided EnergyGrid Mock API, while strictly respecting rate limits, batch limits, and security requirements.

Tech Stack
  Node.js
  Axios (for HTTP requests)
  Crypto (for MD5 signature generation)

Start Mock API SERVER

  cd api_mock
  npm install
  node server.js

Run The Client Application
  node client/index.js

Approach Explained
  Generated serial numbers from SN-0 to SN-499
  Split them into batches of 10
  Sent one request per second using a delay (sleep)
  Added required headers:
    timestamp
    signature = MD5(URL + Token + timestamp)
  Collected responses batch by batch
  Aggregated all results into a single dataset



Author
Abhishek Shukla.