import React, { useState } from "react";
import "./ExpandableArrow.css"


function ExpandableArrow(props) {
    const [isActive, setIsActive] = useState(props.initState)
    
    const handleClick = () => {
        setIsActive(!isActive);
        props.onClick();
    }

    return (
        <div className={`expandable-arrow-container ${isActive ? 'active' : ''}`} onClick={handleClick}>
            <div className="expandable-arrow-edge arrow-edge-left"/>
            <div className="expandable-arrow-edge arrow-edge-right"/>
        </div>
    )
}

export default ExpandableArrow;