
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Schema and Model
// const transactionSchema = new mongoose.Schema({
//   vendor: String,
//   city: String,
//   date: String,
//   product: String,
//   volume: Number,
//   cost: Number,
// });

// const Transaction = mongoose.model("Transaction", transactionSchema);

// // Routes
// app.get("/transactions", async (req, res) => {
//   const transactions = await Transaction.find();
//   res.json(transactions);
// });

// app.post("/transactions", async (req, res) => {
//   const transaction = new Transaction(req.body);
//   await transaction.save();
//   res.json(transaction);
// });

// app.put("/transactions/:id", async (req, res) => {
//   const { id } = req.params;
//   const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
//   res.json(updatedTransaction);
// });

// app.delete("/transactions/:id", async (req, res) => {
//   const { id } = req.params;
//   await Transaction.findByIdAndDelete(id);
//   res.json({ message: "Transaction deleted" });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// *****************************************************************************************Main Code Above this 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema and Model
const transactionSchema = new mongoose.Schema({
  vendor: String,
  city: String,
  date: String,
  product: String,
  volume: Number,
  cost: Number,
  transactionType: String,
  category: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


