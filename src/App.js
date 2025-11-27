import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

const App = () => {
  return (
    <BrowserRouter basename="/">
      {/* <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout> */}
      <AppRoutes />
    </BrowserRouter>
  );
};
export default App;
