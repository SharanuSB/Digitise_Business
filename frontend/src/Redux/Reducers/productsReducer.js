import { ADD_PRODUCTS, SET_PRODUCTS } from "../Actions/productsAction"


const productsInitalState = {
    data:[]
}

const productsReducer = (state = productsInitalState, action)=>{
    switch(action.type){
        case SET_PRODUCTS:{
            return {...state, data:action.payload}
        }
        case ADD_PRODUCTS:{
            return {...state, data:[...state.data, action.payload]}
        }
        default :{
            return {...state}
        }
    }
}

export default productsReducer