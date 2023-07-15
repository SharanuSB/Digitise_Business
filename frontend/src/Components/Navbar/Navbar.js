import decode from "jwt-decode"
import { Link, Route, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import Login from "./Login"
import CustomerRegister from "./CustomerRegister"
import OwnerRegister from "./OwnerRegister"
import 'bootstrap/dist/css/bootstrap.min.css'
import Shop from "../shopOwner/shop"
import TotalShops from "../SuperAdmin/TotalShops"
import ListProducts from "../Customers/ListProducts"
import HomePage from "./Home"
import Cart from "../Customers/Shop"
import PrivateRoute from "../../config/PrivateRoute"
import ProtectedRoute from "../../config/ProtectedRoute"

const Navbar = (props) => {

    const token = localStorage.getItem("token")

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are u sure to logout")
        if (confirmLogout) {
            localStorage.removeItem("token")
            props.history.push("/")
        }
    }

    let tokenData
    if (token) {
        tokenData = decode(token)
    }

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-info bg-bs-secondary-bg">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Digitize Business
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {token ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    {tokenData.role === 'customer' && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/cart">
                                                    Cart
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {tokenData.role === 'shopOwner' && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/shop">
                                                    Shop
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/orders">
                                                    Orders
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {tokenData.role === 'superAdmin' && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/totalShops">
                                                Shops
                                            </Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/userRegister">
                                            User Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shopOwnerRegister">
                                            Owner Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>


            <Route path="/" component={HomePage} exact={true} />
            <Route path="/userRegister" component={CustomerRegister} exact={true} />
            <Route path="/shopOwnerRegister" component={OwnerRegister} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <PrivateRoute path="/:id/products" component={ListProducts} exact={true} />
            <PrivateRoute path="/cart" component={Cart} exact={true} />
            <ProtectedRoute path="/shop" role = {tokenData?.role} component={Shop} exact={true} />
            <ProtectedRoute path="/totalShops" role = {tokenData?.role} component={TotalShops} exact={true} />
            
        </>
    )
} 

export default withRouter(Navbar)