import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { AccountMenu, AccountMenuItem } from "./AccountMenu"
import { BsCardList } from "react-icons/bs"
import { BrowserRouter } from "react-router-dom"


describe('AccountMenu components', () => {
    it('Test if AccountMenu is rendered without any children elements', () => {
        render(<AccountMenu></AccountMenu>)
        const accountMenu = screen.getByTestId('account-menu')
        expect(accountMenu).toBeInTheDocument()
    })

    it('Test if AccountMenuItem is rendered properly with provided props', () => {
        render(
            <AccountMenuItem 
                icon={<BsCardList data-testid="menu-icon" />}
                text="Menu Item" 
                href="/test" 
                className="flex flex-row hover:cursor-pointer"
            />,
            { wrapper: BrowserRouter }
        )

        const menuItem = screen.getByText(/menu item/i)
        const icon = screen.getByTestId('menu-icon')

        expect(menuItem).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(menuItem).toHaveAttribute('href', '/test')
        expect(menuItem).toHaveClass('flex flex-row hover:cursor-pointer')
    })

    it('Test if AccountMenu is rendering properly with AccountMenuItems provided', () => {
        render(
            <AccountMenu>
                <AccountMenuItem 
                    icon={<BsCardList data-testid="menu-icon" />}
                    text="Menu Item 1" 
                    href="/test-1" 
                    className="flex flex-row hover:cursor-pointer"
                />
                <AccountMenuItem 
                    icon={<BsCardList data-testid="menu-icon" />}
                    text="Menu Item 2" 
                    href="/test-2" 
                    className="flex flex-row hover:cursor-pointer"
                />
                <AccountMenuItem 
                    icon={<BsCardList data-testid="menu-icon" />}
                    text="Menu Item 3" 
                    href="/test-3" 
                    className="flex flex-row hover:cursor-pointer"
                />
            </AccountMenu>, 
            { wrapper: BrowserRouter }
        )

        const accountMenu = screen.getByTestId('account-menu')
        const accountMenuItems = screen.getAllByText('menu item', { exact: false })

        expect(accountMenuItems.length).toEqual(accountMenu.childNodes.length)
    })
})