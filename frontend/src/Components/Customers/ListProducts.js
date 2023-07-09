import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetCustomerProducts } from "../../Redux/Actions/productsAction"

const ListProducts = (props) => {

    const { id } = props.match.params

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetCustomerProducts(id))
    }, [dispatch, id])

    const products = useSelector((state) => {
        return state.products.customerData
    })

    return (
        <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-3">
              <div className="card mb-4" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title fs-3">{product.name}</h5>
                  <p className="card-text fs-5">Price: {product.price}</p>
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default ListProducts