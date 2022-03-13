import React from 'react';
import {
    BillingActive,
    CartArrowDown,
    ChevronRightActive,
    PlansIcon,
    PlansIconActive,
    UnlockAlt,
    UnlockAltActive,
    UserActiveImg,
    UserImg,
    WalletImg
} from 'assets/images/settings';
import { useSelector } from 'react-redux';
import randomBackground, {
    keyGenerator,
    userAvatarName,
    userIsPublisher
} from 'utils/helpers';

const SideBar = ({
    setSelectedTab,
    selectedTab
}: {
    setSelectedTab: Function;
    selectedTab: String;
}) => {
    const tabs = [
        {
            id: 'order',
            title: 'Orders',
            pretitle:
                'Track and return the prodcuts you’ve ordered in Fanbooks',
            image: CartArrowDown,
            activeImage: CartArrowDown,
            forPublisher: false
        },
        {
            id: 'profile',
            title: 'Profile',
            pretitle: 'Modify your profile and personal information',
            image: UserImg,
            activeImage: UserActiveImg,
            forPublisher: false
        },
        {
            id: 'security',
            title: 'Security',
            pretitle: 'Change your password and security information',
            image: UnlockAlt,
            activeImage: UnlockAltActive,
            forPublisher: false
        },
        {
            id: 'billing',
            title: 'Billing',
            pretitle: 'Check your payment methods and your credit card info',
            image: WalletImg,
            activeImage: BillingActive,
            forPublisher: false
        },
        {
            id: 'plans',
            title: 'Plans',
            pretitle:
                'Change your account between Consumer and Publisher to get new features',
            image: PlansIcon,
            activeImage: PlansIconActive,
            forPublisher: !userIsPublisher((_P: boolean) => {})
        }
    ];

    const isSelected = (id: String) => selectedTab === id;

    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    return (
        <>
            <div className="col-22 mb-4">
                <div className="d-flex align-items-center">
                    <div
                        className="user-settigs_img user-profile-img"
                        style={{
                            background:
                                userInfo && userInfo?.avatarURL !== null
                                    ? `url(${userInfo?.avatarURL})`
                                    : randomBackground(),
                            boxShadow: 'unset'
                        }}>
                        {userAvatarName(userInfo)}
                    </div>
                    <div className="user-settigs_txt">
                        <h2 className="font-bold fs35 mb-2">
                            Hi, {userInfo && userInfo?.firstName}
                        </h2>
                        <a
                            href="mailto:milan@saasuma.com"
                            className="mail-link">
                            {userInfo && userInfo?.email}
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-78" />
            <div className="col-22 col-12">
                <ul id="tabs" className="nav mb-md-0 mb-5">
                    {tabs.map((tab) => {
                        if (!tab.forPublisher) {
                            return (
                                <li
                                    key={keyGenerator(30)}
                                    className="n-item"
                                    onClick={() => setSelectedTab(tab.id)}>
                                    <span className="n-link c-black d-flex align-items-center justify-content-between trans">
                                        <div className="d-flex">
                                            <span className="n-img dib trans">
                                                <img
                                                    src={
                                                        isSelected(tab.id)
                                                            ? tab.activeImage
                                                            : tab.image
                                                    }
                                                    alt={tab.id}
                                                />
                                            </span>
                                            <div className="n-txt">
                                                <h2 className="n-title font-bold">
                                                    {tab.title}
                                                </h2>
                                                <p className="n-pretitle">
                                                    {tab.pretitle}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={
                                                isSelected(tab.id)
                                                    ? 'dib'
                                                    : 'dn'
                                            }>
                                            <img
                                                src={ChevronRightActive}
                                                alt="chevron"
                                            />
                                        </span>
                                    </span>
                                </li>
                            );
                        } else if (
                            tab.forPublisher &&
                            userInfo?.publisherProfile
                        ) {
                            return (
                                <li
                                    key={keyGenerator(30)}
                                    className="n-item"
                                    onClick={() => setSelectedTab(tab.id)}>
                                    <span className="n-link c-black d-flex align-items-center justify-content-between trans">
                                        <div className="d-flex">
                                            <span className="n-img dib trans">
                                                <img
                                                    src={
                                                        isSelected(tab.id)
                                                            ? tab.activeImage
                                                            : tab.image
                                                    }
                                                    alt={tab.id}
                                                />
                                            </span>
                                            <div className="n-txt">
                                                <h2 className="n-title font-bold">
                                                    {tab.title}
                                                </h2>
                                                <p className="n-pretitle">
                                                    {tab.pretitle}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={
                                                isSelected(tab.id)
                                                    ? 'dib'
                                                    : 'dn'
                                            }>
                                            <img
                                                src={ChevronRightActive}
                                                alt="chevron"
                                            />
                                        </span>
                                    </span>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </>
    );
};

export default SideBar;
