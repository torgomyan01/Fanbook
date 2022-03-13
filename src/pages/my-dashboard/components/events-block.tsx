import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardInfo from './dashboard-info';
import YourEvent from './your-event';
import YourFolder from './your-folders';

function EventsBlock() {
    return (
        <Row>
            <Col sm={12}>
                <div className="report-box-height">
                    <DashboardInfo />
                    <YourEvent />
                    <YourFolder />
                </div>
            </Col>
        </Row>
    );
}

export default EventsBlock;
