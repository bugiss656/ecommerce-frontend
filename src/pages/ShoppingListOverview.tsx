import { ShoppingList, ShoppingListItem } from "../components/ShoppingList/ShoppingList"


const ShoppingListOverview = () => {
    return (
        <>
            <div className="">
                <div className="">
                    <h1>Nazwa listy</h1>
                    <button></button>
                </div>
                <div className="">
                    {"04.10.2023"}
                </div>
            </div>
            <div className="">
                <ShoppingList>
                    <ShoppingListItem 
                        name="Lorem ipsum dolor"
                        price="99,99 zł"
                        imageSrc="https://google.com"
                    />
                </ShoppingList>
            </div>
        </>
    )
}

export default ShoppingListOverview