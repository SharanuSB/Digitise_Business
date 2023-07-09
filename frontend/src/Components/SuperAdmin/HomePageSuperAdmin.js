const HomePageSuperAdmin = (props) => {

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <h1 className="text-center mb-4">Welcome, Owner!</h1>
                <p className="text-center">
                    As the super admin, you have access to manage the entire application and its shops.
                </p>

                <div className="card mt-4">
                    <div className="card-body text-center">
                        <h3 className="card-title">Actions for Super Admin:</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">View and manage all shops</li>
                            <li className="list-group-item">Verify the New Shops</li>
                            <li className="list-group-item">Monitor and all the Orders</li>
                            <li className="list-group-item">Manage app settings and configurations</li>
                            {/* Add more actions specific to the super admin role */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomePageSuperAdmin