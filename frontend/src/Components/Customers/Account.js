import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  startSetOrder } from "../../Redux/Actions/ordersAction"

const Account = (props)=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startSetOrder())
    },[])

    const orders = useSelector((state)=>{
        return state.orders.data
    })


    return (
        <div className="container"> 
            Orders - {orders.length}
        </div>
    )
}
export default Account