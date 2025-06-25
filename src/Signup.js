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
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-box">
            <h2 className="mb-4 text-center">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-dark text-white"
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-dark text-white"
                    />
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                    <Button variant="danger" type="submit" size="lg">
                        Sign Up
                    </Button>
                </div>
            </Form>
            <div className="text-center">
                <p className="text-muted mb-2">Already have an account?</p>
                <Link to="/" className="text-white text-decoration-none">
                    <Button variant="outline-light" size="sm">
                        Sign In Now
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Signup;