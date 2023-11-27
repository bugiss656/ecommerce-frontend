import { describe, it } from "vitest"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"

import Navigation from "./Navigation"
import NavigationList from "./NavigationList"
import NavigationItem from "./NavigationItem"

import { BsHeadset } from "react-icons/bs"
import { BrowserRouter } from "react-router-dom"


describe('Navigation tests', () => {
    it('Should render Navigation Item with provided props', () => {
        render(
            <BrowserRouter>
                <NavigationItem
                    icon={<BsHeadset size={21} data-testid="navigation-item-icon" />}
                    href="/test"
                    text="Navigation item 1"
                    dropdown={false}
                />
            </BrowserRouter>
        )

        const navigationItem = screen.getByTestId('navigation-item')
        const link = screen.getByRole('link')
        const icon = screen.getByTestId('navigation-item-icon')
        const text = screen.getByText(/navigation item/i)

        expect(navigationItem).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/test')
        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
    })

    it('Should render Dropdown when NavigationItem is hovered', async () => {
        render(
            <BrowserRouter>
                <NavigationItem
                    icon={<BsHeadset size={21} data-testid="navigation-item-icon" />}
                    href="/test"
                    text="Navigation item 1"
                    dropdown={true}
                    children={
                        <ul data-testid="dropdown-list">
                            <li>Category 1</li>
                            <li>Category 2</li>
                            <li>Category 3</li>
                        </ul>
                    }
                />
            </BrowserRouter>
        )

        const navigationItem = screen.getByTestId('navigation-item')

        fireEvent.mouseOver(navigationItem)

        await waitFor(() => {
            const dropdown = screen.getByTestId('dropdown')
            const list = within(dropdown).getByTestId('dropdown-list')
            const listItems = within(list).getAllByText(/category/i)

            expect(list).toBeInTheDocument()
            listItems.map(item => {
                expect(item).toBeInTheDocument()
            })
            expect(listItems.length).toEqual(list.childNodes.length)
        })
    })

    it('Should render the Navigation component with all subcomponents', () => {
        render(
            <BrowserRouter>
                <Navigation>
                    <NavigationList>
                        <NavigationItem
                            icon={<BsHeadset size={21} data-testid="navigation-item-icon" />}
                            href="/test"
                            text="Navigation item 1"
                            dropdown={true}
                        />
                        <NavigationItem
                            icon={<BsHeadset size={21} data-testid="navigation-item-icon" />}
                            href="/test"
                            text="Navigation item 1"
                            dropdown={true}
                        />
                        <NavigationItem
                            icon={<BsHeadset size={21} data-testid="navigation-item-icon" />}
                            href="/test"
                            text="Navigation item 1"
                            dropdown={true}
                        />
                    </NavigationList>
                </Navigation>
            </BrowserRouter>
        )

        const navigation = screen.getByTestId('navigation')
        const navigationList = within(navigation).getByTestId('navigation-list')
        const navigationItems = within(navigationList).getAllByTestId('navigation-item')

        expect(navigation).toBeInTheDocument()
        expect(navigationList).toBeInTheDocument()
        navigationItems.map(item => {
            expect(item).toBeInTheDocument()
        })
        expect(navigationItems.length).toEqual(navigationList.childNodes.length)
    })
})