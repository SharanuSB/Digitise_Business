import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSetCustomerCart } from "../../Redux/Actions/cartsAction";
import OrderSummary from "./OrderSummary";
import CartProducts from "./CartProducts";

const Cart = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startSetCustomerCart());
    }, [dispatch]);

    const cart = useSelector((state) => {
        return state.carts.data;
    });

    return (
        <div className="container">
            {Object.keys(cart).length === 0 ? (
                <div className="card shadow justify-content-center align-items-center">
                    <h1>There are no items in your cart</h1>
                    <p>Add the Products</p>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-6">
                        <div className="container">
                            <h1 className="text-center badge bg-secondary fs-4 card shadow">Cart Products</h1>
                        </div><hr/>
                    <CartProducts cart = {cart}/> 
                    </div>
                    <div className="col-md-6">
                        <OrderSummary cart={cart} />
                    </div>
                </div>

            )}
        </div>
    );
};

export default Cart;
