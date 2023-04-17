const express = require("express");
const db = require("./config/connection");

// require Model
const { Users } = requre("./models");

// initiate express
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
