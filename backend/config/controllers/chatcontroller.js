const wolfReply = require("../../agents/wolfagent");
const sageReply = require("../../agents/sageagent");

exports.chat = async (req, res) => {
  const { message } = req.body;

  try {
    const wolf = await wolfReply(message);
    const sage = await sageReply(message);

    res.json({
      wolf,
      sage,
    });
  } catch (err) {
  console.error("AI ERROR:", err);
  res.status(500).json({ error: err.message || "AI failed" });
  }
};
