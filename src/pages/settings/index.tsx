import React, { useState } from 'react';
import 'assets/css/settings.css';
import ProfileSection from './sections/profile.section';
import SecuritySection from './sections/security.section';
import SideBar from './sections/sidebar.section';
import MainTemplate from 'features/main-template/MainTemplate';
import BillingSection from './sections/billing.section';
import PlansSection from './sections/plans.section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import OrdersSection from 'pages/settings/sections/orders.section';
import { goToHome, isUserLogin } from 'utils/helpers';

const Settings = () => {
    const [selectedTab, setSelectedTab] = useState('');

    const renderTabs = () => {
        switch (selectedTab) {
            case 'order':
                return <OrdersSection />;
            case 'preorders':
                return (
                    <div id="preorders" className="tab-pane fade active show" />
                );
            case 'profile':
                return <ProfileSection />;
            case 'security':
                return <SecuritySection />;
            case 'billing':
                return <BillingSection />;
            case 'plans':
                return <PlansSection />;
            default:
                return (
                    <div className="tab-pane fade active show h-100">
                        <h2 className="tab-pane_title font-bold">
                            Please select an option from the left bar
                        </h2>
                        <div className="img-box">
                            <FontAwesomeIcon
                                icon={faCog}
                                className="setings-icon"
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {isUserLogin((res: boolean) => !res && goToHome()) && (
                <div className="main-settings-page">
                    <MainTemplate blackLogo={true} shopBlock={true}>
                        <main>
                            <section className="settings-section">
                                <div className="container-fluid wrapper1">
                                    <div className="row">
                                        <div className="col-12 d-flex">
                                            <h2 className="settings-title font-bold mb-0 d-inline-block mr-5">
                                                Settings
                                            </h2>
                                            <ul className="d-flex align-items-center mb-0">
                                                <li className="mr-2">
                                                    <span className="fs15">
                                                        Settings
                                                    </span>
                                                </li>
                                                <li className="mr-2">
                                                    <span>{'>'}</span>
                                                </li>
                                                <li>
                                                    <span
                                                        id="settings-fild"
                                                        className="fs15"
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="user-section">
                                <div className="container-fluid wrapper1">
                                    <div className="row">
                                        <SideBar
                                            setSelectedTab={setSelectedTab}
                                            selectedTab={selectedTab}
                                        />
                                        <div className="col-78 col-12">
                                            <div
                                                id="tabsContent"
                                                className="tab-content h-100">
                                                {renderTabs()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    </MainTemplate>
                </div>
            )}
        </>
    );
};

export default Settings;
