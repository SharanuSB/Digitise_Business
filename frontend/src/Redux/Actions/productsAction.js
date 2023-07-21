import Axios from "../../config/Axios"
import Swal from "sweetalert2"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const ADD_PRODUCTS = "ADD_PRODUCTS"
export const CUSTOMER_PRODUCTS = "CUSTOMER_PRODUCTS"
export const ADD_IMAGE = "ADD_IMAGE"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const EDIT_PRODUCT = 'EDIT_PRODUCT'


const setProducts = (data) => {
    return {
        type: SET_PRODUCTS,
        payload: data
    }
}

const addProducts = (data) => {
    return {
        type: ADD_PRODUCTS,
        payload: data
    }
}

const customerProducts = (data) => {
    return {
        type: CUSTOMER_PRODUCTS,
        payload: data
    }
}

const setImage = (data) => {
    return {
        type: ADD_IMAGE,
        payload: data
    }
}

const deleteProduct = (data) => {
    return {
        type: DELETE_PRODUCT,
        payload: data
    }
}

const editProduct = (data) => {
    return {
        type: EDIT_PRODUCT,
        payload: data
    }
}


export const startGetProducts = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const products = await Axios.get(`/api/products/listAll/${id}`, { headers: { "Auth": localStorage.getItem("token") } })
                    dispatch(setProducts(products.data))
                } catch (error) {
                    alert(error.message)
                }

            }
        )()
    }
}

export const startAddProducts = (formData, id) => {

    return (dispatch) => {
        (
            async () => {
                try {
                    const product = await Axios.post(`/api/products/create/${id}?categoryId=${formData.categoryId}`, formData, { headers: { "Auth": localStorage.getItem("token") } })
                    if (!product.data.errors) {
                        dispatch(addProducts(product.data))
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product is Created',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    } else {
                        alert(product.data.errors.price?.message)
                    }
                } catch (error) {
                    alert(error.message)
                }

            }
        )()
    }
}

export const startGetCustomerProducts = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const products = await Axios.get(`/api/products/listAll/${id}`, { headers: { "Auth": localStorage.getItem("token") } })
                    dispatch(customerProducts(products.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startAddProductImage = (id, formData) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const product = await Axios.post(`/api/products/addImage/${id}`, formData, { headers: { "Auth": localStorage.getItem("token") } })
                    console.log(product.data, "hi")
                    dispatch(setImage(product.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startDeleteProduct = (product) => {
    return async (dispatch) => {
        try {
            const products = await Axios.delete(`/api/products/destroy/${product.shopId}?id=${product._id}`, {
                headers: {
                    "Auth": localStorage.getItem("token")
                },
            })
            dispatch(deleteProduct(products.data))
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })

        }
    }
}

export const startEditProduct = (formData, editObj, shop) => {
    return async (dispatch) => {
        try {
            const updatedProduct = await Axios.put(`/api/products/update/${shop._id}?id=${editObj._id}`, formData, {
                headers: {
                    "Auth": localStorage.getItem("token")
                }
            })
            dispatch(editProduct(updatedProduct.data))
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
          
        }
    }
}