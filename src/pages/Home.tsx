import Carousel from "../components/Carousel/Carousel"


const Home = () => {

    const data = [
        {
            title: "Slide title 1",
            src: "src/assets/slide-1.jpg",
        },
        {
            title: "Slide title 2",
            src: "src/assets/slide-2.jpg",
        },
        {
            title: "Slide title 3",
            src: "src/assets/slide-3.jpg",
        },
    ];
    
    return (
        <>
            <Carousel items={data} />
        </>
    )
}

export default Home