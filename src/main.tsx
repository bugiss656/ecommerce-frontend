import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Homepage from './pages/Homepage'

import './index.css'
import Login from './pages/Login'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    children: []
  },
  {
    path: '/logowanie',
    element: <Login />
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
