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
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
