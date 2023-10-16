import { lists } from '../mockdata'

import { BsCardList } from 'react-icons/bs'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { BsCardImage } from 'react-icons/bs'

import { AccountMenu, AccountMenuItem } from '../components/AccountMenu/AccountMenu'
import { OrderList, OrderListItem } from '../components/OrderList/OrderList'
import { ShoppingListCard } from '../components/ShoppingList/ShoppingList'

import { Link, Outlet } from 'react-router-dom'


export const AccountMain = () => {
    return (
        <>
            <div className="mb-8">
                <div className="flex flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl">Zamówienia</h1>
                    <Link to="#" className="px-3 py-1 rounded hover:bg-slate-100">Zobacz więcej</Link>
                </div>
                <OrderList>
                    <OrderListItem icon={<BsCardImage />} />
                </OrderList>
            </div>
            <div className="mb-8">
                <div className="flex flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl">Listy zakupowe</h1>
                    <Link to="#" className="px-3 py-1 rounded hover:bg-slate-100">Zobacz więcej</Link>
                </div>
                {lists.map((list: any) =>
                    <ShoppingListCard
                        name={list.name}
                        lastUpdate={list.lastUpdate}
                        products={list.products}
                        price={list.price}
                    />
                )}
            </div>
        </>
    )
}

const Account = () => {
    return (
        <div className="w-full">
            <div className="flex flex-row mt-10">
                <AccountMenu>
                    <AccountMenuItem 
                        icon={<BsCardList />} 
                        text='Zamówienia' 
                        href="/konto/zamowienia"
                    />
                    <AccountMenuItem 
                        icon={<FaRegAddressCard />} 
                        text='Dane do zamówień' 
                        href="/konto/dane-do-zamowien"
                    />
                    <AccountMenuItem 
                        icon={<AiOutlineHeart />} 
                        text='Listy zakupowe' 
                        href="/konto/listy-zakupowe"
                    />
                    <AccountMenuItem 
                        icon={<FiSettings />} 
                        text='Ustawienia konta' 
                        href="/konto/ustawienia-konta"
                    />
                </AccountMenu>
                <div className="w-4/5 border-l-[1px] px-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account