import { describe, it } from "vitest"
import { render, screen, within } from "@testing-library/react"

import Dropdown from "./Dropdown"


describe('Dropdown test', () => {
    it('Test if Dropdown is rendering properly with children elements if isOpen porp is true', () => {
        render(
        <Dropdown
            isOpen={true}
        > 
            <ul data-testid="test-list">
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
            </ul>
        </Dropdown>
        )

        const dropdown = screen.getByTestId('dropdown')
        const list = screen.getByTestId('test-list')
        const listItem = within(list).getAllByText('List item', { exact: false })

        expect(dropdown).toBeInTheDocument()
        expect(list).toBeInTheDocument()
        expect(listItem.length).toEqual(3)
    })
})