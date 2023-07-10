import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetCustomerProducts } from "../../Redux/Actions/productsAction"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import ViewProduct from "./ViewProduct"

const ListProducts = (props) => {

    const [viewProduct, setViewProduct] = useState({})

    const {id} = props.match.params

    const dispatch = useDispatch()

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    useEffect(() => {
        dispatch(startGetCustomerProducts(id))
    }, [dispatch, id])

    const products = useSelector((state) => {
        return state.products.customerData
    })

    const handleView = (product)=>{
        setViewProduct(product)
        toggle()
    }

    return (
        <div className="container">
           <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add this Product to your Cart ....</ModalHeader>
                <ModalBody>
                   <ViewProduct product = {viewProduct}/>
                </ModalBody>
            </Modal>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-3">
              <div className="card mb-4" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title fs-3">{product.name}</h5>
                  <p className="card-text fs-5">Price: {product.price}</p>
                  <button className="btn btn-primary" onClick={()=>handleView(product)}>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default ListProducts