const Login = ()=>{
    

    return (
        <div>
            <form>
                <h1>Login to your account</h1>
                <label htmlFor="email">Email</label><br/>
                <input id="email"/><br/>
                <label htmlFor="pass">Password</label><br/>
                <input id="pass"/><br/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login