import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "BrandPilot API",
    version: "1.0.0",
    message: "BrandPilot backend is running 🚀"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BrandPilot Server running on port ${PORT}`);
});
