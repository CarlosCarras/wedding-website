import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Navbar.css";

function Navbar({ sections = {} }) {
    const [backgroundActive, setBackgroundActive] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const location = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);
    const hamburgerRef = useRef(null);

    // Update mobile status on resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll spy + background
    useEffect(() => {
        const handleScroll = () => {
            setBackgroundActive(window.scrollY >= 40);

            if (location.pathname !== "/") return;

            let current = "";
            Object.entries(sections).forEach(([key, hash]) => {
                const el = document.querySelector(hash);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top <= 100) current = key;
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections, location.pathname]);

    const scrollToSection = (hash) => {
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        } else {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsSidebarOpen(false); // close sidebar after clicking
    };

    // Close sidebar if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target))
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menu = (
        <div className="menu">
            {Object.entries(sections).map(([key, hash]) => (
                <button
                    key={key}
                    onClick={() => scrollToSection(hash)}
                    className={activeSection === key ? "active" : ""}
                >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
            ))}
        </div>
    );

    return (
        <nav className={`navbar ${backgroundActive ? "bg-active" : ""}`}>
            {isMobile ? (
                <>
                    <div
                        className="hamburger-menu"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        ref={hamburgerRef}
                    >
                        &#9776;
                    </div>
                    <Sidebar ref={sidebarRef} active={isSidebarOpen} menu={menu} />
                </>
            ) : (
                menu
            )}
        </nav>
    );
}

export default Navbar;
