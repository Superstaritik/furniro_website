import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import mongoose from 'mongoose';
import prodcutRoutes from './Routes/product.route.js'
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express()
const port = process.env.PORT || 3000
const DB_URI = process.env.MONGO_URI

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// यह CORS के लिए सही कॉन्फ़िगरेशन है
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  "https://furniro-websitee.netlify.app",
];

// CORS मिडलवेयर को कॉन्फ़िगर करें
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(callback(new Error('Not allowed by CORS')));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/product', prodcutRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// MongoDB कनेक्शन
try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error)
}