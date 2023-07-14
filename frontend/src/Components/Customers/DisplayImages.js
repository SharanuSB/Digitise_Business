import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const DisplayImages = (props) => {

    const {images} = props

    return (
        <div>
            <>
                <Carousel showThumbs={false}>
                    {
                        images.map(ele => {
                            return <img src={`http://127.0.0.1:3333/${ele}`} width="400" height="300" alt="HTML tag" style={{ maxWidth: "400px", maxHeight: "300px" }} />
                        })
                    }
                </Carousel>
            </>
        </div>
    )
}

export default DisplayImages