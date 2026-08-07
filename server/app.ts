import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoute.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 30000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get ("/", (req, res) => {
    res.send("It is working");
})

console.log("My port:", PORT);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})