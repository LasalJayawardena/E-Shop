import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

// body parser to acess post req varables
app.use(express.json());

app.get("/", (req,res) => {
    res.send('APIS is running')
});

app.use('/api/products', productRoutes);
app.use('/api/users/', userRoutes);

// ======= Error middleware =======

// For 404 Pages
app.use(notFound);

// For Invalid Product IDs
app.use(errorHandler);


const PORT = process.env.PORT || 5000 ;

app.listen(PORT, console.log(`Server is now live on port: ${PORT} in ${process.env.NODE_ENV} mode.`.yellow.bold))
