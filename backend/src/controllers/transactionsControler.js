import {sql} from "../config/db.js"


export async function getTransactionsById(req,res) {
      try {
        const { userId } = req.params;
    
        const transactions = await sql`
          SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;
    
        // Corrigido o uso da vírgula para o ponto antes do json
        res.status(200).json(transactions);
    
      } catch (error) {
        console.log("Error buscar a transação", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }


    export async function createTransaction(req, res) {
          // title, amount, category, user_id  
          try {
            const { title, amount, category, user_id } = req.body;
        
            if (!title || !user_id || !category || amount === undefined) {
              return res.status(400).json({ message: "todos os componentes devem ser preenchidos" });
            }
        
            const transactions = await sql`
              INSERT INTO transactions(user_id, title, amount, category)
              VALUES (${user_id}, ${title}, ${amount}, ${category})
              RETURNING *
            `;
        
            console.log("transaction");
            res.status(201).json(transactions[0]);
        
          } catch (error) {
            console.log("Error ao criar a transação", error);
            res.status(500).json({ message: "Internal server error" });
          }
        }
    


export async function deleteTransactions(req, res) {
      try {
        const { id } = req.params;
    
        if(isNaN(parseInt(id))){
          return res.status(400).json({message:"Id Invalido"})
        }
    
        const result = await sql`
          DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;
    
        // Corrigido "result length" para "result.length" e strings entre aspas
        if (result.length === 0) {
          return res.status(404).json({ message: "Transação não encontrada" });
        }
    
        // Corrigido a resposta para ser string e entre aspas
        res.status(200).json({ message: "Transação deletada com sucesso" });
    
      } catch (error) {
        console.log("Error ao deletar a transação", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }


export async function getSummaryByUserId(req,res) {
  try {
    const {userId} = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transaction WHERE user_id = ${userId}
    `

    const incomeResult = await sql `
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `


     const expensesResult = await sql `
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `


    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResultResult[0].income,
      expenses: expensesResultResult[0].expenses,
    })

  } catch (error) {
    console.log("Error ao puchar o sumario transação", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

