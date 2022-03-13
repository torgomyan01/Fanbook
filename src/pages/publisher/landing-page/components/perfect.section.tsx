import React, { useMemo, useState } from 'react';

import PerfectImg1 from 'assets/images/publisher/perfectimg-1.png';
import PerfectImgActive1 from 'assets/images/publisher/perfectimg-1-active.png';
import PerfectImg2 from 'assets/images/publisher/perfectimg-2.png';
import PerfectImgActive2 from 'assets/images/publisher/perfectimg-2-active.png';
import PerfectImg3 from 'assets/images/publisher/perfectimg-3.png';
import PerfectImgActive3 from 'assets/images/publisher/perfectimg-3-active.png';
import PerfectImg4 from 'assets/images/publisher/perfectimg-4.png';
import PerfectImgActive4 from 'assets/images/publisher/perfectimg-4-active.png';
import BrandImg from 'assets/images/publisher/brand-img.png';
import EventImg from 'assets/images/publisher/event-img.png';
import PhotographImg from 'assets/images/publisher/photograph-img.png';
import TeamImg from 'assets/images/publisher/team-img.png';
import { BecomePublisherButton } from 'features/components';
import { keyGenerator } from 'utils/helpers';

const PerfectSection = () => {
    const [selectedSection, setSelectedSection] = useState(0);
    const sections = useMemo(
        () => [
            {
                activeIcon: PerfectImg1,
                unactiveIcon: PerfectImgActive1,
                title: 'Events',
                firstLine: 'Fanbooks helps your events live on',
                secondLine: 'Use Fanbooks to create a memento of your event'
            },
            {
                activeIcon: PerfectImg2,
                unactiveIcon: PerfectImgActive2,
                title: 'Brands',
                firstLine: 'Fanbooks is tangible brand engagement',
                secondLine:
                    'Fanbooks lets users engage with your brand, long term'
            },
            {
                activeIcon: PerfectImg3,
                unactiveIcon: PerfectImgActive3,
                title: 'Photographers',
                firstLine: 'Fanbooks is perfect for Photographers',
                secondLine:
                    'The easiest way to provide print versions of your images'
            },
            {
                activeIcon: PerfectImg4,
                unactiveIcon: PerfectImgActive4,
                title: 'Teams',
                firstLine: 'Fanbooks creates memories for your team and fans',
                secondLine:
                    'Create a long term reminder of the strength of your team'
            }
        ],
        []
    );
    return (
        <>
            <section className="perfect-section">
                <div className="container-fluid wrapper1">
                    <div className="row">
                        <div className="col-12">
                            <div className="perfect-box">
                                <h2 className="perfect-box_title">
                                    Fanbooks is perfect for:
                                </h2>
                                <ul className="perfect-list d-md-flex justify-content-between">
                                    {sections.map((section, index) => (
                                        <li
                                            key={keyGenerator(30)}
                                            className={`perfect-item d-flex flex-column justify-content-between position-relative trans ${
                                                selectedSection === index
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                setSelectedSection(index)
                                            }>
                                            <span className="d-inline-block text-center ">
                                                <span className="dib mb-3">
                                                    <img
                                                        src={
                                                            selectedSection ===
                                                            index
                                                                ? section.activeIcon
                                                                : section.unactiveIcon
                                                        }
                                                        alt=""
                                                    />
                                                </span>
                                            </span>
                                            <span className="perfect-item_txt text-center">
                                                {section.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-center">
                                    <h2 className="perfect-section_title">
                                        {sections[selectedSection].title}
                                    </h2>
                                    <p className="perfect-section_txt">
                                        {sections[selectedSection].firstLine}
                                        <span className="d-block ">
                                            {
                                                sections[selectedSection]
                                                    .secondLine
                                            }
                                        </span>
                                    </p>
                                    <BecomePublisherButton className="m-auto bgc-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="perfect-img-block">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-12 my-col pl-md-2">
                            <div
                                className="img-box d-flex justify-content-center align-items-center trans"
                                style={{ backgroundImage: `url(${EventImg})` }}>
                                <span className="font-medium c-white fs34">
                                    Events
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 my-col">
                            <div
                                className="img-box d-flex justify-content-center align-items-center trans"
                                style={{ backgroundImage: `url(${BrandImg})` }}>
                                <span className="font-medium c-white fs34">
                                    Brands
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 my-col">
                            <div
                                className="img-box d-flex justify-content-center align-items-center trans"
                                style={{
                                    backgroundImage: `url(${PhotographImg})`
                                }}>
                                <span className="font-medium c-white fs34">
                                    Photographers
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-12 my-col pr-md-2">
                            <div
                                className="img-box d-flex justify-content-center align-items-center trans"
                                style={{ backgroundImage: `url(${TeamImg})` }}>
                                <span className="font-medium c-white fs34">
                                    Teams
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PerfectSection;
