import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ViewProduct = (props) => {

    const dispatch = useDispatch()

    const { product } = props
    const { _id, name, price, shopId, reviews, isAvailable } = product


    const handleAddToCart = () => {

    }

    const shopName = ()=>{
        
    }

    return (
        <div>
            <blockquote><span className="font-monospace fs-4">Product Name</span> : <span className="fs-5">{name}</span></blockquote>
            <blockquote><span className="font-monospace fs-4">Price</span> : <span className="fs-5">{price}</span></blockquote>
            <blockquote><span className="font-monospace fs-4">InStock</span> : {isAvailable ?<span className="fs-5">Yes</span> : "No"}</blockquote>
            <blockquote><span className="font-monospace fs-4">Shop</span> : <span className="fs-5">{shopName(shopId)}</span></blockquote>
            <blockquote>{reviews.length === 0 ?
                <div>There are no reviews for this product yet..</div> : <div>reviews</div>
            }</blockquote>
            <button onClick={handleAddToCart} className="btn btn-success">Add to Cart</button>
        </div>
    )
}

export default ViewProduct
