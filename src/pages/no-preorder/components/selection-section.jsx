import React from 'react';
import SelectBox from './select-box';

function SelectionSection() {
    const title = 'Book';
    const subTitle =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.';
    const price = 19.5;
    return (
        <section className="select-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center c-white fs40 mb-3">
                            Select product to Pre-order
                        </h2>
                        <p className="text-center c-white f-Omneslight fs21 mb-60">
                            Book, Poster or Digital Download
                        </p>
                    </div>
                    <SelectBox
                        title={title}
                        subTitle={subTitle}
                        price={price}
                    />
                    <SelectBox
                        title={title}
                        subTitle={subTitle}
                        price={price}
                    />
                    <SelectBox
                        title={title}
                        subTitle={subTitle}
                        price={price}
                    />
                </div>
            </div>
        </section>
    );
}

export default SelectionSection;
