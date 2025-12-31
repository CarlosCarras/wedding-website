import React from "react";
import "./Gallery.css";

function Gallery({ images = [] }) {
    return (
        <div className="gallery-container">
            {images.map((entry, index) => (
                <div className="box" key={index}>
                    <img src={entry.src} alt={entry.name} />
                    <div className="description">
                        <h3>{entry.name}</h3>
                        <p>{entry.caption}</p>
                        <a href={entry.link}>{entry.link ? "Read More" : ""}</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Gallery;