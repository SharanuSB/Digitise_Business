import Swal from "sweetalert2"
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
                        Swal.fire(
                            'Good job!',
                            'Successfully Registered the Account',
                            'success'
                          )
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
                        Swal.fire(`${user.data.error}`)
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                          })
                          
                          Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully'
                          })
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