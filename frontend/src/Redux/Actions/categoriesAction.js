import Axios from "../../config/Axios"

export const SET_CATEGORIES = "SET_CATEGORIES"
export const ADD_CATEGORY = "ADD_CATEGORY"

const setCategories = (data) => {
    return {
        type: SET_CATEGORIES,
        payload: data
    }
}

const addCategories = (data) => {
    return {
        type: ADD_CATEGORY,
        payload: data
    }
}

export const startGetAllCategories = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const categories = await Axios.get(`/api/categories/listAll/${id}`, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    dispatch(setCategories(categories.data))
                } catch (error) {

                }

            }
        )()
    }
}

export const startAddCategory = (formData, id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const category = await Axios.post(`/api/categories/create/${id}`, formData, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    if (category.data?.errors) {
                        alert(category.data?.errors.name.message)
                    } else {
                        alert(`${category.data.name} category added successfully`)
                        dispatch(addCategories(category.data))
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}