import React, { Component } from 'react';
import 'assets/css/pre-order.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import PreBlock from './components/pre-block';
import LibrarySection from './components/library-section';
import PostSection from './components/post-section';
import SelectEventSection from './components/select-event-section';

class PreOrder extends Component {
    render() {
        return (
            <div className="event-details-page digital-download pre-order">
                {/* eslint-disable-next-line react/style-prop-object */}
                <MainTemplate
                    blackLogo={true}
                    shopBlock={true}
                    searchBlock={true}
                    style="#fff">
                    <PreBlock />
                    <LibrarySection />
                    <PostSection />
                    <SelectEventSection />
                </MainTemplate>
            </div>
        );
    }
}

export default PreOrder;
