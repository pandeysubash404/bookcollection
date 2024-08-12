const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const bookRoutes = require("./routes/bookRoutes.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
