module.exports = (req, res) => {
  const message =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";

  res.status(200).json({
    reply: Echo from TatvaBot: ${message},
  });
};
