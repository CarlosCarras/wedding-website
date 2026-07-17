import React, { useEffect } from "react";
import "./Lightbox.css";

function Lightbox({ imageSrc, imageAlt = "", title = "", caption = "", link = "", onClose, onPrev, onNext }) {
    // Close on escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft" && onPrev) {
                onPrev();
            } else if (e.key === "ArrowRight" && onNext) {
                onNext();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        // Prevent scrolling on body when lightbox is open
        document.body.style.overflow = "hidden";
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose, onPrev, onNext]);

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button 
                className="lightbox-close" 
                onClick={onClose}
                aria-label="Close lightbox"
            >
                &times;
            </button>

            {onPrev && (
                <button 
                    className="lightbox-nav-btn lightbox-prev" 
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    aria-label="Previous image"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
            )}

            <div className="lightbox-card">
                <img src={imageSrc} alt={imageAlt || title} />
                {(title || caption) && (
                    <div className="lightbox-caption">
                        {title && <h3>{title}</h3>}
                        {caption && <p>{caption}</p>}
                    </div>
                )}
            </div>

            {onNext && (
                <button 
                    className="lightbox-nav-btn lightbox-next" 
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    aria-label="Next image"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Lightbox;
