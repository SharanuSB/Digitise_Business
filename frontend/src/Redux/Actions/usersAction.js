import axios from "../../config/Axios"

export const startRegisterUserAccount = (formData, props)=>{

    return ()=>{
        (
            async()=>{
                const user = await axios.post("/api/users/register", formData)
                if(user.data?.keyValue){
                    alert("Email or Phone is Already taken")
                }else{
                    console.log(user.data)
                    alert("Successfully registered account")
                    props.history.push("/account")
                }
            }
        )()
    }
}