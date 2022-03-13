import React, { useEffect, useState } from 'react';
import 'assets/css/search-event.css';
import MainTemplate from 'features/main-template/MainTemplate';
import PartnerSection from 'features/partner-section/partner.section';
import AddedSection from './components/added.section';
import FeaturedSection from './components/featured.section';
import SearchEventHeader from './components/search-event.section';
import { getPublicEvents } from 'api/all-apis';

const SearchEvent = () => {
    const [loadingBlocks, setLoadingBlocks] = useState<boolean>(true);
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getPublicEvents({
            'page[number]': '1',
            'page[size]': '3',
            sort: '-createdAt',
            'append[0]': 'albums',
            'append[1]': 'user'
        })
            .then((res) => {
                setEvents(res.data.data.items);
                setLoadingBlocks(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="search-event-page">
            <MainTemplate
                shopBlock={true}
                BlackFontUser={false}
                SubHeader={SearchEventHeader}>
                <div className="container-fluid wrapper1">
                    <FeaturedSection />
                    <AddedSection
                        events={events.slice(0, 3)}
                        loading={loadingBlocks}
                    />
                    <PartnerSection />
                </div>
            </MainTemplate>
        </div>
    );
};

export default SearchEvent;
