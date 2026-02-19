const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Chat API hit");
  console.log(req.body);

  res.json({
    wolf: "Wolf test reply working",
    sage: "Sage test reply working"
  });
});

module.exports = router;
