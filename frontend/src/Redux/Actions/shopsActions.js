import Axios from "../../config/Axios"
export const SET_SHOP = "SET_SHOP"
export const CREATE_SHOP = "CREATE_SHOP"
export const ALL_SHOPS = "ALL_SHOPS"
export const VERIFY_SHOP = "VERIFY_SHOP"
export const SEARCHED_SHOPS = "SEARCHED_SHOPS"

const setShop = (data) => {
    return {
        type: SET_SHOP,
        payload: data
    }
}

const setCreateShop = (data) => {
    return {
        type: CREATE_SHOP,
        payload: data
    }
}

const setAllShops = (data)=>{
    return {
        type:ALL_SHOPS,
        payload:data
    }
}

const verifiedShop = (data)=>{
    return {
        type:VERIFY_SHOP,
        payload:data
    }
}

const setSearchedShops = (data)=>{
    return {
        type:SEARCHED_SHOPS,
        payload:data
    }
}

export const startGetShopDetails = () => {

    return (dispatch) => {
        (
            async () => {
                try {
                    const shop = await Axios.get("/api/shops", {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    dispatch(setShop(shop.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startCreateShop = (formData) => {

    return (dispatch) => {
        (
            async () => {
                try {
                    const shop = await Axios.post("/api/shops", formData, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    dispatch(setCreateShop(shop.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startGetAllShops = ()=>{

    return (dispatch)=>{
        (
            async()=>{
                try {
                    const shops = await Axios.get("/api/shops/listAll", {headers:{
                        "Auth":localStorage.getItem("token")
                    }})
                    if(shops){
                        dispatch(setAllShops(shops.data))
                    }
                } catch (error) {
                    alert(error.message)
                }
               
            }
        )()
    }
}

export const startVerifyShop = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const shop = await Axios.put(`/api/verify/shop/${id}`, {}, {headers:{"Auth":localStorage.getItem("token")}})
                    if(!shop.data.error){
                        dispatch(verifiedShop(shop.data))
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startDeleteShop = (id)=>{
    return (dispatch)=>{
        (   
            async()=>{
                try {
                    const shop = await Axios.delete(`/api/shops/${id}`, {headers:{"Auth":localStorage.getItem("token")}})
                    if(!shop.data.error){
                        dispatch(verifiedShop(shop.data))
                    }else{
                       alert(shop.data.error)
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startSearchShops = (text)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    if(text!=="clearSearchedShops"){
                        const shops = await Axios.get(`/api/search/shops?text=${text}`, {headers:{"Auth":localStorage.getItem("token")}})
                        dispatch(setSearchedShops(shops.data))
                    }else{
                        dispatch(setSearchedShops([]))
                    }
                   
                } catch (error) {
                    alert(error.message)
                }
                
            }
        )()
    }
}
