import { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <div>404 - Page not found</div>
          </Suspense>
        ),
      },
    ],
  },
]);
