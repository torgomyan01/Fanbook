import React from 'react';
import 'assets/css/edit-publisher-complete.css';
import MainTemplate from 'features/main-template/MainTemplate';
import SettingsSectionA from './components/settings-section';
import ChangeSection from './components/change-section';

function EmbeddableSettings() {
    return (
        <div className="event-details-page main-settings-page emb-settings">
            <MainTemplate blackLogo={true} shopBlock={true} searchBlock={true}>
                <SettingsSectionA />
                <ChangeSection />
            </MainTemplate>
        </div>
    );
}

export default EmbeddableSettings;
