import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"

import Flex from "./Flex"


describe('Flex component', () => {
    it('Renders Flex component with className and children element', () => {
        render(
            <Flex 
                testid="flex-element"
                className="flex flex-row"
            >
                <div data-testid="child-element">Children element</div>
            </Flex>
        )

        const flexElement = screen.getByTestId('flex-element')
        const childElement = screen.getByTestId('child-element')

        expect(flexElement).toHaveClass('flex flex-row')
        expect(flexElement).toContainElement(childElement)
    })
})