import { describe, it } from "vitest"
import { render, screen, within } from "@testing-library/react"

import Button from "./Button"
import { BrowserRouter } from "react-router-dom"


describe('Button component', () => {
    it('Test if Button component is rendering properly', () => {
        render(
            <Button 
                className="rounded-md text-sm w-full px-20 py-2 hover:bg-gray-200"
                text="Test button"
            />
        )

        const button = screen.getByText(/test button/i)

        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('rounded-md text-sm w-full px-20 py-2 hover:bg-gray-200')
    })

    it('Test if Button is rendering inside link tag when href prop is provided', () => {
        render(
            <Button
                className="rounded-md text-sm w-full px-20 py-2 hover:bg-gray-200"
                text="Test button"
                href="/test"
            />
            , { wrapper: BrowserRouter }
        )

        const link = screen.getByRole('link')
        const button = within(link).getByText(/test button/i)

        expect(link).toHaveAttribute('href', '/test')
        expect(button).toBeInTheDocument()
    })
})