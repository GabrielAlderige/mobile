import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js"

dotenv.config();

const app = express();

// middleware
app.use(rateLimiter)
app.use(express.json());

// custom middlewarg
//app.use((req,res,next) =>{
//  console.log("ola vc req, o metodo é", req.method)
//  next()
//})

const PORT = process.env.PORT || 5001; // fallback para 5001 se .env não estiver configurado


app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor iniciado na porta", PORT);
  });
});
