import React, { useState } from 'react';
import posterImg4 from 'assets/images/book/image-select-poster-4.png';
import doneImg from 'assets/images/poster/done.png';
import { useDispatch, useSelector } from 'react-redux';
import { setPoster } from 'redux/posters';
import { keyGenerator, scrollToBlock, thisSizes } from 'utils/helpers';
import { tree_block_create_poster } from './select-template-section';
import { Checkbox } from '@material-ui/core';

interface IThisProps {
    status: boolean;
    open: any;
}

export const two_step_create_poster = 'two_step_create_poster';

function SelectBookSection({ status, open }: IThisProps) {
    const dispatch = useDispatch();
    const [selectFlag, setSelectFlag] = useState(false);
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const posterInfo = useSelector(
        (state: IPosters) => state.Posters.posterCreateInfo
    );

    function selectPosterSizes(size: string) {
        dispatch(
            setPoster({
                ...posterInfo,
                size
            })
        );
        setSelectFlag(true);
        open(true);
        scrollToBlock(tree_block_create_poster);
    }

    const [defaultChecked, setDefaultChecked] = useState(-1);
    function checkedTemplates(index: number) {
        setDefaultChecked(index);
        selectPosterSizes(
            `${thisSizes[index].dimension.width}x${thisSizes[index].dimension.height}`
        );
    }

    return (
        <section
            className="select-book-section"
            id={two_step_create_poster}
            style={{
                height: status ? 'auto' : '0',
                padding: status ? '4.375rem 0' : 'unset'
            }}>
            <div className="container-fluid wrapper1">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <span className="step-icon">1</span>
                        <h2 className="f-omnesMedium fs30 mb-3">
                            Choose a Poster Size
                        </h2>
                        <p className="fs17 f-myriadprolight mb-3 lh-13">
                            Select a poster size that your photo will be
                            printend on.
                        </p>
                        <div className="step-border d-flex align-items-center justify-content-between">
                            <p className="mb-0">STEP 1/3</p>
                            {selectFlag && (
                                <span className="d-flex align-items-center f-myriadproreg c-black">
                                    DONE
                                    <img
                                        src={doneImg}
                                        className="ml-2"
                                        alt=""
                                    />
                                </span>
                            )}
                        </div>
                    </div>
                    {thisSizes.map((sizes, index: number) => {
                        return (
                            <div
                                key={keyGenerator(30)}
                                className="col-xl-3 col-lg-4 col-md-5 col-sm-12 mb-3">
                                <div
                                    className={`select-book_box ml-xr-auto trans ${
                                        defaultChecked === index && 'active'
                                    }`}>
                                    <div className="d-flex align-content-lg-start justify-content-between mb-4">
                                        <div
                                            className="poster-template-block-images"
                                            style={{
                                                width: `${
                                                    sizes.dimension.width * 5
                                                }px`,
                                                height: `${
                                                    sizes.dimension.height * 5
                                                }px`,
                                                backgroundImage: `url(${posterImg4})`
                                            }}
                                        />
                                        <ul className="mb-0 text-right">
                                            <li className="check-item mb-4 pr-0 pl-0">
                                                <Checkbox
                                                    checked={
                                                        defaultChecked === index
                                                    }
                                                    color="primary"
                                                    inputProps={{
                                                        'aria-label':
                                                            'secondary checkbox'
                                                    }}
                                                    onClick={() => {
                                                        checkedTemplates(index);
                                                    }}
                                                />
                                            </li>
                                            <li className="fs15 mb-1 c-gray">
                                                Dimension
                                            </li>
                                            <li className="fs19 mb-2 f-omnesMedium">
                                                {sizes.dimension.width}x
                                                {sizes.dimension.height}
                                            </li>
                                            <li className="fs15 c-gray mb-1">
                                                Price
                                            </li>
                                            <li className="fs25 c-red f-omnesMedium mb-3">
                                                ${sizes.price}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default SelectBookSection;
