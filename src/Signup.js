import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "./UserAuthContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
        await signUp(email, password);
        navigate("/");
        } catch (err) {
        setError(err.message);
        }
    };

    return (
        <>
            <div style={{height:"80px"}}></div>
        <div className="p-4 box mt-3 text-center" style={{width:"300px", margin: "auto", background: "rgba(255, 255, 255, 0.6)"}}>
            <h2 className="mb-3">Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                Sign up
                </Button>
            </div>
            </Form>
        </div>
        <div className="p-4 box mt-3 text-center" style={{background: "rgba(0, 0, 0, 0.6)", color:"white", width:"300px", margin:"auto"}}>
            Already have an account? <Link to="/" style={{color:"white"}}>Log In</Link>
        </div>
        </>
    );
};

export default Signup;