import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startSetCustomerCart } from "../../Redux/Actions/cartsAction"

const Cart = (props)=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startSetCustomerCart())
    },[])

    const cart = useSelector((state)=>{
        return state.carts.data
    })

    return (
        <div>
            {
                cart.length===0?
                <div>
                   <h1>There are no items in your cart</h1> 
                   <p>Add the Products</p>
                </div>:
                <div>
                    
                </div>
            }  
        </div>
    )
}

export default Cart