const express = require("express");
const router = express.Router();

router.post("/chat", (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  res.json({
    receivedBody: req.body,
    receivedHeaders: req.headers,
  });
});

module.exports = router;
