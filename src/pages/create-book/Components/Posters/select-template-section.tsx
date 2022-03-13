import React, { useEffect, useState } from 'react';
import standardIMG from 'assets/images/poster/Standard.png';
import standardIMG1 from 'assets/images/poster/inset Area.png';
import standardIMG2 from 'assets/images/poster/Inset Area x2.png';
import doneImg from 'assets/images/poster/done.png';
import { GetPosterTemplate } from 'api/all-apis';
import { useDispatch, useSelector } from 'react-redux';
import { setPoster } from 'redux/posters';
import { keyGenerator, scrollToBlock } from 'utils/helpers';
import { four_step_bloc_for_crate_poster } from './crop-section';
import { Checkbox } from '@material-ui/core';

interface IThisProps {
    status: boolean;
    open: any;
}

export const tree_block_create_poster = 'tree_block_create_poster';

const templateImg = [standardIMG, standardIMG1, standardIMG2];

function SelectTemplateSection({ status, open }: IThisProps) {
    const dispatch = useDispatch();
    const [posterTemplates, setPosterTemplates] = useState([]);
    const [selectFlag, setSelectFlag] = useState(false);
    const posterInfo = useSelector(
        (state: IPosters) => state.Posters.posterCreateInfo
    );

    useEffect(() => {
        GetPosterTemplate().then((res) => {
            setPosterTemplates(res.data.data.items);
        });
    }, []);

    function openSelectPage(template: IPosterTemplate) {
        dispatch(
            setPoster({
                ...posterInfo,
                templateId: template.id,
                templateName: template.name,
                params: template.params
            })
        );
        setSelectFlag(true);
        open(true);
        scrollToBlock(four_step_bloc_for_crate_poster);
    }

    const [defaultChecked, setDefaultChecked] = useState(-1);
    function checkedTemplates(index: number, template: IPosterTemplate) {
        setDefaultChecked(index);
        openSelectPage(template);
    }
    return (
        <section
            className="select-template-section"
            id={tree_block_create_poster}
            style={{
                height: status ? 'auto' : '0',
                padding: status ? '4.375rem 0' : 'unset'
            }}>
            <div className="container-fluid wrapper1">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <span className="step-icon">2</span>
                        <h2 className="f-omnesMedium fs30 mb-3">
                            Select your Poster Type
                        </h2>
                        <p className="fs17 f-myriadprolight mb-3 lh-13">
                            Choose the poster type you want.
                        </p>
                        <div className="step-border d-flex align-items-center justify-content-between">
                            <p className="mb-0">STEP 2/3</p>
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
                    {(posterTemplates || []).map(
                        (template: IPosterTemplate, idx: number) => {
                            return (
                                <div
                                    className="col-md-4 col-12 mb-md-0 mb-3"
                                    key={keyGenerator(30)}>
                                    <div
                                        className={`${
                                            defaultChecked === idx && 'active'
                                        } select-template_box mr-md-auto mr-auto ml-auto ml-auto mr-auto trans h-md-100 text-center position-relative mb-2`}>
                                        <span className="check-item pr-0 pl-0">
                                            <Checkbox
                                                checked={defaultChecked === idx}
                                                color="primary"
                                                onClick={() => {
                                                    checkedTemplates(
                                                        idx,
                                                        template
                                                    );
                                                }}
                                                inputProps={{
                                                    'aria-label':
                                                        'secondary checkbox'
                                                }}
                                            />
                                        </span>
                                        <div className="mb-3">
                                            <img
                                                src={templateImg[idx]}
                                                alt=""
                                            />
                                        </div>
                                        <h2 className="select-template_title mb-0">
                                            {template.name}
                                        </h2>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </section>
    );
}

export default SelectTemplateSection;
