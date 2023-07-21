import React from "react";
import { useDispatch } from "react-redux";
import { startPlaceOrder } from "../../Redux/Actions/ordersAction";

const OrderSummary = (props) => {
  const { cart } = props;
  const dispatch = useDispatch();

  const cartTotal = cart.cartItems?.reduce((pv, cv) => {
    return pv + cv.quantity * cv.productId?.price;
  }, 0);

  const handleCheckout = (amount) => {
    if(amount){
      dispatch(startPlaceOrder(amount))
    }
  };

  return (
    <div className="order-summary d-flex justify-content-center">
      <div className="card shadow p-4">
        <h5 className="mb-4">Price Details</h5>
        <div className="order-summary-items">
          {cart?.cartItems?.map((item) => (
            <div key={item._id} className="d-flex justify-content-between align-items-center mb-2">
              <span>{item?.productId?.name}</span>
              <span>Rs. {item.quantity * item?.productId?.price}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Subtotal:</strong>
            <span>Rs. {cartTotal}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Delivery Charges:</strong>
            <span className="text-success">Free</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <h5>Total:</h5>
            <h5 className="text-success">Rs. {cartTotal}</h5>
          </div>
        </div>
        <button
          className="btn btn-primary btn-block mt-3"
          style={{ width: "300px" }} // Add a custom width style to reduce the button width.
          onClick={() => {
            handleCheckout(cartTotal);
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
