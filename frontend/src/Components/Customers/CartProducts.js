import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CartProducts = (props) => {

    const { cart } = props

    return (
        <div>
            {cart?.cartItems?.map(item => (
                <div key={item._id} className="container card my-4 shadow">
                    <div className="row my-3">
                        <div className="col-md-6">
                            <Carousel showThumbs={false}>
                                {item?.productId?.image?.map((ele, index) => (
                                    <img
                                        key={index}
                                        className="rounded mx-auto d-block"
                                        src={`http://127.0.0.1:3333/${ele}`}
                                        width="200"
                                        height="200"
                                        alt="HTML tag"
                                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                                    />
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-md-6 my-3">
                            <h4 className="card-title">{item?.productId?.name}</h4>
                            <h5 className="card-subtitle mb-2 text-muted">Price: {item?.productId?.price}</h5>
                            <p className="card-text">Qty: {item?.quantity}</p>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-secondary ">-</button>
                                <span className="mx-3">{item?.quantity}</span>
                                <button className="btn btn-secondary ">+</button>
                            </div>
                            <div className="p-2">
                                <h4 className="fw-bold">Product Total: <span className="text-success"> {item.quantity * item?.productId?.price}</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartProducts
