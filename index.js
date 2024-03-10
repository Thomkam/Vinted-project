require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");
const cloudinary = require("cloudinary").v2;

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);

mongoose.connect(
  "mongodb+srv://thomaskamoun:ThaqrFjuEuz0CFJ3@cluster0.bfzxqkt.mongodb.net/vinted"
);

cloudinary.config({
  cloud_name: "dtekpkqxv",
  api_key: "984265532387588",
  api_secret: "fcnLtON0aQ44icP_cDq2Dp1UB1Q",
});

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur notre serveur Vinted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Import des routes user :
const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(userRoutes);
app.use(offerRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT, () => {
  console.log("Serveur on fire 🔥🔥🔥🔥🔥🔥");
});
