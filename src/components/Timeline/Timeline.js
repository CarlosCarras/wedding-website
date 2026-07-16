import React, { useState, useEffect } from "react";
import Lightbox from "../Lightbox/Lightbox";
import "./Timeline.css";

const PINK_FLOWER = require("../../assets/icons/pink_flower.png");

function Timeline({ entries, images = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % entries.length);
        }, 2000); // automatic slide interval (2 seconds)

        return () => clearInterval(timer);
    }, [isAutoPlaying, entries.length]);

    return (
        <div className="timeline-stepper-container">
            {/* Stepper progress track */}
            <div className="stepper-track-wrapper">
                <div className="stepper-line-bg">
                    <div 
                        className="stepper-line-active" 
                        style={{ width: `${(activeIndex / (entries.length - 1)) * 100}%` }}
                    />
                </div>
                <div className="stepper-nodes-row">
                    {entries.map((item, index) => (
                        <button
                            key={index}
                            className={`stepper-node-btn ${activeIndex === index ? "active" : ""} ${index < activeIndex ? "completed" : ""}`}
                            onClick={() => {
                                setActiveIndex(index);
                                setIsAutoPlaying(false); // Pause auto-play when clicked
                            }}
                        >
                            <img src={PINK_FLOWER} alt="flower" className="stepper-flower-node" />
                            <span className="stepper-node-label">{item.title}</span>
                            <span className="stepper-node-year">{item.date.split(" ").slice(-1)[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stepper Card Display */}
            <div className="stepper-card-display" key={activeIndex}>
                {images[activeIndex] && (
                    <div className="stepper-card-image-wrapper">
                        <div 
                            className="stepper-polaroid"
                            onClick={() => {
                                setIsLightboxOpen(true);
                                setIsAutoPlaying(false); // Pause auto-play when polaroid clicked
                            }}
                        >
                            <img src={images[activeIndex]} alt={entries[activeIndex].title} />
                            <div className="stepper-polaroid-caption">{entries[activeIndex].date}</div>
                        </div>
                    </div>
                )}
                
                <div className="stepper-card-text">
                    <div className="stepper-card-date">{entries[activeIndex].date}</div>
                    <h3 className="stepper-card-title">{entries[activeIndex].title}</h3>
                    <p className="stepper-card-description">{entries[activeIndex].description}</p>
                    {entries[activeIndex].location && (
                        <div className="stepper-card-location">
                            <span className="location-pin">📍</span>
                            {entries[activeIndex].locationLink ? (
                                <a 
                                    href={entries[activeIndex].locationLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="location-link"
                                >
                                    {entries[activeIndex].location}
                                </a>
                            ) : (
                                <span>{entries[activeIndex].location}</span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {isLightboxOpen && (
                <Lightbox 
                    imageSrc={images[activeIndex]}
                    imageAlt={entries[activeIndex].title}
                    title={entries[activeIndex].title}
                    caption={entries[activeIndex].description}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </div>
    );
}

export default Timeline;