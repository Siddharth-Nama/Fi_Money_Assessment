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
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: "5rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
