import { describe, it } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../../utils/test-utils"

import LoginForm from "./LoginForm"
import { BrowserRouter } from "react-router-dom"


const setup = () => {
    return (
        renderWithProviders(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        ) 
    )
}

describe("LoginForm test", () => {
    it('Test if LoginForm is rendering properly', () => {
        setup()

        const loginForm = screen.getByTestId('login-form')
        const heading = screen.getByTestId('form-heading')
        const emailLabel = screen.getByLabelText('E-mail')
        const passwordLabel = screen.getByLabelText('Hasło')
        const inputs = screen.getAllByRole('input')
        const submitButton = screen.getByRole('button')

        expect(loginForm).toBeInTheDocument()
        expect(heading).toBeInTheDocument()
        expect(emailLabel).toBeInTheDocument()
        expect(passwordLabel).toBeInTheDocument()

        inputs.map(input => {
            expect(input).toBeInTheDocument()
        })

        expect(submitButton).toBeInTheDocument()

        expect(inputs.length).toEqual(2)
    })

    it('Should render inputs with provided values', () => {
        setup()

        const inputs = screen.getAllByRole('input')

        fireEvent.change(inputs[0], { target: { value: 'test@mail.com' } })
        fireEvent.change(inputs[1], { target: { value: 'testpassword' } })

        expect(screen.getByDisplayValue('test@mail.com')).toBeInTheDocument()
        expect(screen.getByDisplayValue('testpassword')).toBeInTheDocument()
    })
})