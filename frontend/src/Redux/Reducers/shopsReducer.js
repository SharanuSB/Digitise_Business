import { CREATE_SHOP, SET_SHOP } from "../Actions/shopsActions"


const shopsInitalState = {
    data:{}
}

const shopsReducer = (state = shopsInitalState, action)=>{
    switch(action.type){
        case SET_SHOP:{
            return {...state, data:action.payload}
        }
        case CREATE_SHOP:{
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

export default shopsReducer