// const mongoose = require('mongoose');
// const dotenv = require ("dotenv");
// const { app } = require( "./app.js");

import mongoose from'mongoose';
import dotenv from'dotenv';
import { app } from'./app.js';
dotenv.config();

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, {
  tls: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.listen(port, () => console.log(`Server started on port ${port}`));
