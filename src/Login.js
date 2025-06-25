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
        <div className="auth-bg">
            <div className="auth-container">
                <div className="auth-logo">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                        alt="Netflix" 
                        style={{ height: '45px' }}
                    />
                </div>
                <h1 className="auth-title">Sign In</h1>
                
                {error && <Alert variant="danger" style={{ marginBottom: '16px' }}>{error}</Alert>}
                
                <Form className="auth-form" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email or phone number"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="btn">
                        Sign In
                    </Button>

                    <div style={{ textAlign: 'center', margin: '16px 0' }}>
                        <span style={{ color: '#737373' }}>OR</span>
                    </div>

                    <GoogleButton
                        className="g-btn"
                        type="dark"
                        onClick={handleGoogleSignIn}
                        style={{ width: '100%', height: '48px', margin: '16px 0' }}
                    />

                    <div className="auth-footer">
                        <span>New to Netflix? </span>
                        <Link to="/signup">Sign up now</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;