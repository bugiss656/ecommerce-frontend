import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import Carousel from "../components/Carousel/Carousel"
import { fetchBanners, selectBannerError, selectBanners, selectBannerStatus } from "../features/banner/bannerSlice"


const Home = () => {
    const dispatch = useAppDispatch()
    const bannerStatus = useAppSelector(selectBannerStatus)
    const bannerError = useAppSelector(selectBannerError)
    const banners = useAppSelector(selectBanners)


    useEffect(() => {
        dispatch(fetchBanners())
    }, [])
    
    return (
        <>
            {banners && 
                <Carousel items={banners} />
            }
        </>
    )
}

export default Home