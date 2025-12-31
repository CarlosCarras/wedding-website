import React from "react";
import "./Timeline.css";


function Timeline({ entries }) {
    return (
        <div className="timeline-container">
            <div className="timeline-line"></div>

            {entries.map((item, index) => (
                <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                    <div className="timeline-content">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <p>📌 {
                            item.locationLink ? 
                                <a href={item.locationLink} target="_blank" rel="noreferrer">{item.location}</a> 
                                :
                                item.location 
                        } </p>
                        <div className="timeline-dot"></div>
                    </div>
                    
                    <div className="timeline-date">
                        {item.date}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Timeline;