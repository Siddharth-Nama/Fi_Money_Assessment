import { useEffect, useState } from 'react';
import { GetProducts, LogoutUser } from '../../api/axios';
import { useNavigate } from 'react-router-dom';

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
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await GetProducts();
      setProducts(res.data.results || res.data); 
    } catch (err) {
      setMessage('Failed to load products.');
    }
  };

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token) {
        await LogoutUser(refresh_token);
      }
    } catch (err) {
      console.log('Logout error:', err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Product List</h2>
      <button
  onClick={() => navigate('/add')}
  style={{ marginRight: '10px', background: '#2196F3', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}
>
  + Add Product
</button>

      <button onClick={handleLogout} style={{ float: 'right', background: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
        Logout
      </button>
      {message && <p>{message}</p>}
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.sku}</td>
              <td>{p.quantity}</td>
              <td>₹{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
