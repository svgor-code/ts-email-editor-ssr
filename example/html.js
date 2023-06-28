const processor = require("ts_email_editor-server");

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
  const response = processor.render(req.body.app);
  res.statusCode = 200;
  res.setHeader("content-type", "text/plain");
  // Send the rendered page back to the client.
  res.send(response);
};

module.exports = allowCors(handler);
