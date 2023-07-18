import React from "react"
import { useDispatch } from "react-redux"
import { startAddCartProducts } from "../../Redux/Actions/cartsAction"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom"

const ViewProduct = (props) => {
  const dispatch = useDispatch()
  const { product } = props;
  const { _id, name, price, shopId, reviews, isAvailable, image } = product

  const handleAddToCart = (id) => {
    dispatch(startAddCartProducts(id, shopId))
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product Added to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
    props.history.push("/cart")
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <Carousel showThumbs={false}>
            {image.map((ele, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:3333/${ele}`}
                width="400"
                height="400"
                alt={name}
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            ))}
          </Carousel>
        </div>
        <div className="col-md-6">
          <div className="card p-4">
            <h3 className="fw-bold mb-4">{name}</h3>
            <div className="mb-3">
              <span className="font-monospace fs-4">Price:</span>{" "}
              <span className="fs-5">Rs. {price}</span>
            </div>
            <div className="mb-3">
              <span className="font-monospace fs-4">In Stock:</span>{" "}
              {isAvailable ? <span className="fs-5 text-success">Yes</span> : <span className="fs-5 text-danger">No</span>}
            </div>
            {reviews.length === 0 ? (
              <div className="mb-3">There are no reviews for this product yet..</div>
            ) : (
              <div>
                <h5 className="fw-bold mb-3">Reviews:</h5>
                {reviews.map((review, index) => (
                  <div key={index} className="mb-2">
                    {/* <strong>{review.user}</strong>: {review.comment} */}
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => handleAddToCart(_id)} className="btn btn-success mt-3">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ViewProduct)
