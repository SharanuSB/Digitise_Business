import { SET_ORDERS } from "../Actions/ordersAction"

const ordersInitalState = {
    data:[],
    shopOrders:[]
}

const ordersReducer = (state=ordersInitalState, action)=>{
    switch(action.type){
        case SET_ORDERS:{
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default ordersReducer