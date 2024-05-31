import { describe, it } from "vitest"
import { 
    fireEvent, 
    screen, 
    waitFor, 
    within 
} from "@testing-library/react"

import RegisterForm from "./RegisterForm"
import { BrowserRouter } from "react-router-dom"
import { renderWithProviders } from "../../utils/test-utils"


const setup = () => {
    renderWithProviders(
        <BrowserRouter>
            <RegisterForm />
        </BrowserRouter>
    )

    const registerForm = screen.getByTestId('register-form')
    const inputs = within(registerForm).getAllByRole('input')
    const submitButton = screen.getByTestId('submitButton')
    const email = screen.getByTestId('email')
    const password = screen.getByTestId('password')
    
    return {
        registerForm,
        inputs,
        submitButton,
        email,
        password
    }
}

describe('RegisterForm tests', () => {
    it('Should render error messages after submitting a form when all inputs are empty', async () => {
        const { inputs, submitButton } = setup()

        fireEvent.click(submitButton)

        await waitFor(() => {
            inputs.map(input => {
                expect(input).not.toHaveValue()
            })
            
            const errorMessages = screen.getAllByText(/pole jest wymagane/i)
            errorMessages.map(message => {
                expect(message).toBeInTheDocument()
            })

            expect(errorMessages.length).toEqual(inputs.length)
        })
    })

    it('Should render error message when invalid email address is provided', async () => {
        const { email, submitButton } = setup()
       
        fireEvent.change(email, { target: { value: 'johndoemail.com' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            const errorMessage = screen.getByText(/niepoprawny adres e-mail/i)
            expect(errorMessage).toBeInTheDocument()
        })
    })

    it('Should render error message when password is too short', async () => {
        const { password, submitButton } = setup()
       
        fireEvent.change(password, { target: { value: 'johnd' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            const errorMessage = screen.getByText(/hasło musi posiadać min. 6 znaków/i)
            expect(errorMessage).toBeInTheDocument()
        })
    })
})