import React from 'react';
import LeftBlock from './left-block';
import RightBlock from './right-block';

function ChangeSection() {
    return (
        <section className="change-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <LeftBlock />
                    <RightBlock />
                </div>
            </div>
        </section>
    );
}

export default ChangeSection;
