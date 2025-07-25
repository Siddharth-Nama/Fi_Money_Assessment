import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        username,
        password,
      };
      const res = await RegisterUser(payload);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error: any) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Registration failed.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "auto",
    paddingTop: "5rem",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginTop: "1rem",
    color: "red",
  },
};

export default Register;
