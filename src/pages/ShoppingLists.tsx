import { ShoppingListCard } from "../components/ShoppingList/ShoppingList"
import { lists } from '../mockdata'


type ShoppingListsProps = {
    // lists: Object[]
}

const ShoppingLists = () => {
    return (
        <>
            <h1 className="text-2xl font-medium mb-8">Listy zakupowe</h1>
            {lists.map((list: any) =>
                <ShoppingListCard
                    name={list.name}
                    lastUpdate={list.lastUpdate}
                    products={list.products}
                    price={list.price}
                />
            )}
        </>
    )
}

export default ShoppingLists