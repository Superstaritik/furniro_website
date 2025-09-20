import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import mongoose, { mongo } from 'mongoose';
import prodcutRoutes from './Routes/product.route.js'
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express()
const port = process.env.PORT || 3000
const DB_URI = process.env.MONGO_URI

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    
}))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use('/api/v1/product', prodcutRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error)
}