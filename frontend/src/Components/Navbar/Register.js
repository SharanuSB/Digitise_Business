import { useState } from "react"
import validator from "validator"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const RegisterForm = (props) => {

    const { submitForm } = props

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassWord, setConfirmPassword] = useState("")
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const formValidations = () => {
        if (username.length === 0) {
            errors.username = "Username is Required"
        } else if (username.length < 3) {
            errors.username = "Username should have more than 3 letters"
        }

        if (email.length === 0) {
            errors.email = "Email is Required"
        } else if (!validator.isEmail(email)) {
            errors.email = "Invalid Email format"
        }

        if (phone.length === 0) {
            errors.phone = "Phone Number is Required"
        } else if (!validator.isNumeric(phone)) {
            errors.phone = "Phone should contain only numbers"
        }

        if (password.length === 0) {
            errors.password = "Password is Required"
        } else if (password.length < 7 || password.length > 16) {
            errors.password = "Password should be between 8 to 16 characters"
        }

        if (confirmPassWord !== password) {
            errors.confirm = "Passwords do not match"
        }
        setFormErrors(errors)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        formValidations()

        if (Object.keys(errors).length === 0) {
            const formData = {
                username, email, phone, password
            }
            submitForm(formData)
        }
    }

    return (
        <div className="d-flex justify-content-center ">
            <div className="card p-4 shadow my-4 col-md-4">
                <h1 className="d-flex justify-content-center badge bg-success text-wrap fs-5">Register</h1>
                <form onSubmit={formSubmit}>
                    <label htmlFor="name" className="form-label">Name <sup style={{ color: "red" }}>*</sup></label><br />
                    <input id="name" type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder="Enter your name"
                        className="form-control" />
                    {formErrors?.username && <><span style={{ color: "red" }}>{formErrors?.username}</span > <br /></>}

                    <label htmlFor="email">Email <sup style={{ color: "red" }}>*</sup></label><br />
                    <input id="email" type="text"
                        value={email} onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Enter your email"
                        className="form-control" />
                    {formErrors?.email && <><span style={{ color: "red" }}>{formErrors?.email}</span><br /></>}

                    <label htmlFor="phone">Phone <sup style={{ color: "red" }}>*</sup></label><br />
                    <input id="phone" type="text"
                        value={phone} onChange={(e) => { setPhone(e.target.value) }}
                        placeholder="Enter the Phone Number"
                        className="form-control" />
                    {formErrors?.phone && <><span style={{ color: "red" }}>{formErrors?.phone}</span><br /></>}

                    <label htmlFor="pass">Password <sup style={{ color: "red" }}>*</sup></label><br />
                    <input id="pass" type="password" 
                    value={password} onChange={(e) => { setPassword(e.target.value) }} 
                    placeholder="Enter the Password"
                    className="form-control" />
                    {formErrors?.password && <><span style={{ color: "red" }}>{formErrors?.password}</span><br /></>}

                    <label htmlFor="confirm">Confirm Password <sup style={{ color: "red" }}>*</sup></label><br />
                    <input id="confirm" type="password" 
                    value={confirmPassWord} onChange={(e) => { setConfirmPassword(e.target.value) }} 
                    placeholder="Confirm your Password"
                    className="form-control" /><br />
                    {formErrors?.confirm && <><span style={{ color: "red" }}>{formErrors?.confirm}</span><br /></>}

                    <input type="submit" className="btn btn-primary" /><span className="p-5">Already have a account <Link to="/login"> login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm