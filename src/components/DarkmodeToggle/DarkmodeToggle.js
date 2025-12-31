import React, {useState} from "react";
import "./DarkmodeToggle.css";

const SUN = require('./../../assets/icons/sun.png'),
      MOON = require('./../../assets/icons/moon.png');

function DarkmodeToggle(props) {
    const [isActive, setActive] = useState(props.darkmode);

    const toggleActive = () => {
        setActive(!isActive);
        props.toggleDarkMode();
    }

    return (
        <div className={`dm-toggle-container ${isActive ? 'active' : ''}`} onClick={toggleActive}>
            <div className="slider"/>
            <img className="sun" src={SUN} alt='sun icon'/>
            <img className="moon" src={MOON} alt='moon icon'/>
        </div>
    )
}

export default DarkmodeToggle