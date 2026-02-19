require("dotenv").config();
const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json()); // 🚨 REQUIRED
app.use(express.urlencoded({ extended: true }));

app.use("/api", chatRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
