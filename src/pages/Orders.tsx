import { OrderList, OrderListItem } from "../components/OrderList/OrderList"

import { BsCardImage } from 'react-icons/bs'



const Orders = () => {
    return (
        <>
            <h1 className="text-3xl mb-8 font-medium">Zamówienia</h1>
            <OrderList>
                <OrderListItem icon={<BsCardImage />} />
                <OrderListItem icon={<BsCardImage />} />
                <OrderListItem icon={<BsCardImage />} />
            </OrderList>
        </>
    )
}

export default Orders