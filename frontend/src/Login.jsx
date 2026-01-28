import { useState } from "react";

function Login(){
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    async function HandleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http:localhost:3000/register",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(formData)
        })
    }

    function HandleChange(e){
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <>
        <h1>Bejelentkezés</h1>

        <form onSubmit={HandleSubmit}>
            <input type="text" placeholder="username" name="username" onChange={HandleChange}/>
            <input type="password" placeholder="password" name="password" onChange={HandleChange}/>
            <button type="Submit">Bejelentkezés</button>
        </form>
        </>
    )
}

export default Login;