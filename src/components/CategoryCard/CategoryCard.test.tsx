import { it, describe } from 'vitest'
import { 
    screen, 
    render, 
    within
} from '@testing-library/react'

import CategoryCard from './CategoryCard'
import { MemoryRouter } from 'react-router-dom'


const setup = () => {
    return (
        render(
            <CategoryCard
                data-testid='category-card'
                href='/example-url'
                imageSrc='example-image.jpg'
                alt='Example alt text'
                title='Test category'
                width={100}
                height={120}
            />
            , {wrapper: MemoryRouter}
        )
    )
}

describe('CategoryCard test', () => {
    it('Test if CategoryCard component is rendering properly with provided props', () => {
        setup()

        const link = screen.getByTestId('category-card')
        const image = within(link).getByRole('img')
        const title = within(link).getByText(/test category/i)

        expect(link).toHaveAttribute('href', '/example-url')
        expect(image).toHaveAttribute('src', 'example-image.jpg')
        expect(image).toHaveAttribute('alt', 'Example alt text')
        expect(image).toHaveAttribute('width', '100')
        expect(image).toHaveAttribute('height', '120')
        expect(title).toBeInTheDocument()
    })
})