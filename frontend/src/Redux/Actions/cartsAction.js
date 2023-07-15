import Axios from "../../config/Axios"

export const SET_CART = "SET_CART"
export const ADD_PRODUCTS_CART = "ADD_PRODUCTS_CART"


const setCart = (data)=>{
    return {
        type:SET_CART,
        payload:data
    }
}

const addProductsToCart = (data)=>{
    return {
        type:ADD_PRODUCTS_CART,
        payload:data
    }
}


export const startSetCustomerCart = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const cart = await Axios.get("/api/carts", {headers:{'Auth':localStorage.getItem("token")}})
                    dispatch(setCart(cart.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startAddCartProducts = (id, shopId)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const cart = await Axios.post(`/api/carts/addProducts/${id}?shopId=${shopId}`, {}, 
                    {headers:{"Auth":localStorage.getItem("token")}})
                    dispatch(addProductsToCart(cart.data))
                } catch (error) {
                    alert(error.message)
                }
                
            }
        )()
    }
}

export const startDecProductQuantity = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const product = await Axios.put(`/api/carts/decQuantity/${id}`, {}, {headers:{"Auth":localStorage.getItem("token")}})
                    dispatch(setCart(product.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startIncProductQuantity = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const product = await Axios.post(`/api/carts/addProducts/${id}`, {}, {headers:{"Auth":localStorage.getItem("token")}})
                    dispatch(setCart(product.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startRemoveProductFromCart = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const product = await Axios.put(`/api/carts/removeProducts/${id}`, {}, {headers:{"Auth":localStorage.getItem("token")}})
                    console.log(product.data)
                } catch (error) {
                    alert(error.message)
                }   
               
            }
        )()
    }
}