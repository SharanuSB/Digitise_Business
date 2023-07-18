import { useSelector } from "react-redux"

const Orders = (props)=>{

    const orders = useSelector((state) => {
        return state.orders.data
    })


    return (
        <div className="container mt-5">
            <div className="row">
                <h2 className="mb-4 text-secondary">Total Orders - {orders.length}</h2>
            </div>
            <div className="row">
                {orders.map((order) => {
                    return (
                        <div key={order._id} className="col-md-4 mb-4">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title text-secondary">Order Details</h5>
                                    {order?.status && (
                                        <span className="text-success">Order Placed ✅</span>
                                    )}
                                    <hr />
                                    <p className="card-text"><strong>Customer ID:</strong> {order.customerId}</p>
                                    <p className="card-text"><strong>Order ID:</strong> {order.orderId}</p>
                                    <p className="card-text"><strong>Order Date:</strong> {order.orderDate.split("T")[0]}</p>
                                    <p className="card-text"><strong>Total Amount:</strong> {(order.Total) / 100} Rs</p>
                                    <ul className="list-group list-group-flush">
                                        {order.orderItems.map((item) => {
                                            return (
                                                <li key={item._id} className="list-group-item">
                                                    <p className="card-text"><strong>Product Name:</strong> {item.productId.name} ({item.quantity})</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p className="card-text mt-3"><strong>Payment ID:</strong> {order.paymentId}</p>
                                    <button className="btn btn-primary"> Complete Order </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}
export default Orders