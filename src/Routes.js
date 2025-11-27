import { useSelector } from 'react-redux';
import { useRoutes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import Layout from './components/Layout/Layout';
import ProductsPage from './components/products/productsPage';
import UsersPage from './components/users/usersPage';

const PrivateRoutes = ({ element }) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  console.log(isAuth, 'auth in private');
  return isAuth ? element : <Navigate to="/signin" replace />;
};

const PublicRoutes = ({ element }) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  console.log(isAuth, 'auth in public');
  return !isAuth ? element : <Navigate to="/dashboard" replace />;
};
const AppRoutes = () => {
  const routes = [
    { path: '/signin', element: <PublicRoutes element={<SignIn />} /> },
    { path: '/signup', element: <PublicRoutes element={<SignUp />} /> },
    {
      path: '/',
      element: <PrivateRoutes element={<Layout />} />,
      children: [
        { path: '/dashboard', index: true, element: <Dashboard /> },
        { path: '/products', element: <ProductsPage /> },
        { path: '/users', element: <UsersPage /> },
      ],
    },
    {
      path: '*',
      element: <div>404 Not Found</div>,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
