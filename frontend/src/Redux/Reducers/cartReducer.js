import { SET_CART } from "../Actions/cartsAction"

const cartsInitalState = {
    data:[]
}

const cartReducer = (state = cartsInitalState, action)=>{
    switch(action.type){
        case SET_CART:{
            return {...state, data:action.payload}
        }

        default:{
            return {...state}
        }
    }
}

export default cartReducer