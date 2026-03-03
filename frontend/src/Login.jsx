import { useState } from "react";
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST", headers: { "Content-Type": "application/json" },
                credentials: "include", body: JSON.stringify(formData)
            });
            if (res.ok) { setIsLoggedIn(true); navigate("/"); } 
            else { alert("Hibás adatok!"); }
        } catch (err) { alert("Hálózati hiba!"); }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <Card className="agro-card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-success">Üdv újra!</h2>
                  <p className="text-muted">Jelentkezzen be fiókjába</p>
                </div>
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold">Email cím</Form.Label>
                        <Form.Control type="email" placeholder="pelda@agrogear.hu" name="email" className="rounded-pill px-3"
                            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold">Jelszó</Form.Label>
                        <Form.Control type="password" placeholder="••••••••" name="password" className="rounded-pill px-3"
                            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100 rounded-pill py-2 fw-bold shadow-sm">
                        Bejelentkezés
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
export default Login;