import { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
