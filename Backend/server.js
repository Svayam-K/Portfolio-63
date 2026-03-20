const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Portfolio-63 backend running ✅");
});

// ✅ LOCAL MONGODB (NO ATLAS)
mongoose
  .connect("mongodb+srv://svayamK:Bunny2468@portfolio63.xcooaj2.mongodb.net/portfolio63")
  .then(() => console.log("✅ Local MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

// ✅ SCHEMA
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", MessageSchema);

// ✅ CONTACT ROUTE
app.post("/contact", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // ADD THIS

    const { name, email, message } = req.body;

    await Message.create({ name, email, message });

    res.json({ success: true, message: "Message saved" });
  } catch (err) {
    console.error("ERROR:", err); // ADD THIS
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
