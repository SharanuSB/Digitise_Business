import Axios from "../../config/Axios"

export const SET_CART = "SET_CART"


const setCart = (data)=>{
    return {
        type:SET_CART,
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