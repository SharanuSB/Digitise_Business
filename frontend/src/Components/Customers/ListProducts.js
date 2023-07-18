import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetCustomerProducts } from "../../Redux/Actions/productsAction";
import DisplayImages from "./DisplayImages";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ViewProduct from "./ViewProduct";

const ListProducts = (props) => {
  const { id } = props.match.params;

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [viewProduct, setViewProduct] = useState({});

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(startGetCustomerProducts(id));
  }, [dispatch, id]);

  const products = useSelector((state) => {
    return state.products.customerData;
  });

  const handleView = (product) => {
    setViewProduct(product);
    toggle();
  };

  return (
    <div className="container">
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <span className="fs-2 fw-bold text-uppercase font-monospace">
            Add the Product to Cart ...
          </span>
        </ModalHeader>
        <ModalBody>
          <ViewProduct product={viewProduct} />
        </ModalBody>
      </Modal>
      <div className="row my-4">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 my-2">
            <div className="card h-100 shadow">
              <DisplayImages images={product.image} />
              <div className="card-body">
                <h5 className="card-title text-uppercase fs-6 fw-bold">
                  {product.name}
                </h5>
                <p className="card-text fs-6">
                  <span className="fw-bold">Price:</span> {product.price}
                </p>
                <p className="card-text fs-6">
                  <span className="fw-bold">Availability:</span>{" "}
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <div className="card-footer d-grid gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    handleView(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
