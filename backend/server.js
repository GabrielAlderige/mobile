import express from "express";

const app = express()


app.get("/", (req,res) =>{
    res.send("está funcionando")
})



app.listen(5001, () =>{
    console.log("Servidor aberto na porta 5001")
})