import { createRoot } from 'react-dom/client';
import { routesConfig } from 'config/routes.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter(routesConfig);

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<RouterProvider router={router} />);
