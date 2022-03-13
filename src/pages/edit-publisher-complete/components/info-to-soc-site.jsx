import React from 'react';
import AddSocialNetwork from './add-social-networ';
import ExternalWebsiteBlock from './external-website-block';

function EditUserNames() {
    return (
        <div className="offset-xl-2 col-xl-10 col-12">
            <div className="publisher-right">
                <div className="social-block">
                    <div className="row">
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <ExternalWebsiteBlock />

                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <AddSocialNetwork />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserNames;
