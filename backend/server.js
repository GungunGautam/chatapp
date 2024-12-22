import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
const app = express();
const PORT = process.env.PORT || 5001;  

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSOM payloads (from req.body)

app.use("/api/auth", authRoutes);
// app.get("/" , (req,res) => {
//     //root route http://localhost:5000/
//     res.send("Radha-Krishna");
// });


app.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server is running on port ${PORT}`)
});


