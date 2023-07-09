import { ALL_SHOPS, CREATE_SHOP, SEARCHED_SHOPS, SET_SHOP, VERIFY_SHOP } from "../Actions/shopsActions"


const shopsInitalState = {
    data:{},
    allShops:[],
    searchedShops:[]
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
        case SEARCHED_SHOPS:{
            return {...state, searchedShops:action.payload}
        }

        default:{
            return {...state}
        }
    }
}

export default shopsReducer