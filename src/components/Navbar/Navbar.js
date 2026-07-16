import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const PINK_FLOWER = require("../../assets/icons/pink_flower.webp");

function Navbar({ sections = {} }) {
    const [activeSection, setActiveSection] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const hamburgerRef = useRef(null);

    // Update mobile status on resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll spy
    useEffect(() => {
        const handleScroll = () => {
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
        setIsDropdownOpen(false); // close dropdown after clicking
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
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
                    <img src={PINK_FLOWER} alt="flower" className="nav-flower-bullet" />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
            ))}
        </div>
    );

    return (
        <nav className="navbar">
            {isMobile ? (
                <div className="mobile-nav-container">
                    <button
                        className="hamburger-menu"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        ref={hamburgerRef}
                        aria-label="Toggle menu"
                    >
                        &#9776;
                    </button>
                    {isDropdownOpen && (
                        <div className="top-dropdown-menu" ref={dropdownRef}>
                            {Object.entries(sections).map(([key, hash]) => (
                                <button
                                    key={key}
                                    onClick={() => scrollToSection(hash)}
                                    className={activeSection === key ? "active" : ""}
                                >
                                    <img src={PINK_FLOWER} alt="flower" className="nav-flower-bullet" />
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                menu
            )}
        </nav>
    );
}

export default Navbar;
