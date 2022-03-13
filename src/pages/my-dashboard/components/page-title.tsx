import React from 'react';
import { Container } from 'react-bootstrap';
import dashboardIcon from 'assets/images/dashboard-icon.png';

function PageTitle() {
    return (
        <Container fluid={true} className="wrapper1 p-title">
            <div className="page-name pt-4 pb-4">
                <div className="fs28 c-black d-flex align-items-center">
                    <img
                        src={dashboardIcon}
                        alt="dashboard Fanbook"
                        className="mr-2"
                    />
                    My Dashboard
                </div>
            </div>
        </Container>
    );
}

export default PageTitle;
