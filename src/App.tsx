import { useRoutes, Navigate } from 'react-router';
import Layout from 'components/Layout';
import { routes } from "./config/routes";
import ProductDetails from './pages/ProductDetailsPage';
import Products from './pages/ProductsPage';

import 'styles/styles.scss'

function App() {
  const element = useRoutes([
    {
      path: routes.main.mask,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: routes.products.mask,
          element: <Products />,
        },
        {
          path: routes.product.mask,
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={routes.main.mask} replace />,
    },
  ]);

  return element;
}

export default App;