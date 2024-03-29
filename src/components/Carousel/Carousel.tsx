import { useState, useRef, useEffect } from 'react'

import { Banner } from '../../features/banner/bannerSlice'

import { IconContext } from 'react-icons'
import { 
    SlArrowLeft,
    SlArrowRight
} from 'react-icons/sl'


interface CarouselProps  {
    items: null | Banner[]
}

const Carousel = ({ items }: CarouselProps) => {
    const carouselSlidesRef = useRef<HTMLDivElement | null>(null)
    const carouselIndicatorsRef = useRef<any | null>(null)
    const [slideWidth, setSlideWidth] = useState<any>(0)
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [translateX, setTranslateX] = useState(0)

    const handleUpdateSlide = (value: number) => {
        if(carouselSlidesRef.current) carouselSlidesRef.current.style.transform = `translateX(${value}px)`
    }

    const handleUpdateIndicator = () => {
        if(carouselIndicatorsRef.current) {
            carouselIndicatorsRef.current.childNodes.forEach((element: HTMLDivElement) => {
                element.classList.remove('border-t-black')
                element.classList.add('border-t-transparent')
            })
            carouselIndicatorsRef.current.children[activeSlide].classList.remove('border-t-transparent')
            carouselIndicatorsRef.current.children[activeSlide].classList.add('border-t-black')
        }
    }

    const handleUpdateSlideWidth = () => {
        if(carouselSlidesRef.current) setSlideWidth(carouselSlidesRef.current.offsetWidth)
    }

    useEffect(() => {
        handleUpdateSlideWidth()

        window.addEventListener('resize', handleUpdateSlideWidth)
        return () => {
            window.removeEventListener('resize', handleUpdateSlideWidth)
        }
    }, [slideWidth])

    useEffect(() => {
        if (items != null) {
            if (translateX === -(items.length * slideWidth)) {
                setTranslateX(0)
                handleUpdateSlide(translateX)
            } else if (translateX === slideWidth) {
                setTranslateX(-((items.length - 1) * slideWidth))
                handleUpdateSlide(translateX)
            } else {
                handleUpdateSlide(translateX)
            }
        } 
    }, [translateX])

    useEffect(() => {
        console.log(activeSlide)
    }, [activeSlide])

    useEffect(() => {
        handleUpdateIndicator()
    }, [activeSlide])

    return (
        <div className="carousel w-full mt-5" data-testid="carousel">
            <IconContext.Provider value={{ color: '#000000', size: '25', style: { margin: '10px 5px', backgroundColor: '' } }}>
                <div className="carousel__inner relative w-full">
                    <div className="flex relative overflow-hidden">
                        <div ref={carouselSlidesRef} className="carousel__banners w-full flex flex-row ease-linear duration-200" data-testid="carousel-banners">
                            {items?.map((slide) =>
                                <img 
                                    key={slide.title}
                                    src={slide.image} 
                                    alt={slide.title} 
                                    className="carousel__banner w-full max-w-full h-auto rounded-lg" 
                                />
                            )}
                        </div>
                    </div>
                    <div 
                        onClick={() => {
                            setTranslateX(prev => prev + slideWidth)
                            if (items != null &&  activeSlide === 0) {
                                setActiveSlide(items.length - 1)
                            } else {
                                setActiveSlide(prev => prev - 1)
                            }
                        }} 
                        className="arrow-prev absolute top-1/2 -translate-y-1/2 -left-5 bg-white shadow-md rounded-md hover:cursor-pointer hover:bg-slate-100"
                        data-testid="arrow-prev"
                    >
                        <SlArrowLeft />
                    </div>
                    <div 
                        onClick={() => {
                            setTranslateX(prev => prev - slideWidth)
                            if (items != null && activeSlide === items.length - 1) {
                                setActiveSlide(0)
                            } else {
                                setActiveSlide(prev => prev + 1)
                            }
                        }} 
                        className="arrow-next absolute top-1/2 -translate-y-1/2 -right-5 bg-white shadow-md rounded-md hover:cursor-pointer hover:bg-slate-100"
                        data-testid="arrow-next"
                    >
                        <SlArrowRight />
                    </div>
                </div>
                <div ref={carouselIndicatorsRef} className="carousel__indicators flex flex-row justify-center">
                    {items?.map((item, index) =>
                        <div
                            key={item.title}
                            onClick={() => {
                                setTranslateX(-(slideWidth * index))
                                setActiveSlide(index)
                            }} 
                            className="carousel__button px-10 py-3 border-t-4 border-t-transparent font-medium rounded transition-colors ease-in-out duration-200 hover:bg-slate-200 hover:cursor-pointer" data-testid="carousel-indicator">{item.title}
                        </div>
                    )}
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default Carousel