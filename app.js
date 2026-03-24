const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");

const app = express();

// 👇 middleware phải đặt TRƯỚC
app.use(cors());
app.use(express.json());

const contactsRouter = require("./app/routes/contact.route");

// 👇 route đặt sau
app.use("/api/contacts", contactsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// 404
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// error handler
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;