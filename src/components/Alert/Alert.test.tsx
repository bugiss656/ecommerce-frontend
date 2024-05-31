import { describe, it, vi } from "vitest"
import { render, screen, fireEvent } from '@testing-library/react'

import Alert from "./Alert"


describe('Alert component tests', () => {
    it('Should render Alerts with corret types and messages', () => {
        const { rerender } = render(
            <Alert 
                type='success'
                message='Success alert message'
                onClick={() => {}}
            />
        )
        expect(screen.getByRole('alert')).toHaveClass('bg-green-200')
        expect(screen.getByText('Success alert message')).toBeInTheDocument()

        rerender(
            <Alert 
                type='warning'
                message='Warning alert message'
                onClick={() => {}}
            />
        )
        expect(screen.getByRole('alert')).toHaveClass('bg-yellow-200')
        expect(screen.getByText('Warning alert message')).toBeInTheDocument()

        rerender(
            <Alert 
                type='danger'
                message='Danger alert message'
                onClick={() => {}}
            />
        )
        expect(screen.getByRole('alert')).toHaveClass('bg-red-200')
        expect(screen.getByText('Danger alert message')).toBeInTheDocument()
    })

    it('Should call onClick function when close icon is clicked', () => {
        const handleOnClick = vi.fn()
        render(
            <Alert 
                type='success'
                message='Success alert message'
                onClick={handleOnClick}
            />
        )

        const closeIcon = screen.getByTestId('close-icon')
        fireEvent.click(closeIcon)

        expect(handleOnClick).toHaveBeenCalledTimes(1)
    })
})