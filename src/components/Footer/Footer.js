import React from "react";
import "./Footer.css";


function Footer() {
    return (
        <div className="footer-container">
            <span> 
                Built from scratch by Carlos and Marilyn &nbsp;❤️&nbsp; Source code available on 
                <a href="https://github.com/CarlosCarras/CarlosCarras.github.io" target="_blank" rel="noopener noreferrer"> GitHub </a>
            </span>

            <span className="copyright-notice">
                <span> &copy;{new Date().getFullYear()} </span> 
                Carlos and Marilyn
            </span>
        </div>
    )
}

export default Footer;