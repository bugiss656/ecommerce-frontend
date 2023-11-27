import Header from "../components/Header/Header"
import Logo from "../components/Logo/Logo"
import SearchBar from "../components/SearchBar/SearchBar"
import Input from "../components/Input/Input"
import Menu from "../components/Menu/Menu"
import MenuItem from "../components/Menu/MenuItem"
import Navigation from "../components/Navigation/Navigation"
import NavigationList from "../components/Navigation/NavigationList"
import NavigationItem from "../components/Navigation/NavigationItem"
import Button from "../components/Button/Button"
import { Link, Outlet } from "react-router-dom"

import logo from "../media/logo.png"
import { BsHeadset, BsPerson, BsCart3 } from "react-icons/bs"
import { BsCardList } from 'react-icons/bs'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectAccount, Status } from "../features/account/accountSlice"
import { selectAccountStatus, selectAccountError, fetchAccountData } from "../features/account/accountSlice"
import { handleUserLogout } from "../features/account/loginSlice"
import { AccountMenu, AccountMenuItem } from "../components/AccountMenu/AccountMenu"


const Root = () => {
    const dispatch = useAppDispatch()
    const accountStatus = useAppSelector(selectAccountStatus)
    const accountError = useAppSelector(selectAccountError)
    const account = useAppSelector(selectAccount)

    useEffect(() => {
        const fetchAccountOnPageReload = () => {
            if (!localStorage.getItem('authToken')) {
                return
            }

            dispatch(fetchAccountData())
        }
        
        window.addEventListener('load', fetchAccountOnPageReload)

        return () => {
            window.removeEventListener('load', fetchAccountOnPageReload)
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            console.log(account)
        }
    }, [accountStatus])

    return (
        <>
            <Header>
                <div className="container flex flex-row justify-between content-center py-[5px]">
                    <div className="flex flex-row items-center">
                        <Link to="/">
                            <Logo src={logo} alt="" />
                        </Link>
                        <SearchBar>
                            <Input type="text" placeholder="Czego szukasz?" value="" />
                        </SearchBar>
                    </div>

                    <Menu>
                        <MenuItem
                            link="#"
                            icon={<BsHeadset size={21} />}
                            text="Kontakt"
                            dropdown={true}
                            children={
                                <ul>
                                    <li>One</li>
                                    <li>Two</li>
                                    <li>Three</li>
                                </ul>
                            }
                        />
                        <MenuItem
                            link="#"
                            icon={<BsPerson size={21} />}
                            text="Twoje konto"
                            dropdown={true}
                            children={
                                localStorage.getItem('authToken') ? (
                                    <>
                                        {accountStatus === Status.LOADING && <div>Loading...</div>}
                                        {accountStatus === Status.FAILED && <div>{accountError}</div>}
                                        {accountStatus === Status.SUCCEEDED && (
                                            <>
                                                <div className="p-3 mb-3">
                                                    <p className="text-sm text-gray-500">Cześć,</p>
                                                    <h1 className="text-xl">{account?.first_name}</h1>
                                                </div>
                                                <AccountMenu>
                                                    <AccountMenuItem 
                                                        icon={<BsCardList />} 
                                                        text='Zamówienia' 
                                                        href="/konto/zamowienia"
                                                        className="flex flex-row items-center px-3 py-2 hover:cursor-pointer hover:bg-slate-100"
                                                    />
                                                    <AccountMenuItem 
                                                        icon={<FaRegAddressCard />} 
                                                        text='Dane do zamówień' 
                                                        href="/konto/dane-do-zamowien"
                                                        className="flex flex-row items-center px-3 py-2 hover:cursor-pointer hover:bg-slate-100"
                                                    />
                                                    <AccountMenuItem 
                                                        icon={<AiOutlineHeart />} 
                                                        text='Listy zakupowe' 
                                                        href="/konto/listy-zakupowe"
                                                        className="flex flex-row items-center px-3 py-2 hover:cursor-pointer hover:bg-slate-100"
                                                    />
                                                    <AccountMenuItem 
                                                        icon={<FiSettings />} 
                                                        text='Ustawienia konta' 
                                                        href="/konto/ustawienia-konta"
                                                        className="flex flex-row items-center px-3 py-2 hover:cursor-pointer hover:bg-slate-100"
                                                    />
                                                </AccountMenu>
                                                <hr className="mt-3 mb-1" />
                                                <div className="px-3 py-2">
                                                    <Button 
                                                        className="rounded-md text-sm w-full px-20 py-2 hover:bg-gray-200"
                                                        text="Wyloguj się" 
                                                        onClick={() => {
                                                            dispatch(handleUserLogout())
                                                            location.reload()
                                                            console.log('clicked')
                                                        }}   
                                                    />
                                                </div>
                                                
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center w-full p-3">
                                        <Button 
                                            className="rounded-md text-white text-sm w-full px-20 py-2 bg-green-500 hover:bg-green-600"
                                            text="Zaloguj się"
                                            href="/logowanie"
                                        />
                                        <div className="flex flex-row justify-center items-center my-3">
                                            <div className="h-[1px] w-14 bg-gray-300"></div>
                                            <p className="text-sm text-gray-500 mx-2">Nie masz konta?</p>
                                            <div className="h-[1px] w-14 bg-gray-300"></div>
                                        </div>
                                        <Button 
                                            className="rounded-md border-[1px] text-blue-500 bg-white border-blue-500 text-sm px-20 py-2 hover:text-white hover:bg-blue-500"
                                            text="Załóż konto"
                                            href="/rejestracja"
                                        />
                                    </div>
                                )}
                        />
                        <MenuItem
                            link="#"
                            icon={<BsCart3 size={21} />}
                            text="Koszyk"
                            dropdown={true}
                            children={
                                <ul>
                                    <li>One</li>
                                    <li>Two</li>
                                    <li>Three</li>
                                </ul>
                            }
                        />
                    </Menu>
                </div>
                <Navigation>
                    <div className="container">
                        <NavigationList>
                            <NavigationItem 
                                href="#" 
                                text="Kategoria 1" 
                                dropdown={true}
                                children={
                                    <ul>
                                        <li>Category 1</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                    </ul>
                                } 
                            />
                            <NavigationItem 
                                href="#" 
                                text="Kategoria 2" 
                                dropdown={true}
                                children={
                                    <ul>
                                        <li>Category 1</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                    </ul>
                                }  
                            />
                            <NavigationItem 
                                href="#" 
                                text="Kategoria 3" 
                                dropdown={true} 
                                children={
                                    <ul>
                                        <li>Category 1</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                    </ul>
                                } 
                            />
                            <NavigationItem 
                                href="#" 
                                text="Kategoria 4" 
                                dropdown={true} 
                                children={
                                    <ul>
                                        <li>Category 1</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                    </ul>
                                } 
                            />
                        </NavigationList>
                    </div>
                </Navigation>
            </Header>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default Root;
