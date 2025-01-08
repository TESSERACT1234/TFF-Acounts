import React, { useEffect, useState } from "react";
import axios from "axios";

function BankStatement() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ credit: 0, debit: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/transactions")
      .then(res => {
        const transactions = res.data;
        setTransactions(transactions);

        // Calculate totals for Credit and Debit
        const totalCredit = transactions
          .filter(t => t.transactionType === "Credit")
          .reduce((acc, t) => acc + parseFloat(t.cost), 0);

        const totalDebit = transactions
          .filter(t => t.transactionType === "Debit")
          .reduce((acc, t) => acc + parseFloat(t.cost), 0);

        setTotals({ credit: totalCredit, debit: totalDebit });
      });
  }, []);

  return (
    <div>
      <h2>Bank Statement</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vendor</th>
            <th>City</th>
            <th>Product</th>
            <th>Volume</th>
            <th>Cost</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.vendor}</td>
              <td>{transaction.city}</td>
              <td>{transaction.product}</td>
              <td>{transaction.volume}</td>
              <td>{transaction.cost}</td>
              <td>{transaction.transactionType}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5"><b>Totals:</b></td>
            <td><b>Credit: {totals.credit}</b></td>
            <td><b>Debit: {totals.debit}</b></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default BankStatement;
