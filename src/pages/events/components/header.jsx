import React from 'react';
import evetsPageHeaderImg from '../images/event-block-bg.png';

function Header() {
    return (
        <div
            className="event-block"
            style={{ backgroundImage: `url(${evetsPageHeaderImg})` }}>
            <span className="c-white fs40 f-myriadproreg">Events</span>
        </div>
    );
}
export default Header;
