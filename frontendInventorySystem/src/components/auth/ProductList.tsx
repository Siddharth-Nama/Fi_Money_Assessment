import { useEffect, useState } from "react";
import { GetProducts, LogoutUser } from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  type: string;
  sku: string;
  quantity: number;
  price: number;
}

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await GetProducts();
      setProducts(res.data.results || res.data);
    } catch (err) {
      setMessage("Failed to load products.");
    }
  };

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        await LogoutUser(refresh_token);
      }
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Inventory Dashboard</h2>
        <div>
          <button style={styles.addBtn} onClick={() => navigate("/add")}>+ Add Product</button>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {message && <p style={styles.error}>{message}</p>}

      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>SKU</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={styles.row}>
              <td style={styles.cell}>{p.id}</td>
              <td style={styles.cell}>{p.name}</td>
              <td style={styles.cell}>{p.type}</td>
              <td style={styles.cell}>{p.sku}</td>
              <td style={styles.cell}>{p.quantity}</td>
              <td style={styles.cell}>₹{p.price}</td>
              <td style={styles.cell}>
                <button style={styles.updateBtn} onClick={() => navigate(`/update/${p.id}`)}>
                  Update Qty
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

const styles = {
  container: {
    container: {
    width: "100vw",
    height: "100vh",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
    overflowX: "auto",
  },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "1.8rem",
    margin: 0,
    color: "#ccc",
  },
  addBtn: {
    padding: "10px 16px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "10px 16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  theadRow: {
    backgroundColor: "#343a40",
    color: "white",
  },
  th: {
    padding: "12px",
    textAlign: "left" as const,
  },
  row: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.2s ease",
  },
  cell: {
    padding: "12px",
    color: "#333",
  },
  updateBtn: {
    padding: "6px 12px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
};
