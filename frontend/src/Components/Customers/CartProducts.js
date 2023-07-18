import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { startDecProductQuantity, startIncProductQuantity, startRemoveProductFromCart } from "../../Redux/Actions/cartsAction";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"

const CartProducts = (props) => {

    const { cart } = props

    const dispatch = useDispatch()

    const handleDecCartQuantity = (id, qty)=>{
        if(qty>1){
            dispatch(startDecProductQuantity(id))
        } 
    }

    const handleIncCartQuantity = (id, qty) =>{
        if(qty<5){
            dispatch(startIncProductQuantity(id))
        }else{
            Swal.fire('Maximum Quatity for this product Reached')
        }
    }

    const handleRemoveFromCart = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Removed!',
                'Your Product has been removed.',
                'success'
              )
              dispatch(startRemoveProductFromCart(id))
            }
          })
        
    }

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
                                <button className="btn btn-secondary " onClick={()=>{handleDecCartQuantity(item.productId._id, item?.quantity)}}>-</button>
                                <span className="mx-3">{item?.quantity}</span>
                                <button className="btn btn-secondary " onClick={()=>{(handleIncCartQuantity(item.productId._id,item?.quantity ))}}>+</button>
                            </div>
                            <div className="p-2">
                                <h4 className="fw-bold">Product Total: <span className="text-success"> {item.quantity * item?.productId?.price}</span></h4>
                                <button className="btn btn-outline-warning btn-sm" onClick={()=>{handleRemoveFromCart(item?.productId?._id)}}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartProducts
