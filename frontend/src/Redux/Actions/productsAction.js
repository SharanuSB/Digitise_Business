import Axios from "../../config/Axios"

export const SET_PRODUCTS = "SET_PRODUCTS"
export const ADD_PRODUCTS = "ADD_PRODUCTS"

const setProducts = (data)=>{
    return {
        type:SET_PRODUCTS,
        payload:data
    }
}

const addProducts = (data)=>{
    return {
        type:ADD_PRODUCTS,
        payload:data
    }
}


export const startGetProducts = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const products = await Axios.get(`/api/products/listAll/${id}`, {headers:{"Auth":localStorage.getItem("token")}})
                    dispatch(setProducts(products.data))
                } catch (error) {
                    alert(error.message)
                }
                
            }
        )()
    }
}

export const startAddProducts = (formData, id)=>{

    return (dispatch)=>{
        (
            async()=>{
                try {
                    const product = await Axios.post(`/api/products/create/${id}`, formData, {headers:{"Auth":localStorage.getItem("token")}})
                    console.log(product.data)
                    if(!product.data.errors){
                        dispatch(addProducts(product.data))
                        alert(`${product.data.name} added successfully`)
                    }else{
                        alert(product.data.errors.price?.message)
                    }
                } catch (error) {
                    alert(error.message)
                }
                
            }
        )()
    }
}