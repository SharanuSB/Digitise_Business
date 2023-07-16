import { useDispatch } from "react-redux"
import { startAddCartProducts } from "../../Redux/Actions/cartsAction"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Swal from "sweetalert2"
import {withRouter} from "react-router-dom"

const ViewProduct = (props) => {

    const dispatch = useDispatch()

    const { product } = props
    const { _id, name, price, shopId, reviews, isAvailable, image } = product


    const handleAddToCart = (id) => {
        dispatch(startAddCartProducts(id, shopId))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Product Added to Cart',
            showConfirmButton: false,
            timer: 1500
          })
          props.history.push("/cart")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 p-2">
                    <Carousel showThumbs={false}>
                        {
                            image.map(ele => {
                                return <img src={`http://127.0.0.1:3333/${ele}`} width="400" height="400" alt={``} style={{ maxWidth: "400px", maxHeight: "400px" }} />
                            })
                        }
                    </Carousel>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5 p-2">
                    <blockquote><span className="fs-3 fw-bold ">{name}</span></blockquote>
                    <blockquote><span className="font-monospace fs-4">Price</span> : <span className="fs-5">{price}</span></blockquote>
                    <blockquote><span className="font-monospace fs-4">InStock</span> : {isAvailable ? <span className="fs-5">Yes</span> : "No"}</blockquote>
                    <blockquote>{reviews.length === 0 ?
                        <div>There are no reviews for this product yet..</div> : <div>reviews</div>
                    }</blockquote>
                    <button onClick={() => handleAddToCart(_id)} className="btn btn-success"><img />Add to Cart</button>

                </div>
            </div>

        </div>
    )
}

export default withRouter(ViewProduct)
