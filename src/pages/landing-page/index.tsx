import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import 'assets/css/landing-page.css';
import MainTemplate from 'features/main-template/MainTemplate';
import PartnerSection from 'features/partner-section/partner.section';
import BookSection from './components/book.section';
import CaseSection from './components/case.section';
import EventsSection from './components/events.section';
import FansSection from './components/fans.section';
import LandingHeader from './components/landing-header.component';
import { setUser } from 'redux/auth.slice';
import { useHistory } from 'react-router-dom';
import { LoginUSerGoogle } from 'api/all-apis';
import { LoginUser } from 'utils/helpers';
import Cookies from 'js-cookie';

const LandingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const url = new URL(window.location.href).hash;
    useEffect(() => {
        const access = url.split('&');

        // FOR TAKE | ID TOKEN |
        const IDToken: any = access
            .find((text: string) => text.includes('id_token'))
            ?.split('=')[1];

        // FOR TAKE | ACCESS TOKEN |
        const access_token = access
            .find((text: string) => text.includes('access_token'))
            ?.split('=')[1];

        if (access_token) {
            Cookies.set('access_token', access_token, { expires: 1 });
            Cookies.set('id_token', IDToken, { expires: 1 });

            LoginUSerGoogle(access_token).then(function (response) {
                const profile = response.data.data.item;
                localStorage.setItem('user', JSON.stringify(profile));
                dispatch(
                    setUser({
                        profile: { ...profile },
                        token: access_token
                    })
                );
            });
        }
    }, [dispatch, history, url]);

    return (
        <div
            className="home-page"
            // style={{ filter: 'blur(15px)' }}
        >
            <MainTemplate
                BlackFontUser={false}
                shopBlock={true}
                SubHeader={LandingHeader}>
                <EventsSection />
                <FansSection />
                <CaseSection />
                <PartnerSection />
                <BookSection />
            </MainTemplate>
        </div>
    );
};

export default LandingPage;
