import { describe, it } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import ImageGallery from './ImageGallery'


const mockImages = [
    { image: 'image1.jpg', alt: 'Image 1' },
    { image: 'image2.jpg', alt: 'Image 2' },
    { image: 'image3.jpg', alt: 'Image 3' },
]

const setup = () => {
    return (
        render(<ImageGallery images={mockImages} />)    
    )
}

describe('ImageGallery component tests', () => {
    it('Should render ImageGallery with images', () => {
        setup()

        const image = screen.getByAltText('Image 1')
        expect(image).toBeInTheDocument()
    })

    it('Should show next image when right arrow is clicked', () => {
        setup()

        const rightArrow = screen.getByTestId('right-arrow')
        fireEvent.click(rightArrow)

        const currentImage = screen.getByAltText('Image 2')
        expect(currentImage).toBeInTheDocument()
    })

    it('Should show previous image when left arrow is clicked', () => {
        setup()

        const rightArrow = screen.getByTestId('right-arrow')
        fireEvent.click(rightArrow)
        fireEvent.click(rightArrow)

        const leftArrow = screen.getByTestId('left-arrow')
        fireEvent.click(leftArrow)

        const currentImage = screen.getByAltText('Image 2')
        expect(currentImage).toBeInTheDocument()
    })

    it('Should loop to last image when left arrow is clicked on first image', () => {
        setup()

        const leftArrow = screen.getByTestId('left-arrow')
        fireEvent.click(leftArrow)

        const currentImage = screen.getByAltText('Image 3')
        expect(currentImage).toBeInTheDocument()
    })

    it('Should loop to first image when right arrow is clicked on last image', () => {
        setup()

        const rightArrow = screen.getByTestId('right-arrow')
        fireEvent.click(rightArrow)
        fireEvent.click(rightArrow)
        fireEvent.click(rightArrow)

        const currentImage = screen.getByAltText('Image 1')
        expect(currentImage).toBeInTheDocument()
    })
})