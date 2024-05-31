import { describe, it, vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'
import { ActiveFilter, ActiveFilterItem } from './ActiveFilter'


describe('ActiveFilter tests', () => {
    it('Should render ActiveFilterItem with correct text and click event', () => {
        const handleOnClick = vi.fn()
        render(
            <ActiveFilterItem 
                text="Test filter item"
                onClick={handleOnClick}
            />
        )

        const filterItem = screen.getByText('Test filter item')
        const closeIcon = screen.getByTestId('close-icon')

        expect(filterItem).toBeInTheDocument()
        
        fireEvent.click(closeIcon)
        expect(handleOnClick).toHaveBeenCalledTimes(1)
    })

    it('Should render ActiveFilter with correct name and children', () => {
        render(
            <ActiveFilter name="test-filter">
                <ActiveFilterItem 
                    text="Test filter item"
                    onClick={() => {}}
                />
            </ActiveFilter>
        )

        const filter = screen.getByText('Test filter:')
        const filterItem = screen.getByText('Test filter item')

        expect(filter).toBeInTheDocument()
        expect(filterItem).toBeInTheDocument()
    })
})