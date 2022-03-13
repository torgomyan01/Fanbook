import React, { Component } from 'react';
import 'assets/css/edit-publier-empty.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import PartnerSection from 'features/partner-section/partner.section';
import PublisherImgBlock from './components/puplisher-profile-block';
import AboutBox from './components/about-box';
import EditUserNames from './components/info-to-soc-site';

class EditProfile extends Component {
    render() {
        return (
            <div className="header">
                <MainTemplate
                    blackLogo={true}
                    shopBlock={true}
                    searchBlock={true}>
                    <section className="publisher-section pt-5 pb-5">
                        <div className="container-fluid wrapper1">
                            <div className="row">
                                <PublisherImgBlock />
                                <div className="col-xl-10 col-12">
                                    <div className="publisher-right">
                                        <AboutBox />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <EditUserNames />
                            </div>
                        </div>
                    </section>
                    <PartnerSection />
                </MainTemplate>
            </div>
        );
    }
}

export default EditProfile;
