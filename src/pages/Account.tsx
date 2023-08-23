import { BsCardList } from 'react-icons/bs'
import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { BsCardImage } from 'react-icons/bs'

import { AccountMenu, AccountMenuItem } from '../components/AccountMenu/AccountMenu'
import { OrderList, OrderListItem } from '../components/OrderList/OrderList'
import { ShoppingList, ShoppingListItem } from '../components/ShoppingList/ShoppingList'


const Account = () => {
    return (
        <div className="w-full">
            <div className="flex flex-row mt-10">
                <AccountMenu>
                    <AccountMenuItem icon={<BsCardList />} text='Zamówienia' />
                    <AccountMenuItem icon={<FaRegAddressCard />} text='Dane do zamówień' />
                    <AccountMenuItem icon={<AiOutlineHeart />} text='Listy zakupowe' />
                    <AccountMenuItem icon={<FiSettings />} text='Ustawienia konta' />
                </AccountMenu>
                <div className="w-4/5 border-l-[1px] px-4">
                    <div className="mb-8">
                        <OrderList>
                            <OrderListItem icon={<BsCardImage />} />
                        </OrderList>
                    </div>
                    <div className="mb-8">
                        <ShoppingList>
                            <ShoppingListItem />
                        </ShoppingList>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account