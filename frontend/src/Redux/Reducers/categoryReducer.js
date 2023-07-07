import { ADD_CATEGORY, SET_CATEGORIES } from "../Actions/categoriesAction"

const categoryInitialState = {
    data:[]
}

const categoryReducer = (state = categoryInitialState, action)=>{
    switch(action.type){
        case SET_CATEGORIES:{
            return {...state, data:action.payload}
        }
        case ADD_CATEGORY:{
            return {...state, data:[...state.data, action.payload]}
        }

        default:{
            return {...state}
        }
    }
}

export default categoryReducer