import React from 'react';
import bookImg from 'assets/images/book/select-book-4.png';
import { Checkbox } from '@material-ui/core';
interface IThisProps {
    e: any;
    onChange: any;
    index: number;
    activeNumber: number;
}

function BookSizingBlock({ e, onChange, index, activeNumber }: IThisProps) {
    function thisChange() {
        onChange({
            index,
            info: { ...e }
        });
    }

    return (
        <div className="col-xl-3 col-sm-6 col-12 mb-xl-0 mb-3">
            <div className="select-book_box  active mr-xl-auto  trans">
                <div className="d-flex align-content-lg-start mb-4">
                    <div
                        className="img-box"
                        style={{
                            backgroundImage: `url(${bookImg})`
                        }}
                    />
                    <ul className="mb-0 text-right">
                        <li className="check-item mb-4 pr-0 pl-0">
                            <Checkbox
                                checked={activeNumber === index}
                                color="primary"
                                inputProps={{
                                    'aria-label': 'secondary checkbox'
                                }}
                                style={{
                                    transform: 'translateX(12px)'
                                }}
                                onClick={thisChange}
                            />
                        </li>
                        <li className="fs15 mb-1 c-gray">Dimension</li>
                        <li className="fs19 mb-3">{e.dimension}</li>
                        <li className="fs15 mb-1 c-gray"># Pages</li>
                        <li>{e.pages}</li>
                    </ul>
                </div>
                <h2 className="f-omnesMedium fs19 mb-4">{e.bookName}</h2>
                <p className="fs15 c-gray mb-2">Price</p>
                <p className="fs25 c-red f-omnesMedium mb-3">{e.price}</p>
            </div>
        </div>
    );
}

export default BookSizingBlock;
