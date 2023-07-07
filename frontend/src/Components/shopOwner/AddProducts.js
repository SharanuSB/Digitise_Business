import ProductForm from "./ProductForm"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { startAddCategory } from "../../Redux/Actions/categoriesAction"
import { startAddProducts } from "../../Redux/Actions/productsAction"


const AddProducts = (props) => {
    const [name, setName] = useState("")

    const { shop, toggle } = props

    const dispatch = useDispatch()

    const handleCategorySubmit = (e) => {
        e.preventDefault()
        const formData = { name }
        dispatch(startAddCategory(formData, shop._id))
        setName("")
    }

    const submitForm = (productData) => {
        dispatch(startAddProducts(productData, shop._id))
        toggle()
    }

    return (
        <div>
            <form onSubmit={handleCategorySubmit}>
                <div className="container my-2">
                    <div className="row">
                        <div className="col-md-8">
                            <input type="text" placeholder="Add Category.." className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="col-md-4 justify-content-start">
                            <input type="submit" value="add" className="btn btn-success" />
                        </div>
                    </div>
                </div>
            </form>
            <ProductForm submitForm={submitForm} shop={shop} />
        </div>
    )
}

export default AddProducts