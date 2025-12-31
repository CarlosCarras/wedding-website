import React, { forwardRef } from 'react';
import './Sidebar.css';

const Sidebar = forwardRef(({ active, menu }, ref) => {
    return (
        <div ref={ref} className={`sidebar ${active ? 'active' : ''}`}>
            {menu}
        </div>
    );
});

export default Sidebar;