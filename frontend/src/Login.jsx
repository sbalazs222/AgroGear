import { useState } from "react";

function Login(){
    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    async function HandleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(formData)

        })
        if(res.ok){
            alert("Sikeres bejelentkezés")
        }
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
            <input type="email" placeholder="email" name="email" onChange={HandleChange}/>
            <input type="password" placeholder="password" name="password" onChange={HandleChange}/>
            <button type="Submit">Bejelentkezés</button>
        </form>
        </>
    )
}

export default Login;