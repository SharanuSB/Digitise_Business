import axios from "../../config/Axios"

export const startRegisterUserAccount = (formData, props) => {

    return () => {
        (
            async () => {
                try {
                    const user = await axios.post("/api/users/register", formData)
                    if (user.data?.keyValue) {
                        alert("Email or Phone is Already taken")
                    } else {
                        alert("Successfully registered account")
                        props.history.push("/login")
                    }
                } catch (error) {
                    alert(error.message)
                }

            }
        )()
    }
}

export const startLoginUser = (formData, props) => {
    return () => {
        (
            async () => {
                try {
                    const user = await axios.post("/api/users/login", formData)
                    if (user.data?.error) {
                        alert(user.data.error)
                    } else {
                        alert("Successfully Logged in")
                        localStorage.setItem("token", user.data.token)
                        props.history.push("/")
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}