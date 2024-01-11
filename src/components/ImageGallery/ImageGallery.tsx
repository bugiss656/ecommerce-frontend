import { useState, useEffect } from "react"
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"
import { Image } from "../../features/products/productsSlice"


type ImageGalleryProps = {
    images: Image[] | undefined
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    const [currentImage, setCurrentImage] = useState(0)

    const previousImage = () => {
        if (currentImage <= 0) {
            setCurrentImage(images!.length - 1)
        } else {
            setCurrentImage(prev => prev - 1)
        }
    }

    const nextImage = () => {
        if (currentImage >= images!.length - 1) {
            setCurrentImage(0)
        } else {
            setCurrentImage(prev => prev + 1)
        }
    }

    return (
        <div className="relative">
            <div className="relative">
                {images?.length != 0 ?
                    <img src={images![currentImage].image} alt={images![currentImage].alt} /> : 
                    null
                }
            </div>
            {images?.length != 0 &&
                <>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1 text-3xl text-white hover:cursor-pointer" onClick={() => previousImage()}>
                        <SlArrowLeft />
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-1 text-3xl text-white hover:cursor-pointer" onClick={() => nextImage()}>
                        <SlArrowRight />
                    </div> 
                </>
            }
        </div>
    )
}

export default ImageGallery