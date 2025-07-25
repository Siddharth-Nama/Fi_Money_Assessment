import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        username,
        password,
      };
      const res = await LoginUser(payload);
      const { access_token, refresh_token } = res.data;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/products'), 1000);
    } catch (error: any) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Login failed.');
      }
    }
  };

  // Simple inline styles
  const styles = {
    container: {
      maxWidth: 400,
      margin: 'auto',
      marginTop: '6rem',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    registerButton: {
      backgroundColor: '#2196F3',
      marginTop: '10px',
    },
    title: {
      textAlign: 'center' as const,
      marginBottom: '1rem',
    },
    message: {
      color: 'red',
      textAlign: 'center' as const,
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
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
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <button
        style={{ ...styles.button, ...styles.registerButton }}
        onClick={() => navigate('/register')}
      >
        Register
      </button>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

export default Login;
