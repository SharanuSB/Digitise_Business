import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startGetCustomerProducts } from "../../Redux/Actions/productsAction"
import DisplayImages from "./DisplayImages"

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
      <div className="row container my-2">
        {
          products.map(product => {
            return <div key={product._id} className="col-md-4 my-2">
              <div className="card p-2 shadow">
                <DisplayImages images={product.image} />
                <div>
                  <blockquote className="text-uppercase fs-3"><span className="fw-bold">Name</span> : {product.name}</blockquote>
                  <blockquote className="text-uppercase fs-3"><span className="fw-bold">Price</span> : {product.price}</blockquote>
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