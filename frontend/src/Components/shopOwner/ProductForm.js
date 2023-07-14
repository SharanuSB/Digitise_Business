import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { startGetAllCategories } from "../../Redux/Actions/categoriesAction"


const ProductForm = (props) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [categoryId, setCategoryId] = useState("")

    const { submitForm, shop } = props

    const dispatch = useDispatch()

    const categories = useSelector((state) => {
        return state.categories.data
    })


    useEffect(() => {
        dispatch(startGetAllCategories(shop._id))
    }, [dispatch])


    const handleProductSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name, price, categoryId
        }
        submitForm(formData)
    }


    return (
        <div>
            <form onSubmit={handleProductSubmit}>

                <label htmlFor="name" className="form-label">Product Name <sup style={{ color: "red" }}>*</sup></label><br />
                <input type="text"
                    id="name" value={name}
                    className="form-control"
                    placeholder="Enter the Shop Name"
                    onChange={(e) => { setName(e.target.value) }}
                    required
                /><br />


                <label htmlFor="pass" className="form-label" >Price <sup style={{ color: "red" }}>*</sup></label><br />
                <input type="text"
                    className="form-control"
                    value={price} id="pass"
                    placeholder="Enter the Price"
                    onChange={(e) => { setPrice(e.target.value) }}
                    required
                /><br />

                <label htmlFor="category" className="form-label">Category</label><br />
                <select id="category" value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }} className="form-select">
                    <option value="">Select the Category</option>
                    {
                        categories &&
                        categories.map(ele => {
                            return <option value={ele._id} key={ele._id}>{ele.name}</option>
                        })
                    }
                </select><br />

                <input type="submit" className="btn btn-primary" />

            </form>
        </div>
    )
}

export default ProductForm