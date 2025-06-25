import React, { useState, useEffect, useRef } from 'react';
import './Nav.css';
import { useNavigate } from "react-router";
import { useUserAuth } from "./UserAuthContext";

function Nav() {

    const prevScrollY = useRef(0);
    const [goingUp, setGoingUp] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (prevScrollY.current < currentScrollY && !goingUp) {
            setGoingUp(true);
        }
        if (prevScrollY.current > currentScrollY && goingUp) {
            setGoingUp(false);
        }
        prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
    }, [goingUp]);

    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
    try {
        await logOut();
        navigate("/");
        } catch (error) {
        console.log(error.message);
        }
    };

    return (
        <div className={ `nav ${goingUp && 'nav_black'}` }>
            <img
                className="nav_avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Netflix Avatar"
            />
            <button className="logout"
                variant="primary"
                onClick={ handleLogout }>
                Log out
            </button>
        </div>
    );
}

export default Nav;

