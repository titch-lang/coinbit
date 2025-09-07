const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000; // backend port

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("✅ CoinBit Backend is Running");
});

// Example route for payment confirmation
app.post("/confirm", (req, res) => {
  const { amount, exchange, uid, phone } = req.body;
  console.log("Payment Received:", { amount, exchange, uid, phone });
  res.json({ success: true, message: "Payment confirmed" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

