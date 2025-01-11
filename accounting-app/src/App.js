// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";
// import Navbar from "./Navbar";

// function App() {
//   const [formData, setFormData] = useState({
//     vendor: "",
//     city: "",
//     date: "",
//     product: "",
//     volume: "",
//     cost: "",
//   });

//   const [transactions, setTransactions] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState(null);

//   // Fetch transactions from the backend
//   useEffect(() => {
//     axios.get("https://tff-acounts-backend.onrender.com/transactions").then((res) => {
//       setTransactions(res.data);
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post("https://tff-acounts-backend.onrender.com/transactions", formData).then((res) => {
//       setTransactions([...transactions, res.data]);
//       setFormData({
//         vendor: "",
//         city: "",
//         date: "",
//         product: "",
//         volume: "",
//         cost: "",
//       });
//     });
//   };

//   const handleDelete = (id) => {
//     axios.delete(`https://tff-acounts-backend.onrender.com/transactions/${id}`).then(() => {
//       setTransactions(transactions.filter((t) => t._id !== id));
//     });
//   };

//   const handleEdit = (id) => {
//     const transaction = transactions.find((t) => t._id === id);
//     setFormData(transaction);
//     handleDelete(id); // Delete the old entry to replace it
//   };

//   const vendors = [...new Set(transactions.map((t) => t.vendor))];

//   return (
//     <div className="App">

//       <Navbar/>

//       <header className="App-header">
//         <h1 style={{ color: "#4CAF50" }}><center>Accounts</center></h1>
//       </header>

//       <div className="container">
//         {!selectedVendor ? (
//           <div>
//             <form onSubmit={handleSubmit} className="form-container">
//               <h2>Enter Transaction Details</h2>
//               <input
//                 type="text"
//                 name="vendor"
//                 placeholder="Vendor"
//                 value={formData.vendor}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="product"
//                 placeholder="Product"
//                 value={formData.product}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="volume"
//                 placeholder="Volume"
//                 value={formData.volume}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="number"
//                 name="cost"
//                 placeholder="Cost"
//                 value={formData.cost}
//                 onChange={handleInputChange}
//                 required
//               />
//               <button type="submit" className="submit-button">Submit</button>
//             </form>

//             <div className="vendors-list">
//             <h1 style={{ color: "#4CAF50" }}><center>Transaction Accounts</center></h1>
//               <ul>
//                 {vendors.map((vendor, index) => (
//                   <li
//                     key={index}
//                     onClick={() => setSelectedVendor(vendor)}
//                     className="vendor-item"
//                   >
//                     {vendor}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <div style={{margin:"20px"}}>
//             <button onClick={() => setSelectedVendor(null)} className="back-button">
//               Back
//             </button>
//             <h2>Transactions for {selectedVendor}</h2>
//             <table className="transactions-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>City</th>
//                   <th>Product</th>
//                   <th>Volume</th>
//                   <th>Cost</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {transactions
//                   .filter((t) => t.vendor === selectedVendor)
//                   .map((t) => (
//                     <tr key={t._id}>
//                       <td>{t.date}</td>
//                       <td>{t.city}</td>
//                       <td>{t.product}</td>
//                       <td>{t.volume}</td>
//                       <td>{t.cost}</td>
//                       <td>
//                         <button style={{backgroundColor:"yellow" , color:"black"}} onClick={() => handleEdit(t._id)}>Edit</button>
//                         <>  </>
//                         <button style={{backgroundColor:"red" , color:"black"}} onClick={() => handleDelete(t._id)}>Delete</button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// ******************************************************************** Main Code Above this
/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const notify = () => toast("Transaction Added Successfully");
  const currentDate = new Date().toISOString().split('T')[0];

  const calculateTotals = () => {
    const filteredTransactions = transactions.filter(
      (t) =>
        t.vendor === selectedVendor && t.category === selectedCategory
    );

    const totals = filteredTransactions.reduce(
      (acc, transaction) => {
        acc.totalVolume += parseFloat(transaction.volume) || 0;
        if (transaction.transactionType === "Credit") {
          acc.totalCredit += parseFloat(transaction.cost) || 0;
        } else if (transaction.transactionType === "Debit") {
          acc.totalDebit += parseFloat(transaction.cost) || 0;
        }
        return acc;
      },
      { totalDebit: 0, totalCredit: 0, totalVolume: 0 }
    );

    return totals;
  };


  const [formData, setFormData] = useState({
    vendor: "",
    city: "",
    date: currentDate,
    product: "",
    volume: "",
    cost: "",
    transactionType: "Credit",
    category: "Rawmaterial",
  });

  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Fetch transactions from the backend
  useEffect(() => {
    axios.get("https://tff-accounts-backend.onrender.com").then((res) => {
      setTransactions(res.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://tff-acounts-backend.onrender.com/transactions", formData).then((res) => {
      setTransactions([...transactions, res.data]);
      setFormData({
        vendor: "",
        city: "",
        date: currentDate,
        product: "",
        volume: "",
        cost: "",
        transactionType: "Credit",
        category: "Rawmaterial",
      });
    });
  };

  const handleDelete = (id) => {
    axios.delete("http:\\localhost:5001/transactions/${id}").then(() => {
      setTransactions(transactions.filter((t) => t._id !== id));
    });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t._id === id);
    setFormData(transaction);
    handleDelete(id); // Delete the old entry to replace it
  };

  const categories = [...new Set(transactions.map((t) => t.category))];

  const handlePrint = () => {
    const contentToPrint = document.getElementById("printable").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = contentToPrint;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="App">
      <Navbar />

      <header className="App-header">
        <h1 style={{ color: "#4CAF50" }}>
          <center>Accounts</center>
        </h1>
      </header>

      <div className="container">
        {!selectedCategory && !selectedVendor ? (
          <div>
            <form onSubmit={handleSubmit} className="form-container">
              <h2>Enter Transaction Details</h2>
              <select style={{ padding: "2px" }}
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Rawmaterial">Rawmaterial</option>
                <option value="B100">B100</option>
                <option value="Additional">Additional</option>
              </select>
              <input
                style={{ marginTop: "7px" }}
                type="text"
                name="vendor"
                placeholder="Vendor"
                value={formData.vendor}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="product"
                placeholder="Product"
                value={formData.product}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="volume"
                placeholder="Volume"
                value={formData.volume}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={formData.cost}
                onChange={handleInputChange}
                required
              />
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleInputChange}
                required
              >
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>

              <button type="submit" onClick={notify} className="submit-button" style={{ marginTop: "7px", margin: "7px" }}>
                Submit
              </button>
              <ToastContainer />
            </form>

            <div className="categories-list">
              <h1 style={{ color: "#4CAF50" }}>
                <center>Transaction Categories</center>
              </h1>
              <ul>
                {categories.map((category, index) => (
                  <li style={{ margin: "20px", padding: "5px", backgroundColor: "#f9f9f9", cursor: "pointer" }}
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className="category-item"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : selectedCategory && !selectedVendor ? (
          <div style={{ margin: "20px" }}>
            <button
              onClick={() => setSelectedCategory(null)}
              className="back-button"
            >
              Back
            </button>
            <h2>Vendors in {selectedCategory}</h2>
            <ul>
              {[...new Set(transactions
                .filter((t) => t.category === selectedCategory)
                .map((t) => t.vendor)
              )].map((vendor, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedVendor(vendor)}
                  className="vendor-item"
                >
                  {vendor}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ margin: "20px" }}>
            <button style={{ marginRight: "20px" }}
              onClick={() => setSelectedVendor(null)}
              className="back-button"
            >
              Back
            </button>

            <button onClick={handlePrint} className="print-button">Print Statement</button>

            <h2>Transactions for {selectedVendor}</h2>
            <div id="printable">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>City</th>
                    <th>Product</th>
                    <th>Volume</th>
                    <th>Cost</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .filter(
                      (t) =>
                        t.vendor === selectedVendor &&
                        t.category === selectedCategory
                    )
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((t) => (
                      <tr key={t._id}>
                        <td>{t.date}</td>
                        <td>{t.city}</td>
                        <td>{t.product}</td>
                        <td>{t.volume}</td>
                        <td>{t.cost}</td>
                        <td>{t.transactionType}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor: "yellow",
                              color: "black",
                            }}
                            onClick={() => handleEdit(t._id)}
                          >
                            Edit
                          </button>
                          <> </>
                          <button
                            style={{
                              backgroundColor: "red",
                              color: "black",
                            }}
                            onClick={() => handleDelete(t._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3"><b>Totals:</b></td>
                    <td><b>Volume: {calculateTotals().totalVolume}</b></td>
                    <td><b>Credited: {calculateTotals().totalCredit}</b></td>
                    <td><b>Debited: {calculateTotals().totalDebit}</b></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

          </div >



        )}

      </div>

      <Footer />
    </div>
  );
}

export default App;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi1zSw4YFDQ6NbbIikj9ek0wTkWGecK0k",
  authDomain: "tff-accounts.firebaseapp.com",
  projectId: "tff-accounts",
  storageBucket: "tff-accounts.firebasestorage.app",
  messagingSenderId: "637310148058",
  appId: "1:637310148058:web:58f94d00648ada935eb4e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);






function App() {
  const notify = () => toast("Transaction Added Successfully");
  const currentDate = new Date().toISOString().split('T')[0];

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const [loading, setLoading] = useState(true);
  

  

  const calculateTotals = () => {
    const filteredTransactions = transactions.filter(
      (t) =>
        t.vendor === selectedVendor && t.category === selectedCategory
    );

    const totals = filteredTransactions.reduce(
      (acc, transaction) => {
        acc.totalVolume += parseFloat(transaction.volume) || 0;
        if (transaction.transactionType === "Credit") {
          acc.totalCredit += parseFloat(transaction.cost) || 0;
        } else if (transaction.transactionType === "Debit") {
          acc.totalDebit += parseFloat(transaction.cost) || 0;
        }
        return acc;
      },
      { totalDebit: 0, totalCredit: 0, totalVolume: 0 }
    );

    return totals;
  };

  const calculateOverallTotals = () => {
    const totals = transactions.reduce(
      (acc, transaction) => {
        if (transaction.transactionType === "Credit") {
          acc.totalCredit += parseFloat(transaction.cost) || 0;
        } else if (transaction.transactionType === "Debit") {
          acc.totalDebit += parseFloat(transaction.cost) || 0;
        }
        return acc;
      },
      { totalDebit: 0, totalCredit: 0 }
    );

    return totals;
  };

  const [formData, setFormData] = useState({
    vendor: "",
    city: "",
    date: currentDate,
    product: "",
    volume: "",
    cost: "",
    transactionType: "Credit",
    category: "Rawmaterial",
  });

  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Fetch transactions from the backend
  useEffect(() => {
    axios.get("https://tff-acounts-backend.onrender.com/transactions").then((res) => {
      setTransactions(res.data);
    });
  }, []);

 

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed!");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed!");
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://tff-acounts-backend.onrender.com/transactions", formData).then((res) => {
      setTransactions([...transactions, res.data]);
      setFormData({
        vendor: "",
        city: "",
        date: currentDate,
        product: "",
        volume: "",
        cost: "",
        transactionType: "Credit",
        category: "Rawmaterial",
      });
      setCurrentPage(1); // Reset to first page on new transaction
    });
  };

  const handleDelete = (id) => {
    axios.delete(`https://tff-acounts-backend.onrender.com/transactions/${id}`).then(() => {
      setTransactions(transactions.filter((t) => t._id !== id));
    });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t._id === id);
    setFormData(transaction);
    handleDelete(id); // Delete the old entry to replace it
  };

  const categories = [...new Set(transactions.map((t) => t.category))];

  const handlePrint = () => {
    const contentToPrint = document.getElementById("printable").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = contentToPrint;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  if (!user) {
    // Render login form if user is not logged in
    return (
      <div
        className="login-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <center>    <img src="./tfflogo .png" alt="Company Logo" className="logo-img" style={{ width: "300px" }} />
          </center>
          <h2
            style={{
              marginBottom: "20px",
              color: "#333",
              textAlign: "center",
            }}
          >
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Login
          </button>
          <ToastContainer />
        </div>
        <center style={{ marginBottom: "0%" }}><p>Made with ❤ by Tesseract Tech</p>
          <p>All rights reserved Tesseract Flex Fuel Private Limited & Khemchand Vaijnath Shah</p></center>
      </div>

    );
  }
  

  return (
    <div className="App">
      <Navbar />

      <header className="App-header">
        <h1 style={{ color: "#4CAF50" }}>
          <center>Accounts</center>
        </h1>
        <button
          onClick={handleLogout}
          style={{
            float: "right",
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            margin:"10px",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#d32f2f";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#f44336";
            e.target.style.transform = "scale(1)";
          }}
        >
          Logout
        </button>

      </header>

      <div className="container">
        {!selectedCategory && !selectedVendor ? (
          <div>
            <form onSubmit={handleSubmit} className="form-container">
              <h2>Enter Transaction Details</h2>
              <select style={{ padding: "2px" }}
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="Rawmaterial">Rawmaterial</option>
                <option value="B100">B100</option>
                <option value="Additional">Additional</option>
              </select>
              <input
                style={{ marginTop: "7px" }}
                type="text"
                name="vendor"
                placeholder="Vendor"
                value={formData.vendor}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="product"
                placeholder="Product"
                value={formData.product}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="volume"
                placeholder="Volume"
                value={formData.volume}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={formData.cost}
                onChange={handleInputChange}
                required
              />
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleInputChange}
                required
              >
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>

              <button type="submit" onClick={notify} className="submit-button" style={{ marginTop: "7px", margin: "7px" }}>
                Submit
              </button>
              <ToastContainer />
            </form>

            <div className="categories-list">
              <h1 style={{ color: "#4CAF50" }}>
                <center>Transaction Categories</center>
              </h1>
              <ul>
                {categories.map((category, index) => (
                  <li style={{ margin: "20px", padding: "5px", backgroundColor: "#f9f9f9", cursor: "pointer" }}
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className="category-item"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 style={{ color: "#4CAF50" }}>
                <center>All Transactions</center>
              </h1>
              <center>
                <h3><b>Balance :{((calculateOverallTotals().totalCredit - calculateOverallTotals().totalDebit) / 10000000).toFixed(2)} Cr </b></h3>
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Vendor</th>
                      <th>Credit</th>
                      <th>Debit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((t) => (
                      <tr key={t._id} >
                        <td>{t.date}</td>
                        <td>{t.vendor}</td>
                        <td style={{ color: "green" }}>{t.transactionType === "Credit" ? t.cost : ""}</td>
                        <td style={{ color: "red" }}>{t.transactionType === "Debit" ? t.cost : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2"><b>Total</b></td>
                      <td style={{ color: "green" }}><b>{calculateOverallTotals().totalCredit}</b></td>
                      <td style={{ color: "red" }}><b>{calculateOverallTotals().totalDebit}</b></td>
                    </tr>
                  </tfoot>
                </table>

                <div className="pagination">
                  {[...Array(Math.ceil(transactions.length / transactionsPerPage)).keys()].map(number => (
                    <button
                      key={number + 1}
                      onClick={() => setCurrentPage(number + 1)}
                      className={`pagination-button ${currentPage === number + 1 ? 'active' : 'inactive'
                        }`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
              </center>

            </div>

          </div>
        ) : selectedCategory && !selectedVendor ? (
          <div style={{ margin: "20px" }}>
            <button
              onClick={() => setSelectedCategory(null)}
              className="back-button"
            >
              Back
            </button>
            <h2>Vendors in {selectedCategory}</h2>
            <ul>
              {[...new Set(transactions
                .filter((t) => t.category === selectedCategory)
                .map((t) => t.vendor)
              )].map((vendor, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedVendor(vendor)}
                  className="vendor-item"
                >
                  {vendor}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ margin: "20px" }}>
            <button style={{ marginRight: "20px" }}
              onClick={() => setSelectedVendor(null)}
              className="back-button"
            >
              Back
            </button>

            <button onClick={handlePrint} className="print-button">Print Statement</button>

            <h2>Transactions for {selectedVendor}</h2>
            <div id="printable">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>City</th>
                    <th>Product</th>
                    <th>Volume</th>
                    <th>Cost</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions
                    .filter(
                      (t) =>
                        t.vendor === selectedVendor &&
                        t.category === selectedCategory
                    )
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((t) => (
                      <tr key={t._id}>
                        <td>{t.date}</td>
                        <td>{t.city}</td>
                        <td>{t.product}</td>
                        <td>{t.volume}</td>
                        <td>{t.cost}</td>
                        <td>{t.transactionType}</td>
                        <td>
                          <button
                            style={{
                              backgroundColor: "yellow",
                              color: "black",
                            }}
                            onClick={() => handleEdit(t._id)}
                          >
                            Edit
                          </button>
                          <> </>
                          <button
                            style={{
                              backgroundColor: "red",
                              color: "black",
                            }}
                            onClick={() => handleDelete(t._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3"><b>Totals:</b></td>
                    <td><b>Volume: {calculateTotals().totalVolume}</b></td>
                    <td><b>Credited: {calculateTotals().totalCredit}</b></td>
                    <td><b>Debited: {calculateTotals().totalDebit}</b></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default App;

