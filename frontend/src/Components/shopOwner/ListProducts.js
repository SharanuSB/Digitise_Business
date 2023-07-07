import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetProducts } from "../../Redux/Actions/productsAction"
import AddProducts from "./AddProducts"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

const ListProducts = (props) => {

    const { shop } = props

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProducts(shop._id))
    }, [])


    const products = useSelector((state) => {
        return state.products.data
    })
    console.log(products)

    const handleAdd = () => {
        toggle()
    }
    console.log(modal, "toggle")


    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Products Here ....</ModalHeader>
                <ModalBody>
                    <AddProducts shop={shop} toggle = {toggle}/>
                </ModalBody>
            </Modal>
            <button onClick={handleAdd} className="btn btn-success p-2 my-2">Add Products</button>

            <div className="container row">
                {
                    products.map(product => {
                        return <div key={product._id} className="col-md-3">
                            <div className="card">
                                <blockquote>Name - {product.name}</blockquote>
                                <blockquote>Price - {product.price}</blockquote>
                                <div className="gap-2">
                                    <button>Edit</button>
                                    <button>Delete</button>
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