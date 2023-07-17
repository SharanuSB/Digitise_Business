import { useDispatch } from "react-redux"
import ProductForm from "./ProductForm"
import { startEditProduct } from "../../Redux/Actions/productsAction"

const EditProduct = (props)=>{
    const {shop, handleEdit, editInfo} = props

    const dispatch = useDispatch()

    const submitForm = (formData)=>{
        handleEdit()
        dispatch(startEditProduct(formData, editInfo, shop))
    }

    return (
        <div>
            <ProductForm {...editInfo} submitForm={submitForm} shop={shop}/>
        </div>
    )
}

export default EditProduct