import React from "react";
import "./Gallery.css";

function Gallery({ images = [] }) {
    return (
        <div className="gallery-container">
            {images.map((entry, index) => {
                const rotations = [-3, 2, -1, 3, -2, 1];
                const rotation = rotations[index % rotations.length];
                const style = { transform: `rotate(${rotation}deg)` };

                return (
                    <div 
                        className="polaroid-card" 
                        key={index}
                        style={style}
                    >
                        <img src={entry.src} alt={entry.name} />
                        <div className="polaroid-caption">
                            <h3>{entry.name}</h3>
                            <p>{entry.caption}</p>
                            {entry.link && <a href={entry.link}>Read More</a>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Gallery;