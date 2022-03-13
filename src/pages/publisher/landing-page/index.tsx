import React from 'react';

import 'assets/css/publisher.css';
import MainTemplate from 'features/main-template/MainTemplate';
import AboutSection from './components/about.section';
import Header from './components/header.section';
import MemorySection from './components/memory.section';
import NewGenerationSection from './components/new-generation.section';
import PerfectSection from './components/perfect.section';
import PrintedBookSection from './components/printed-book.section';
import { goToHome, isUserLogin, userIsPublisher } from 'utils/helpers';

const PublisherLandingPage = () => {
    const openPage = isUserLogin() && !userIsPublisher();

    return (
        <>
            {openPage ? (
                <div className="home-page publisher-new-page">
                    <MainTemplate
                        BlackFontUser={false}
                        shopBlock={true}
                        SubHeader={Header}>
                        <PerfectSection />
                        <PrintedBookSection />
                        <NewGenerationSection />
                        <AboutSection />
                        <MemorySection />
                    </MainTemplate>
                </div>
            ) : (
                goToHome()
            )}
        </>
    );
};

export default PublisherLandingPage;
