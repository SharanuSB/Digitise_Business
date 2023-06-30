import { applyMiddleware,combineReducers,createStore } from "redux"
import thunk from "redux-thunk"
import usersReducer from "../Reducers/usersReducer"

const configureStore = ()=>{
    const store = createStore(combineReducers({
        users:usersReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore