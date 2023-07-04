import { Link, Route } from "react-router-dom/cjs/react-router-dom.min"
import Home from "./Home"
import Login from "./Login"
import Account from "./Account"
import CustomerRegister from "../Users/CustomerRegister"
import OwnerRegister from "../Users/OwnerRegister"
import 'bootstrap/dist/css/bootstrap.min.css'


const Navbar = (props) => {
    return (
        <>
            <div className="d-flex felx-row gap-5 my-2 p-2">
                <li><Link to="/userRegister">User Register</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shopOwnerRegister">Owner Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/account">Account</Link></li>
            </div>

            <Route path="/" component={Home} exact={true} />
            <Route path="/userRegister" component={CustomerRegister} exact={true} />
            <Route path="/shopOwnerRegister" component={OwnerRegister} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/account" component={Account} exact={true} />
        </>
    )
}

export default Navbar