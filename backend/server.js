import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

// middlewarg
app.use(express.json());

// custom middlewarg
//app.use((req,res,next) =>{
//  console.log("ola vc req, o metodo é", req.method)
//  next()
//})

const PORT = process.env.PORT || 5001; // fallback para 5001 se .env não estiver configurado

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL, -- Corrigido "NOT FULL" para "NOT NULL"
        category VARCHAR(255) NOT NULL, -- Corrigido "NOT FULL" para "NOT NULL"
        created_at DATE NOT NULL DEFAULT CURRENT_DATE -- Corrigido "NOT FULL" e "CURRENTY DATE"
      )
    `;

    console.log("Database iniciado com sucesso");
  } catch (error) {
    console.log("Erro ao iniciar database:", error);
    process.exit(1); // 0 = sucesso, 1 = erro
  }
}

app.get("/", (req, res) => {
  res.send("trabalhando");
});

app.post("/api/transactions", async (req, res) => {
  // title, amount, category, user_id  
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "todos os componentes devem ser preenchidos" });
    }

    // Corrigido: declaração da variável sem await na frente
    const transactions = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    console.log("transaction");
    // Corrigido: variável correta no response
    res.status(201).json(transactions[0]);

  } catch (error) {
    console.log("Error ao criar a transação", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor iniciado na porta", PORT);
  });
});
