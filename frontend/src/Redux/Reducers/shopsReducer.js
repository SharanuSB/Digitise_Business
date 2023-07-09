import { ALL_SHOPS, CREATE_SHOP, SET_SHOP, VERIFY_SHOP } from "../Actions/shopsActions"


const shopsInitalState = {
    data:{},
    allShops:[]
}

const shopsReducer = (state = shopsInitalState, action)=>{
    switch(action.type){
        case SET_SHOP:{
            return {...state, data:action.payload}
        }
        case CREATE_SHOP:{
            return {...state, data:action.payload}
        }
        case ALL_SHOPS :{
            return {...state, allShops:action.payload}
        }
        case VERIFY_SHOP :{
            return {...state, allShops:state.allShops.filter(ele=>ele._id!==action.payload._id)}
        }

        default:{
            return {...state}
        }
    }
}

export default shopsReducer