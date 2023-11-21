import { Banner } from "../features/banner/bannerSlice";
import banner1 from "../mocks/banners/banner-1.jpg"
import banner2 from "../mocks/banners/banner-2.jpg"
import banner3 from "../mocks/banners/banner-3.jpg"


export const banners: Banner[] = [
    {
        title: 'Title 1',
        isActive: true,
        orderingNumber: 1,
        image: 'src/mocks/banners/banner-1.jpg',
        href: 'http://google.com'
    },
    {
        title: 'Title 2',
        isActive: true,
        orderingNumber: 2,
        image: 'src/mocks/banners/banner-1.jpg',
        href: 'http://google.com'
    },
    {
        title: 'Title 3',
        isActive: true,
        orderingNumber: 3,
        image: 'src/mocks/banners/banner-1.jpg',
        href: 'http://google.com'
    }
]