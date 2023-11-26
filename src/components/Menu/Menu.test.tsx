import { describe, it } from "vitest"
import { render, screen, within } from "@testing-library/react"

import Menu from "./Menu"
import MenuItem from "./MenuItem"

import { BsHeadset } from "react-icons/bs"
import { BrowserRouter } from "react-router-dom"


describe('Menu tests', () => {
    it('Should render MenuItem properly with provided props', () => {
        render(
            <BrowserRouter>
                <MenuItem
                   link="/link"
                   icon={<BsHeadset size={21} data-testid="menu-item-icon" />}
                   text="Menu item"
                   dropdown={true}
                />
            </BrowserRouter>
        )

        const menuItem = screen.getByTestId('menu-item')
        const link = screen.getByTestId('menu-item-link')
        const icon = screen.getByTestId('menu-item-icon')
        const text = screen.getByText(/menu item/i)
        const dropdown = screen.getByTestId('dropdown')

        expect(menuItem).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/link')
        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
        expect(dropdown).toBeInTheDocument()
    })

    it('Should render MenuItem without dropdown when dropdown prop is false', () => {
        render(
            <BrowserRouter>
                <MenuItem
                   link="/link"
                   icon={<BsHeadset size={21} data-testid="menu-item-icon" />}
                   text="Menu item"
                   dropdown={false}
                />
            </BrowserRouter>
        )

        const menuItem = screen.getByTestId('menu-item')
        const dropdown = within(menuItem).queryByTestId('dropdown')
        expect(dropdown).toEqual(null)
    })

    it('Should render Menu with MenuItem elements and provided props', () => {
        render(
            <BrowserRouter>
                <Menu>
                    <MenuItem 
                        link="/link-1"
                        icon={<BsHeadset size={21} />}
                        text="Menu item 1"
                        dropdown={true} 
                    />
                    <MenuItem 
                        link="/link-2"
                        icon={<BsHeadset size={21} />}
                        text="Menu item 2"
                        dropdown={true}
                    />
                    <MenuItem 
                        link="/link-3"
                        icon={<BsHeadset size={21} />}
                        text="Menu item 3"
                        dropdown={true}
                    />
                </Menu>
            </BrowserRouter>
        )

        const menu = screen.getByTestId('menu')
        const menuItems = within(menu).getAllByText("menu item", { exact: false })

        expect(menu).toBeInTheDocument()

        menuItems.map(item => {
            expect(item).toBeInTheDocument()
        })
        
        expect(menuItems.length).toEqual(menu.childNodes.length)
    })
})