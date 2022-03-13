import React from 'react';
import MainHeader from './main-header';
import MainContent from './main-content';
import MainFooter from './main-footer';

function MiddleMain() {
    return (
        <div className="middle-main" id="middle-main">
            <MainHeader />
            <MainContent />
            <MainFooter />
        </div>
    );
}

export default MiddleMain;
