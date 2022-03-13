import React from 'react';

import TeamMember1 from 'assets/images/publisher/team-member-1.png';
import { Carousel } from 'react-bootstrap';

const AboutSection = () => {
    return (
        <div className="about-block">
            <Carousel
                id="about-slider"
                indicators={false}
                // prevIcon={
                //     <span className="carousel-control-prev">
                //         <img src={LeftArrow} alt="" />
                //     </span>
                // }
                // nextIcon={
                //     <span className="carousel-control-next">
                //         <img src={RightArrow} alt="" />
                //     </span>
                // }
            >
                <Carousel.Item>
                    <div className="row">
                        <div className="col-12">
                            <div className="mw-900">
                                <p className="about-block_txt">
                                    “A great, new addition that our fans really
                                    love. We introduced Fanbooks in 2017 to the
                                    fans at the National Finals Rodeo and 100%
                                    of the buyers personalized their books. The
                                    unique personalization is a game changer for
                                    our experiential marketing team.”
                                </p>
                                <h3 className="team-title text-center">
                                    Michael Mack, Las Vegas Events
                                </h3>
                                <ul className="team-list">
                                    <li className="team-member">
                                        <span className="d-inline-block active">
                                            <img src={TeamMember1} alt="" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default AboutSection;
