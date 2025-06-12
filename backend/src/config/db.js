import {neon} from "@neondatabase/serverless"

import "dotenv/config";


//cria a conexao sql com seu db url
export const sql = neon(process.env.DATABASE_URL)


export async function initDB() {
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