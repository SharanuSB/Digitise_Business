import { useState } from "react"
import { useDispatch } from "react-redux"
import validator from "validator"
import { startCreateShop } from "../../Redux/Actions/shopsActions"

const ShopForm = () => {
    const [name, setName] = useState("")
    const [address, setAdress] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [formErrors, setFormErrors] = useState({})

    const errors = {}

    const dispatch = useDispatch()

    const formValidations = () => {
        if(name.length<3){
            errors.name = "Enter a Valid Shop Name"
        }
        if(address.length<3){
            errors.address = "Enter a Valid Address"
        }
        if(!validator.isNumeric(contactNumber)){
            errors.number = "Contact Number should only contain Numbers"
        }else if(!contactNumber===10){
            errors.number = "Contact Number should contain 10 Numbers"
        }
        setFormErrors(errors)
    }

    const handleShopSubmit = (e) => {
        e.preventDefault()
        formValidations()

        if(Object.keys(formErrors).length===0){
            const formData = {
                name, address, contactNumber
            }
            dispatch(startCreateShop(formData))
        }
    }

    return (
        <div>
            <div className=" p-4 shadow my-4">
                <h3 className="d-flex justify-content-center badge bg-success text-wrap fs-5">Create your Shop</h3>
                <form onSubmit={handleShopSubmit}>

                    <label htmlFor="name" className="form-label">Shop Name <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="text"
                        id="name" value={name}
                        className="form-control"
                        placeholder="Enter the Shop Name"
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    /><br />

                    <label htmlFor="pass" className="form-label" >Address <sup style={{ color: "red" }}>*</sup></label><br />
                    <textarea type="text"
                        className="form-control"
                        value={address} id="pass"
                        placeholder="Enter your address"
                        onChange={(e) => { setAdress(e.target.value) }}
                        required
                    /><br />

                    <label htmlFor="contact" className="form-label">Phone Number<sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="text"
                        id="contact" value={contactNumber}
                        className="form-control"
                        placeholder="Enter the Contact Number"
                        onChange={(e) => { setContactNumber(e.target.value) }}
                        required
                    /><br />

                    <input type="submit" className="btn btn-primary" />

                </form>
            </div>
        </div>
    )
}

export default ShopForm