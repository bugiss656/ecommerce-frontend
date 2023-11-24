import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"

import Input from "./Input"


describe('Input test', () => {
    it('Test if Input is rendering properly with provided props', () => {
        render(
            <Input
                type="text"
                placeholder="Test placeholder"
                value="Test input value"
            />
        )

        const input = screen.getByRole('input')

        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('type', 'text')
        expect(input).toHaveAttribute('placeholder', 'Test placeholder')
        expect(input).toHaveValue('Test input value')
    })
})