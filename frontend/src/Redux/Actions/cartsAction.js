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