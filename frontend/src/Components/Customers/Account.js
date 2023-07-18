import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSetOrder } from "../../Redux/Actions/ordersAction";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Account = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startSetOrder());
    }, [dispatch]);

    const orders = useSelector((state) => {
        return state.orders.data;
    });

    return (
        <div className="container mt-5">
            {
                orders.length===0?
                <div className="card shadow p-4 mt-5">
                <h2 className="text-center mb-4">No Orders Placed Yet</h2>
                <p className="text-center fs-5">
                  You haven't placed any orders yet. Browse the products and start
                  shopping!
                </p>
                <div className="text-center mt-4">
                <Link to="/" className="btn btn-primary btn-browse-products">
                    Browse Products
                  </Link>
                </div>
              </div>:
                <>
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
                                    {order.status && (
                                        <span className="text-success">Order Placed ✅</span>
                                    )}
                                    <hr />
                                    <p className="card-text"><strong>Order ID:</strong> {order.orderId}</p>
                                    <p className="card-text"><strong>Order Date:</strong> {order.orderDate.split("T")[0]}</p>
                                    <p className="card-text"><strong>Total Amount:</strong> {(order.Total) / 100} Rs</p>
                                    <ul className="list-group list-group-flush">
                                        {order.orderItems.map((item) => {
                                            return (
                                                <li key={item._id} className="list-group-item">
                                                    <p className="card-text"><strong>Product Name:</strong> {item.productId?.name} ({item.quantity})</p>
                                                    <p className="card-text"><strong>Shop Name:</strong> {item.shopId?.name}</p>
                                                    <p className="card-text"><strong>Address:</strong> {item.shopId.address}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p className="card-text mt-3"><strong>Payment ID:</strong> {order.paymentId}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
                </>
            }
        </div>
    );
};

export default Account;
