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
import OrderInfo from './pages/OrderInfo'
import ShoppingLists from './pages/ShoppingLists'

import AuthRequired from './components/AuthRequired/AuthRequired'
import { Provider } from 'react-redux'
import { setupStore } from './app/store'
import Categories from './pages/Categories'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import AccountSettings from './pages/AccountSettings'


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
                element: 
                    <AuthRequired>
                        <Account />
                    </AuthRequired>,
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
                        element: <OrderInfo />
                    },
                    {
                        path: 'listy-zakupowe',
                        element: <ShoppingLists />
                    },
                    {
                        path: 'ustawienia-konta',
                        element: <AccountSettings />
                    }
                ]
            },
            {
                path: 'kategorie/:category',
                element: <Categories />,
            },
            {
                path: 'produkty-w-kategoriach/:category',
                element: <Products />,
            },
            {
                path: 'produkty/:slug',
                element: <ProductDetail />,
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
        <Provider store={setupStore()}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)