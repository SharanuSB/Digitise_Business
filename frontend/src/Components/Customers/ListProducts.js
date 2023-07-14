import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetCustomerProducts } from "../../Redux/Actions/productsAction"
import DisplayImages from "./DisplayImages"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import ViewProduct from "./ViewProduct"

const ListProducts = (props) => {

  const { id } = props.match.params

  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)
  const [viewProduct, setViewProduct] = useState({})

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
      <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}><span className="fs-2 fw-bold text-uppercase font-monospace">Add the Product to Cart ...</span></ModalHeader>
                <ModalBody>
                    <ViewProduct product = {viewProduct}/>
                </ModalBody>
            </Modal>
      <div className="row container my-2">
        {
          products.map(product => {
            return <div key={product._id} className="col-md-4 my-2">
              <div className="card p-2 shadow d-flex flex-column justify-content-between">
                <DisplayImages images={product.image} />
                <div>
                  <blockquote className="text-uppercase fs-3"><span className="fw-bold">Name</span> : {product.name}</blockquote>
                  <blockquote className="text-uppercase fs-3"><span className="fw-bold">Price</span> : {product.price}</blockquote>

                  <div className="d-grid">
                    <button className="btn btn-success" onClick = {()=>{handleView(product)}}>Add to Cart</button>
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