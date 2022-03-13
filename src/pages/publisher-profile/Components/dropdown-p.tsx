import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DropDownPublisher() {
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="outline"
                className="d-flex align-items-start">
                <i className="fas fa-info-circle c-gray" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="attended-box">
                <h3 className="attended-title">Attended the events?</h3>
                <p className="attended-txt mb-1">
                    Attended one of the events? This publishers allows
                    collaborators (you) to upload your own photos and create a
                    uniqdue book or poster. Find out more on the link bellow.
                </p>
                <Link to="/" className="more-btn">
                    See More
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropDownPublisher;
