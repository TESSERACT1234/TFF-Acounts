import React, { useState, useEffect } from "react";
import axios from "axios";

function VendorTransactionHistory({ match }) {
  const { vendorId } = match.params;  // Get vendorId from URL parameter
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions for this vendor
    axios.get(`http://localhost:5000/transactions/vendor/${vendorId}`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [vendorId]);

  // Print Logic
  const handlePrint = () => {
    const contentToPrint = document.getElementById('printable').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = contentToPrint;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div>
      <h2>Transaction History for Vendor {vendorId}</h2>

      {/* Print Button */}
      <button onClick={handlePrint} className="print-button">
        Print Statement
      </button>

      {/* Printable Section */}
      <div id="printable">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>City</th>
              <th>Product</th>
              <th>Volume</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.date}</td>
                <td>{transaction.city}</td>
                <td>{transaction.product}</td>
                <td>{transaction.volume}</td>
                <td>{transaction.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendorTransactionHistory;
