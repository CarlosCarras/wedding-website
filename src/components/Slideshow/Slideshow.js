import React, {useState} from "react";
import "./Slideshow.css"

const ARROW = require('./../../assets/icons/arrow.png');

function Slideshow(props) {
    const [imageIndex, setImageIndex] = useState(0);

    const handleLeftClick = () => {
        setImageIndex((imageIndex - 1 + props.data.length) % props.data.length);
    }

    const handleRightClick = () => {
        setImageIndex((imageIndex + 1) % props.data.length);
    }

    const handleSelectorClick = (index) => {
        setImageIndex(index);
    };

    return (
        <div className="slideshow-container">
            <div className="img-container">
                <img src={props.data[imageIndex].src} alt={props.data[imageIndex].alt}/>
                <img className="arrow left-arrow" src={ARROW} alt="left arrow" onClick={handleLeftClick}/>
                <img className="arrow right-arrow" src={ARROW} alt="right arrow" onClick={handleRightClick}/>
            </div>
            <div className="image-selectors">
                {
                    props.data.map((data, i) => (
                        <div className={`selector ${i === imageIndex ? "active" : ""}`} 
                             key={i}
                             onClick={() => handleSelectorClick(i)}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Slideshow;