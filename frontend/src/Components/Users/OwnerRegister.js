import { startRegisterUserAccount } from "../../Redux/Actions/usersAction"
import RegisterForm from "../Navbar/Register"
import {useDispatch} from "react-redux"

const OwnerRegister = (props)=>{

    const dispatch = useDispatch()

    const submitForm = (formData)=>{
        const userData = {...formData, role:"shopOwner"}
        dispatch(startRegisterUserAccount(userData, props))
    }   

    return (
        <div>
            <h1>Register as Shop Owner</h1>
            <RegisterForm submitForm = {submitForm}/>
        </div>
    )
}

export default OwnerRegister
