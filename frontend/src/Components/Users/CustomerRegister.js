import { startRegisterUserAccount } from "../../Redux/Actions/usersAction"
import RegisterForm from "../Navbar/Register"
import { useDispatch } from "react-redux"

const CustomerRegister = (props)=>{

    const dispatch = useDispatch()

    const submitForm = (formData)=>{
        dispatch(startRegisterUserAccount(formData,props))
    }

    return (
        <div>
            <h1>Register as Customer</h1>
            <RegisterForm submitForm = {submitForm}/>
        </div>
    )
}

export default CustomerRegister