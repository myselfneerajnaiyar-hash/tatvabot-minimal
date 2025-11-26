// Simple echo handler for Vercel (CommonJS style, very safe)
module.exports = function (req, res) {
  var message =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";

  res.status(200).json({
    reply: "Echo from TatvaBot: " + message,
  });
};
