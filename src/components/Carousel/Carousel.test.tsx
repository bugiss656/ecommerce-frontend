import { describe, it } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"

import Carousel from "./Carousel"
import { banners } from "../../mocks/mockdata"


describe('Carousel component', () => {
    it('Test if Carousel renders properly with arrows and indicators and provided banners', async () => {
        render(<Carousel items={banners} />)

        const arrowNext = screen.getByTestId('arrow-next')
        const arrowPrev = screen.getByTestId('arrow-prev')
        const carouselBanners = screen.getAllByRole('img')
        const carouselIndicators = screen.getAllByTestId('carousel-indicator')

        expect(arrowNext).toBeInTheDocument()
        expect(arrowPrev).toBeInTheDocument()

        await waitFor(() => {
            carouselBanners.map((image, index) => {
                expect(image).toHaveAttribute('src', banners[index].image)
            })

            expect(carouselIndicators.length).toEqual(banners.length)
            expect(carouselBanners.length).toEqual(banners.length)
            expect(carouselIndicators.length).toEqual(carouselBanners.length)
        })
    })
})