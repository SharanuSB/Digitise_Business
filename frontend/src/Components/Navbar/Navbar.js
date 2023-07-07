import decode from "jwt-decode"
import { Link, Route, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import Home from "./Home"
import Login from "./Login"
import Account from "./Account"
import CustomerRegister from "./CustomerRegister"
import OwnerRegister from "./OwnerRegister"
import 'bootstrap/dist/css/bootstrap.min.css'
import Shop from "../shopOwner/shop"

const Navbar = (props) => {

    const token = localStorage.getItem("token")

    const handleLogout = ()=>{
        const confirmLogout = window.confirm("Are u sure to logout")
        if(confirmLogout){
            localStorage.removeItem("token")
            props.history.push("/")
        } 
    }

    let tokenData
    if(token){
        tokenData = decode(token)
    }

    return (
        <>
            <div className="d-flex felx-row gap-5 my-2 p-2">
                {token ?
                    <div className="d-flex felx-row gap-5 my-2 p-2" >
                        <li><Link to="/">Home</Link></li>
                        {
                            tokenData.role==="customer"&&<><li><Link to="/account">Account</Link></li></>
                        }
                        {
                            tokenData.role==="shopOwner"&&<><li><Link to = "/shop">Shop</Link></li></>
                        }
                        <li><Link to = "/logout" onClick = {handleLogout}> Logout </Link></li>
                    </div> :
                    <div className="d-flex felx-row gap-5 my-2 p-2">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/userRegister">User Register</Link></li>
                        <li><Link to="/shopOwnerRegister">Owner Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </div>}
            </div>

            <Route path="/" component={Home} exact={true} />
            <Route path="/userRegister" component={CustomerRegister} exact={true} />
            <Route path="/shopOwnerRegister" component={OwnerRegister} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/account" component={Account} exact={true} />
            <Route path = "/shop" component = {Shop} exact = {true}/>
        </>
    )
}

export default withRouter(Navbar)