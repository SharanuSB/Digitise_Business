import Axios from "../../config/Axios"
import decode from "jwt-decode"
export const SET_ORDERS = "SET_ORDERS"

const setOrder = (data)=>{
    return {
        type:SET_ORDERS,
        payload:data
    }
}

const token = localStorage.getItem("token")
const tokenData = decode(token)

export const startPlaceOrder = (amount) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const { data: key } = await Axios.get("/api/getKey", { headers: { "Auth": token } })
                    const { data: {order} } = await Axios.post("/api/orders/create", { amount:amount }, { headers: { "Auth": token } })

                    const options = {
                        key,
                        amount: order.amount,
                        currency: "INR",
                        name: "Sharanu SB",
                        description: "Test Payments",
                        image: "http://avatars.githubusercontent.com/u/134317226?v=4",
                        order_id: order?.id,
                        callback_url: `http://localhost:3333/api/paymentVerification?customerId=${tokenData.id}&amount=${order.amount}`,
                        prefill: {
                            name: "SharanuSb",
                            email: "sharanusb12345@gmail.com",
                            contact: "8073576207"
                        },
                        notes: {
                            address: "Razorpay Corporate Office"
                        },
                        theme: {
                            color: "#3399cc"
                        },
                    }

                    const razor = await new window.Razorpay(options);
                    razor.open();

                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startSetCustomerOrder = ()=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const {data} = await Axios.get("/api/orders/list", {headers:{"Auth":token}})
                    if(data){
                        dispatch(setOrder(data))
                    }
                } catch (error) {
                    alert(error.message)
                }    
            }
        )() 
    }
}

export const startSetShopOrders = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const {data} = await Axios.get(`/api/orders/listByShop/${id}`, {headers:{"Auth":token}})
                    console.log(data)
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}
