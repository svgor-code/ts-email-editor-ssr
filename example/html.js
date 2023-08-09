const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

const processor = require("../dist");

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  //   res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  try {
    const response = processor.render(req.body.app);

    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    // Send the rendered page back to the client.
    res.send(response);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain");
    res.send(error);
  }
};

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.post("/", handler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = allowCors(handler);
