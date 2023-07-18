const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const os = require("os");
// Init app
const PORT = process.env.PORT || 8001;
const app = express();

// Connect to redi
const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Connected to Redis..."));
redisClient.connect();

// Connect to mongo
const DB_USER = "root";
const DB_PASSWORD = 1234;
const DB_PORT = 27017;
const DB_HOST = "mongo";
const URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URL)
  .then(() => console.log("connected to mongodb ..."))
  .catch((err) => console.log("failed to connect to mongodb ", err));

app.get("/", (req, res) => {
  console.log(` Trafic from ${os.hostname}`);
  res.send(
    `<h1>Docker application is running successfully...,  Trafic from ${os.hostname}</h1>`
  );
});

// Connect to the server
app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});
