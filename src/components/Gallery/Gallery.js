import React, { useState } from "react";
import Lightbox from "../Lightbox/Lightbox";
import "./Gallery.css";

function Gallery({ images = [] }) {
    const [selectedImage, setSelectedImage] = useState(null);

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
                        onClick={() => setSelectedImage(entry)}
                    >
                        <img src={entry.src} alt={entry.name} />
                        <div className="polaroid-caption">
                            <h3>{entry.name}</h3>
                            <p>{entry.caption}</p>
                        </div>
                    </div>
                );
            })}

            {selectedImage && (
                <Lightbox 
                    imageSrc={selectedImage.src}
                    imageAlt={selectedImage.name}
                    title={selectedImage.name}
                    caption={selectedImage.caption}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}

export default Gallery;