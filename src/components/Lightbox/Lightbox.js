import React, { useEffect } from "react";
import "./Lightbox.css";

function Lightbox({ imageSrc, imageAlt = "", title = "", caption = "", link = "", onClose }) {
    // Close on escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        // Prevent scrolling on body when lightbox is open
        document.body.style.overflow = "hidden";
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button 
                className="lightbox-close" 
                onClick={onClose}
                aria-label="Close lightbox"
            >
                &times;
            </button>
            <div className="lightbox-card">
                <img src={imageSrc} alt={imageAlt || title} />
                {(title || caption) && (
                    <div className="lightbox-caption">
                        {title && <h3>{title}</h3>}
                        {caption && <p>{caption}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Lightbox;
