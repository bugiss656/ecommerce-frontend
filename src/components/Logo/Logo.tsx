

type LogoProps = {
    src: string,
    alt: string
}


const Logo = ({ src, alt }: LogoProps) => {
    return (
        <img src={src} alt={alt} />
    )
}

export default Logo