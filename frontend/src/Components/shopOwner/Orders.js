    import { useSelector, useDispatch } from "react-redux"
    import { useEffect } from "react"
    import { startSetShopOrders } from "../../Redux/Actions/ordersAction"
    import { startGetShopDetails } from "../../Redux/Actions/shopsActions"

    const Orders = (props)=>{

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(startGetShopDetails());
        }, [dispatch]);

        const shop = useSelector((state) => {
            return state.shops.data;
        })

        useEffect(()=>{
            if(shop?._id){
                dispatch(startSetShopOrders(shop?._id))
            } 
        },[dispatch, shop])


        const orders = useSelector((state) => {
            return state.orders?.shopOrders
        })


        return (
            <div className="container mt-5">
                <div className="row">
                    <h2 className="mb-4 text-secondary">Total Orders - {orders?.length}</h2>
                </div>
                <div className="row">

                    {orders && orders?.map((order) => {
                        return (
                            <div key={order._id} className="col-md-4 mb-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h5 className="card-title text-secondary">Order Details</h5>
                                        {order?.status && (
                                            <span className="text-success">Order Placed ✅</span>
                                        )}
                                        <hr />
                                        <p className="card-text"><strong>Name : </strong> {order.customerId.username}</p>
                                        <p className="card-text"><strong>Email : </strong> {order.customerId.email}</p>
                                        <p className="card-text"><strong>Order Date:</strong> {order.orderDate.split("T")[0]}</p>
                                        <ul className="list-group list-group-flush">
                                            {
                                                order.orderItems.filter(ele=>ele.shopId===shop?._id).map(item=>{
                                                    return (
                                                        <li key={item._id} className="list-group-item">
                                                        <p className="card-text"><strong>Product Name:</strong> {item.productId.name} ({item.quantity})</p>
                                                        <p className="card-text"><strong>Price : </strong> {item.productId.price}</p>
                                                        <p className="card-text"><strong>Total Amount : </strong> {item.productId.price * item.quantity}</p>
                                                    </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <p className="card-text mt-3"><strong>Payment ID:</strong> {order.paymentId}</p>
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