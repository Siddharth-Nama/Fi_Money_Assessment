import { useState } from "react";
import {addProduct} from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    sku: "",
    description: "",
    quantity: "",
    price: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");

  // Handle input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      type: formData.type,
      sku: formData.sku,
      description: formData.description,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      image_url: formData.image_url,
    };

    try {
      const res = await addProduct(data);

      setMessage(res.data.message || "Product added successfully");
      setTimeout(() => navigate("/products"), 1000);
    } catch (error: any) {
      setMessage("Failed to add product");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="name"
          placeholder="Name"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          name="sku"
          placeholder="SKU"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          style={styles.input}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          step="0.01"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>
          Add Product
        </button>
      </form>
      {message && (
        <p style={message.includes("success") ? styles.success : styles.error}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;

// 💅 Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    paddingTop: "3rem",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    marginTop: "10px",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "1rem",
    textAlign: "center" as const,
  },
  error: {
    color: "red",
    marginTop: "1rem",
    textAlign: "center" as const,
  },
};
