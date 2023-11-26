import { describe, it } from "vitest"
import { render, screen } from "@testing-library/react"

import Logo from './Logo'


describe('Logo component', () => {
    it('Renders Logo component ', () => {
        render(
            <Logo 
                src="/media/logo.png"
                alt="logo"
            />
        )

        const logo = screen.getByAltText('logo')
        
        expect(logo).toBeInTheDocument()
        expect(logo).toHaveAttribute('src', '/media/logo.png')
    })
})