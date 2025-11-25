import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersPage from './components/users/usersPage';
import ProductsPage from './components/products/productsPage';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
