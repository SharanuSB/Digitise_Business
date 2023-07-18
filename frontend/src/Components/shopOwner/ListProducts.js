import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDeleteProduct, startGetProducts } from "../../Redux/Actions/productsAction"
import AddProducts from "./AddProducts"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import DisplayImage from "./DisplayImage"
import Swal from "sweetalert2"
import EditProduct from "./EditProduct"


const ListProducts = (props) => {

    const { shop } = props

    const [editInfo, setEditInfo] = useState({})
    const [isEditToggle, setIsEditToggle] = useState(false)

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProducts(shop._id))
    }, [dispatch, shop._id])

    const products = useSelector((state) => {
        return state.products.data
    })

    const handleAdd = () =>{
        setIsEditToggle(false)
        toggle()
    } 

    const handleDelete = (product) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteProduct(product))
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleEdit = (editObj) => {
        setEditInfo(editObj)
        setIsEditToggle(true)
        toggle()
    }


    return (
        <div className="container">
            {isEditToggle ? (
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Products Here ...</ModalHeader>
                        <ModalBody>
                            <EditProduct shop={shop} handleEdit={handleEdit} editInfo={editInfo} />
                        </ModalBody>
                    </Modal>
                </div>
            ) : (
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Add Products Here</ModalHeader>
                        <ModalBody>
                            <AddProducts shop={shop} toggle={toggle} />
                        </ModalBody>
                    </Modal>
                </div>
            )}

            <button onClick={handleAdd} className="btn btn-secondary btn-sm p-1 my-1">Add Products</button>

            <div className="container row my-2">
                {
                    products?.map(product => {
                        return <div key={product._id} className="col-md-4 my-2">
                            <div className="card p-2 shadow">
                                <DisplayImage images={product.image} id={product._id} />
                                <div>
                                    <blockquote className="text-uppercase fs-3"><span className="fw-bold">Name</span> : {product.name}</blockquote>
                                    <blockquote className="text-uppercase fs-3"><span className="fw-bold">Price</span> : {product.price}</blockquote>
                                    <div className="p-2">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <button className="btn-sm btn btn-outline-warning" onClick={()=>{handleEdit(product)}}>Edit</button>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-sm btn-outline-danger" onClick={()=>{handleDelete(product)}}>Delete</button>
                                            </div>
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