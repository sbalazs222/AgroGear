import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login(){
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    async function HandleSubmit(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            credentials: "include",
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

        <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={HandleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={HandleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Bejelentkezés
                </Button>
            </Form>
        </>
    )
}

export default Login;