import {Route, Redirect} from "react-router-dom"

const ProtectedRoute = ({component:Component, ...rest})=>{
    const {path, role} = rest
    return (
        <Route
            {...rest}
            render = {(props)=>{
                if(path==="/totalShops"){
                    return (
                        localStorage.getItem("token") && role.includes("superAdmin")?
                        (
                            <Component {...props}/>
                        ):
                        (
                            <Redirect
                                to = {{pathname:"/"}}
                            />
                        )
                    )
                }else if (path==="/shop"){
                    return (
                        localStorage.getItem("token")&&role.includes("shopOwner")?
                        (
                            <Component {...props}/>
                        ):  
                        (
                            <Redirect
                                to = {{pathname:"/"}}
                            />
                        )
                    )
                }
            }}
        />
    )

}

export default ProtectedRoute