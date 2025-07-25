import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/Login';
import ProductList from './components/auth/ProductList';
import AddProduct from './components/auth/AddProduct';
import UpdateQuantity from './components/auth/UpdateQuantity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateQuantity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
