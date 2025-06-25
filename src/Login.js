import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        try {
            await googleSignIn();
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="auth-box">
            <h2 className="mb-4 text-center">Sign In</h2>
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
                        Sign In
                    </Button>
                </div>

                <div className="text-center mb-3">
                    <p className="text-muted">OR</p>
                </div>


                <div className="d-grid gap-2 mb-4">
                    <GoogleButton
                        className="g-btn mx-auto"
                        type="dark"
                        onClick={handleGoogleSignIn}
                    />
                </div>
            </Form>

            <div className="text-center">
                <p className="text-muted mb-2">Don't have an account?</p>
                <Link to="/signup" className="text-white text-decoration-none">
                    <Button variant="outline-light" size="sm">
                        Sign Up Now
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Login;