import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startAddProductImage, startGetProducts } from "../../Redux/Actions/productsAction"
import AddProducts from "./AddProducts"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'


const ListProducts = (props) => {

    const { shop } = props

    const [modal, setModal] = useState(false)

    const [photo, setPhoto] = useState("")

    const toggle = () => setModal(!modal)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProducts(shop._id))
    }, [dispatch, shop._id])

    const products = useSelector((state) => {
        return state.products.data
    })

    const handleAdd = () => toggle()

    const handleAddImage = async (e, id) => {
        setPhoto(e.target.files[0]);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        dispatch(startAddProductImage(id, formData))
      }

    return (
        <div className="container">
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Products Here ....</ModalHeader>
                <ModalBody>
                    <AddProducts shop={shop} toggle={toggle} />
                </ModalBody>
            </Modal>
            <button onClick={handleAdd} className="btn btn-secondary btn-sm p-1 my-1">Add Products</button>

            <div className="container row my-2">
                {
                    products?.map(product => {
                        return <div key={product._id} className="col-md-3 my-2">
                            <div className="card p-2 shadow">
                                {
                                    product.image ? <img src={`${product?.image}`} alt={product.name} /> : 
                                    <input type="file" 
                                    accept=".png" 
                                    className="form-control"    
                                    onChange={(e)=>handleAddImage(e, product._id)}
                                    />
                                }
                                <blockquote className="text-uppercase fs-3"><span className="fw-bold">Name</span> : {product.name}</blockquote>
                                <blockquote className="text-uppercase fs-3"><span className="fw-bold">Price</span> : {product.price}</blockquote>
                                <div className="p-2">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <button className="btn-sm btn btn-outline-warning">Edit</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default ListProducts