import React from 'react';
import './NotFound.css';

import Button from '../../components/Button/Button';


function NotFound() {
    return(
        <div className="not-found-container">
            <h1 className="not-found-title">Oops!</h1>
            <div className='not-found-caption'>
                It appears that the page you are looking for is not available.
            </div>
            <Button name="Go Home" href="/"/>
        </div>
    )
}

export default NotFound;
