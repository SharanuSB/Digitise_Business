const HomePageShopOwner = () => {

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h1 className="text-center mb-4">Welcome, Shop Owner!</h1>
                <p className="text-center">
                    As a shop owner, you have access to manage your shop and process orders.
                </p>

                <div className="card mt-4 shadow">
                    <div className="card-body text-center shadow">
                        <h3 className="card-title">Actions for Shop Owner:</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Manage shop details and products</li>
                            <li className="list-group-item">Add And Edit Your Products</li>
                            <li className="list-group-item">Track and fulfill orders</li>
                            <li className="list-group-item">View your all Orders</li>
                            {/* Add more actions specific to the shop owner role */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePageShopOwner