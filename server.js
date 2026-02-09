import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// app.use(
//   cors({
//     origin: "https://teamokai.netlify.app",
//     methods: ["POST"],
//   })
// );

app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.post("/delete", async (req, res) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Falta publicId" });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error borrando:", error);
    res.status(500).json({ success: false, error: "Error interno" });
  }
});

app.listen(5000, () => {
  console.log("Server corriendo en puerto 5000");
});