import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSetCustomerCart } from "../../Redux/Actions/cartsAction";
import OrderSummary from "./OrderSummary";
import CartProducts from "./CartProducts";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
      <div className="card shadow p-4 mt-5 empty-cart">
        <h2 className="text-center mb-4">Your Cart is Empty</h2>
        <p className="text-center fs-5">
          You currently have no items in your cart. Add some products to your
          cart to proceed with the checkout.
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary btn-browse-products">
            Browse Products
          </Link>
        </div>
      </div>
    )  : (
        <div className="row">
          <div className="col-md-6 card shadow p-4">
            <div className="text-center">
              <h3 className="fw-bold">Cart Products</h3>
            </div>
            <CartProducts cart={cart} />
          </div>
          <div className="col-md-5">
            <OrderSummary cart={cart} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
