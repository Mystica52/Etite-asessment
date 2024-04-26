// const bodyParser= require("body-parser");
// const cors = require("cors");
// const express= require("express");
// const eventRoutes = require('../src/routes/eventRoutes');

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import bookingRoutes from '../src/routes/bookingRoutes.js';
import eventRoutes from '../src/routes/eventRoutes.js';
import userRoutes from '../src/routes/userRoute.js';

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use("/api", eventRoutes, userRoutes,bookingRoutes);
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to Mystica's API",
  });
});

export { app };

