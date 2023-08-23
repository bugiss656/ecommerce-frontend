import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import Root from './pages/Root'
import Home from './pages/Home'

import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'konto',
                element: <Account />
            } 
        ]
    },
    {
        path: '/logowanie',
        element: <Login />
    },
    {
        path: '/rejestracja',
        element: <Register />
    }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
