import { Navigate, RouteObject } from 'react-router';
import App from '../App';
import Products from '../pages/products/Products';
import ProductDetails from '../pages/productDetails/ProductDetails';

export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    mask: '/',
    create: () => '/',
  },
  product: {
    mask: '/product/:id',
    create: (id: string) => `/product/${id}`,
  },
};

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
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
];
