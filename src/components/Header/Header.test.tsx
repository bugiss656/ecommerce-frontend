import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"

import Header from "./Header"


describe('Header component', () => {
    it('Renders Header component with children elements', () => {
        render(
            <Header
                testid="header-element"
            >
                <div data-testid="children-element"></div>
            </Header>
        )

        const headerElement = screen.getByTestId('header-element')
        const childElement = screen.getByTestId('children-element')

        expect(headerElement).toContainElement(childElement)
    })
})