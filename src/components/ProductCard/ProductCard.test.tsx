import { describe, it } from 'vitest'
import { screen, render } from '@testing-library/react'

import ProductCard from './ProductCard'
import { MemoryRouter } from 'react-router-dom'


const setup = (
    imageSrc: string, 
    title: string, 
    href: string, 
    availability: number, 
    price: number
    ) => {
    return(
        render(
            <ProductCard
                imageSrc={imageSrc}
                title={title}
                href={href}
                availability={availability}
                price={price}
            />,
            { wrapper: MemoryRouter }
        )
    )
}

describe('ProductCard component tests', () => { 
    it('Should properly render ProductCard with provided props', () => {
        setup("example-image.jpg", "Example product title", "/example-link", 10, 1500)

        const productCard = screen.getByTestId('product-card')
        const image = screen.getByRole('img')
        const title = screen.getByText('Example product title')
        const price = screen.getByText(/1500/i)

        expect(productCard).toBeInTheDocument()

        expect(image).toHaveAttribute('src', 'example-image.jpg')
        expect(image).toHaveAttribute('alt', 'Example product title')

        expect(title).toBeInTheDocument()
        expect(price).toBeInTheDocument()
    })

    it('Should render ProductCard with appropriate availability text if availability is greater than 0', () => {
        setup("example-image.jpg", "Example product title", "/example-link", 10, 1500)

        const productAvailableText = screen.getByTestId('product-available')

        expect(productAvailableText).toBeInTheDocument()
        expect(productAvailableText).toHaveClass('text-green-600')
        expect(productAvailableText).not.toHaveClass('text-red-600')
    })

    it('Should render ProductCard with appropriate availability text if availability is less or equal 0', () => {
        setup("example-image.jpg", "Example product title", "/example-link", 0, 1500)

        const productUnavailableText = screen.getByTestId('product-unavailable')

        expect(productUnavailableText).toBeInTheDocument()
        expect(productUnavailableText).toHaveClass('text-red-600')
        expect(productUnavailableText).not.toHaveClass('text-green-600')
    })
})