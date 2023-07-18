import decode from "jwt-decode"
import Swal from "sweetalert2"
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
import Account from "../Customers/Account"
import Orders from "../shopOwner/Orders"
import NavItems from "./NavItems"

const Navbar = (props) => {

    const token = localStorage.getItem("token")

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You Want to Logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
          }).then((result) => {
            if (result.isConfirmed) {
            localStorage.removeItem("token")
            props.history.push("/")
              Swal.fire(
                'Logged Out!',
                '',
                'success'
              )
            }
          })
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
                        <NavItems tokenData={tokenData} handleLogout={handleLogout}/>
                    </div>
                </div>
            </nav>

            <Route path="/" component={HomePage} exact={true} />
            <Route path="/userRegister" component={CustomerRegister} exact={true} />
            <Route path="/shopOwnerRegister" component={OwnerRegister} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <PrivateRoute path="/:id/products" component={ListProducts} exact={true} />
            <PrivateRoute path="/cart" component={Cart} exact={true} />
            <PrivateRoute path="/account" component={Account} exact={true} />
            <PrivateRoute path="/orders" role = {tokenData?.role} component={Orders} exact={true} />
            <ProtectedRoute path="/shop" role = {tokenData?.role} component={Shop} exact={true} />
            <ProtectedRoute path="/totalShops" role = {tokenData?.role} component={TotalShops} exact={true} />
        </>
    )
} 

export default withRouter(Navbar)