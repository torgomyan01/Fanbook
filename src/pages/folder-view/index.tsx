import React from 'react';
import 'assets/css/folder-view.css';
import MainTemplate from 'features/main-template/MainTemplate';
import MainForm from './components/main-form';
import ContentSection from './components/content-section';
import FolderSection from './components/folder-section';
import AddedSection from '../previous-orders/components/added-section';

function FolderView() {
    return (
        <div className="event-details-page library-grid previous-orders serp-page folder-view">
            <MainTemplate blackLogo={true} shopBlock={true} searchBlock={true}>
                <MainForm />
                <ContentSection />
                <FolderSection />
                <AddedSection />
            </MainTemplate>
        </div>
    );
}

export default FolderView;
