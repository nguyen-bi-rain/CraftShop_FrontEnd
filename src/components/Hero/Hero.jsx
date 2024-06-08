import { Carousel } from "@material-tailwind/react"
const Hero = (props) => {
    return (
        <Carousel 
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}

        >
            {props.images.map((image,i) => <img

                key={i}
                src={image.src}
                alt="image"
                className="object-cover h-full w-full"
            />)}
        </Carousel>
    )
}

export default Hero