import React from 'react';
import GenerationImg from 'assets/images/publisher/generation-img.png';
import { BecomePublisherButton } from 'features/components';
import Slider from 'react-slick';
import { keyGenerator } from 'utils/helpers';

const sliderItem = [
    {
        title: 'New Revenue Generation',
        textOne:
            'Turn your photos into new revenue. Experiential marketing is a major part of fan engagement, but it doesn’ t have to be a cost center.',
        textTwo:
            'Use Fanbooks to deliver beautiful, high quality products without incurring the upfront fees or overhead that comes with traditional publishing and printing.'
    },
    {
        title: ' Publisher Controls',
        textOne:
            'We can’t all be graphic designers and  traditional publishing requires software and expertise that most people don’t have.',
        textTwo:
            'Now your fans can share their favorite photos across their favorite social platforms and bring their friends back to your Fanbooks storefront.'
    },
    {
        title: 'Social Integration',
        textOne:
            'Make your photos work for you. Fanbooks supports all of the major social platforms including Facebook, Instagram, and Pinterest?',
        textTwo:
            'Now your fans can share their favorite photos across their favorite social platforms and bring their friends back to your Fanbooks storefront.'
    }
];
const NewGenerationSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <section className="new-generat-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-12">
                        <Slider {...settings}>
                            {sliderItem.map((item) => {
                                return (
                                    <div
                                        key={keyGenerator(20)}
                                        className="text-box c-white">
                                        <h2 className="text-box_title">
                                            {item.title}
                                        </h2>
                                        <p className="text-box_txt">
                                            {item.textOne}
                                        </p>
                                        <p className="text-box_txt">
                                            {item.textTwo}
                                        </p>
                                        <BecomePublisherButton className="m-md-0 m-auto" />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                    <div className="col-lg-5 col-md-6 col-12 d-flex align-items-xl-start align-items-center justify-content-xl-end justify-content-center">
                        <span className="d-inline-block">
                            <img src={GenerationImg} alt="" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewGenerationSection;
