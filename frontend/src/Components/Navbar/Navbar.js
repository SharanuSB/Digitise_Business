import { Link, Route } from "react-router-dom/cjs/react-router-dom.min"
import Home from "./Home"
import Login from "./Login"
import Account from "./Account"
import CustomerRegister from "../Users/CustomerRegister"
import OwnerRegister from "../Users/OwnerRegister"


const Navbar = (props)=>{
    return (
        <div>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/userRegister">User Register</Link></li>
            <li><Link to="/shopOwnerRegister">Owner Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/account">Account</Link></li>

            <Route path="/" component = {Home} exact={true}/>
            <Route path="/userRegister" component = {CustomerRegister} exact={true}/>
            <Route path="/shopOwnerRegister" component = {OwnerRegister} exact={true}/>
            <Route path="/login" component = {Login} exact={true}/>
            <Route path="/account" component = {Account} exact={true}/>
        </div>
    )
}

export default Navbar