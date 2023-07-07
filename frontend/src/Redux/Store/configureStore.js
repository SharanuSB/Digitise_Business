import { applyMiddleware,combineReducers,createStore } from "redux"
import thunk from "redux-thunk"
import usersReducer from "../Reducers/usersReducer"
import shopsReducer from "../Reducers/shopsReducer"
import categoryReducer from "../Reducers/categoryReducer"
import productsReducer from "../Reducers/productsReducer"

const configureStore = ()=>{
    const store = createStore(combineReducers({
        users:usersReducer,
        shops:shopsReducer,
        categories:categoryReducer,
        products:productsReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore