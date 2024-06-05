import { describe, it } from 'vitest'
import { screen, render } from '@testing-library/react'

import { Modal, ModalHeader, ModalBody } from './Modal'


describe('Modal component tests', () => {
    it('Should render a Modal component with children elements', () => {
        render(
            <Modal>
                <ModalHeader>
                    <h1>Modal header content</h1>
                </ModalHeader>
                <ModalBody>
                    <div>Modal body content</div>
                </ModalBody>
            </Modal>
        )

        const modal = screen.getByTestId('modal')
        const modalHeader = screen.getByText('Modal header content')
        const modalBody = screen.getByText('Modal body content')

        expect(modal).toBeInTheDocument()
        expect(modalHeader).toBeInTheDocument()
        expect(modalBody).toBeInTheDocument()
    })
})