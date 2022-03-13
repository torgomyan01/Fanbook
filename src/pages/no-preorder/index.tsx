import React, { Component } from 'react';
import 'assets/css/no-preorder.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import ExpoloreSection from './components/explore-section';
import SelectEventSection from './components/select-event-section';
import SelectionSection from 'pages/no-preorder/components/selection-section';

class NoPreOrder extends Component {
    render() {
        return (
            <div className="event-details-page digital-download pre-order">
                {/* eslint-disable-next-line react/style-prop-object */}
                <MainTemplate
                    blackLogo={true}
                    shopBlock={true}
                    searchBlock={true}
                    style="#fff">
                    <ExpoloreSection />
                    <SelectEventSection />
                    <SelectionSection />
                </MainTemplate>
            </div>
        );
    }
}

export default NoPreOrder;
