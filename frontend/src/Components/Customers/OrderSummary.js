const OrderSummary = (props) => {

    const {cart} = props

    const cartTotal = cart.cartItems.reduce((pv, cv) => {
        return pv + cv.quantity * cv.productId.price
    }, 0)


    return (
        <div className="position-fixed p-2">
            <h3 className="badge bg-secondary fs-4 card shadow">Price Details</h3>
            <div className="container">
                <div className="card my-4 shadow p-3">
                    <h4 className="mb-3">Order Summary</h4>
                    {cart?.cartItems?.map(item => (
                        <div key={item._id} className="d-flex justify-content-between align-items-center">
                            <span>{item?.productId?.name}</span>
                            <span>Rs. {item.quantity * item?.productId?.price}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Subtotal:</h4>
                        <h4>Rs. {cartTotal}</h4>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Delivery Charges:</h4>
                        <h4 className="text-success">Free</h4>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Total:</h4>
                        <h4 className="text-success">Rs. {cartTotal}</h4>
                    </div>
                </div>
                <button className="btn btn-primary">Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default OrderSummary