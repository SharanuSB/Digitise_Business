import { ADD_IMAGE, ADD_PRODUCTS, CUSTOMER_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from "../Actions/productsAction"


const productsInitalState = {
    data: [],
    customerData: []
}

const productsReducer = (state = productsInitalState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return { ...state, data: action.payload }
        }
        case ADD_PRODUCTS: {
            return { ...state, data: [...state.data, action.payload] }
        }
        case CUSTOMER_PRODUCTS: {
            return { ...state, customerData: action.payload }
        }
        case ADD_IMAGE: {
            return {
                ...state, data: state.data.map(ele => {
                    if (ele._id === action.payload._id) {
                        return { ...action.payload }
                    } else {
                        return { ...ele }
                    }
                })
            }
        }
        case DELETE_PRODUCT: {
            return { ...state, data: state.data.filter(ele => ele._id !== action.payload._id) }
        }
        case EDIT_PRODUCT: {
            return {
                ...state, data: [...state.data.map(ele => {
                    if (ele._id === action.payload._id) {
                        return { ...ele, ...action.payload }
                    } else {
                        return { ...ele }
                    }
                })]
            }
        }

        default: {
            return { ...state }
        }
    }
}

export default productsReducer