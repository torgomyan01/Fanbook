import React from 'react';
import { BecomePublisherButton } from '../../../../features/components';

const MemorySection = () => {
    return (
        <section className="memory-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12">
                        <div className="txt-box text-center c-white">
                            <h2 className="txt-box_title">
                                Become a Publisher TODAY!
                            </h2>
                            <p className="txt-box_txt fs25 mb-5">
                                Give your audience a new, tangible way to engage
                                wuth the content
                            </p>
                            <BecomePublisherButton className="m-auto" />
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mb-md-0 mb-3 memory-col">
                        <div className="memory-box text-center c-white h-100">
                            <h2 className="memory-box_title">
                                Brand New Revenues
                            </h2>
                            <p className="memory-box_txt">
                                Fanbooks opens up brand new revenue streams for
                                your businesses, while giving your audience a
                                new, tangible way to engage with the content
                                they love.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mb-md-0 mb-3 memory-col">
                        <div className="memory-box text-center c-white h-100">
                            <h2 className="memory-box_title">
                                Memories Forever
                            </h2>
                            <p className="memory-box_txt">
                                Fanbooks is the best way for your organization
                                to not only make memories, but to have those
                                memories available for keeps and to cherish
                                forever.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MemorySection;
