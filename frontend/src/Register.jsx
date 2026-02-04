import { useState } from "react";

function Register(){
    const [formData, setFormData] = useState({
        email:"",
        username:"",
        password:""
    })

    async function HandleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/register",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(formData)
        })
        if(res.ok){
            alert("Sikeres regisztráció")
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
        <h1>Regisztráció</h1>

        <form onSubmit={HandleSubmit}>
            <input type="email" placeholder="email" name="email" onChange={HandleChange}/>
            <input type="text" placeholder="username" name="username" onChange={HandleChange}/>
            <input type="password" placeholder="password" name="password" onChange={HandleChange}/>
            <button type="Submit">Regisztráció</button>
        </form>
        </>
    )
}

export default Register;