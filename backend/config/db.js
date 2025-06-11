import {neon} from "@neondatabase/serverless"

import "dotenv/config";


//cria a conexao sql com seu db url
export const sql = neon(process.env.DATABASE_URL)