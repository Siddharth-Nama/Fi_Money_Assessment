import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UpdateProductQuantity } from '../../api/axios';

const UpdateQuantity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await UpdateProductQuantity(parseInt(id!), parseInt(quantity));
      setMessage(res.data.message || 'Quantity updated successfully');
      setTimeout(() => navigate('/products'), 1000);
    } catch (err) {
      setMessage('Failed to update quantity');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update Quantity (Product ID: {id})</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="New Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Update</button>
      </form>
      {message && <p style={message.includes('success') ? styles.success : styles.error}>{message}</p>}
    </div>
  );
};

export default UpdateQuantity;

// 💅 Styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '4rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    marginTop: '1rem',
    textAlign: 'center' as const,
  },
  error: {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center' as const,
  },
};
