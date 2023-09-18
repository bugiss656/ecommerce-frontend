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
import Account, { AccountMain } from './pages/Account'
import Orders from './pages/Orders'



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
                element: <Account />,
                children: [
                    {
                        path: 'podglad',
                        element: <AccountMain />
                    },
                    {
                        path: 'zamowienia',
                        element: <Orders />
                    },
                    {
                        path: 'dane-do-zamowien',
                        element: null
                    },
                    {
                        path: 'listy-zakupowe',
                        element: null
                    },
                    {
                        path: 'ustawienia',
                        element: null
                    }
                ]
            },
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
