import Axios from "../../config/Axios"
export const SET_SHOP = "SET_SHOP"
export const CREATE_SHOP = "CREATE_SHOP"

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