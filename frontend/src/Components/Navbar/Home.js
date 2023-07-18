import decode from "jwt-decode"
import HomePageShopOwner from '../shopOwner/HomePageShopOwner';
import HomeCustomer from "../Customers/HomeCustomer";
import HomePageSuperAdmin from "../SuperAdmin/HomePageSuperAdmin";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
    const token = localStorage.getItem("token")

    let tokenData
    if (token) {
        tokenData = decode(token)
    }


    return (
        <div className="container">
            {
                tokenData?.role === "customer" && <HomeCustomer />
            }
            {
                tokenData?.role === "superAdmin" && <HomePageSuperAdmin />
            }
            {
                tokenData?.role === "shopOwner" && <HomePageShopOwner />
            }
            {
                !token &&
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-6 offset-md-3 text-center card shadow">
                            <h1 className="mb-4">Welcome to Our Online Store!</h1>
                            <p className="fs-5">You are not logged in. Please log in to explore our website.</p>
                            <div className="my-4">
                                <Link to="/login" className="btn btn-primary">Login</Link>
                            </div>
                            <p className="fs-5">New to our store?</p>
                            <div className="my-4">
                                <Link to="/userRegister" className="btn btn-success">Create an Account</Link>
                            </div>
                            <hr />
                            <div className="my-4">
                                <p className="fs-5">or</p>
                            </div>
                            <div className="my-4">
                                <Link to="/shopOwnerRegister" className="btn btn-secondary">Register as Shop Owner</Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default HomePage;
