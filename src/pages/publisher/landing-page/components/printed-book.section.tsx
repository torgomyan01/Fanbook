import React, { useMemo, useState } from 'react';

import Booking1 from 'assets/images/publisher/booking-1.png';
import Booking2 from 'assets/images/publisher/booking-2.png';
import Booking3 from 'assets/images/publisher/booking-3.png';
import BookingActive1 from 'assets/images/publisher/booking-1-active.png';
import BookingActive2 from 'assets/images/publisher/booking-2-active.png';
import BookingActive3 from 'assets/images/publisher/booking-3-active.png';
import BookImg from 'assets/images/publisher/book-img.png';
import { BecomePublisherButton } from 'features/components';
import { thisSizes } from 'utils/helpers';

const PrintedBookSection = () => {
    const sections = useMemo(
        () => [
            {
                unactiveIcon: Booking1,
                activeIcon: BookingActive1,
                title: 'Books',
                headingText: 'Beautiful Printed Books',
                text: 'All Fanbooks are printed in full-color on high quality paper with a great look and feel. All softcover books are PUR glue bound and hardcover books are side-sewn for durability. All covers come standard with a glossy finish or can be upgraded to a matte finish that hides fingerprints. Available in 3 sizes, Fanbooks is great for any occasion.'
            },
            {
                unactiveIcon: Booking2,
                activeIcon: BookingActive2,
                title: 'Posters',
                headingText: 'Custom Printed Posters',
                text: `Fanbooks posters are printed in full-color on 8pt high gloss paper and are available in multiple sizes, including ${printSizes()}. All posters are printed on-demand and ready to frame. Add your logo for personalization or add your sponsors as a way to make additional revenue.`
            },
            {
                unactiveIcon: Booking3,
                activeIcon: BookingActive3,
                title: 'Downloads',
                headingText: 'High Quality Downloads',
                text: 'A quickest and easiest way to generate revenue from your photos, Fanbooks Photo Downloads allow any Publisher with proprietary IP to create specialized galleries for easy browsing and purchase. Organize your photos and make them available for purchase in different sizes and different prices.'
            }
        ],
        []
    );
    const [selectedSection, setSelectedSection] = useState(0);

    function printSizes() {
        let _str = '';
        thisSizes.map((sizes, index: number) => {
            _str += `${sizes.dimension.width}x${sizes.dimension.height}${
                index === thisSizes.length - 2
                    ? ' and '
                    : index < thisSizes.length - 1
                    ? ','
                    : ''
            } `;
        });
        return _str;
    }
    return (
        <section className="printed-book-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="printed-book-list col-12">
                        <ul className="d-flex flex-sm-row flex-column align-items-center mb-0 w-100 justify-content-center">
                            {sections.map((section, index) => (
                                <li
                                    key={index}
                                    className={`printed-book_item text-center position-relative trans mb-sm-0 mb-3 ${
                                        selectedSection === index
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => setSelectedSection(index)}>
                                    <span className="dib mb-3">
                                        <img
                                            src={
                                                selectedSection === index
                                                    ? section.activeIcon
                                                    : section.unactiveIcon
                                            }
                                            alt=""
                                        />
                                    </span>

                                    <span className="perfect-item_txt text-center">
                                        {section.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-5 col-md-6 col-12">
                        <div className="text-box c-white">
                            <h2 className="text-box_title">
                                {sections[selectedSection].headingText}
                            </h2>
                            <p className="text-box_txt">
                                {sections[selectedSection].text}
                            </p>
                            <BecomePublisherButton className="bgc-black m-md-0 m-auto" />
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 col-12 text-right d-flex align-items-xl-start align-items-center">
                        <span className="img-box d-inline-block ">
                            <img src={BookImg} alt="" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrintedBookSection;
