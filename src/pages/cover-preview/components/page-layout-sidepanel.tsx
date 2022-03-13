import React from 'react';
import { Link } from 'react-router-dom';
import layoutActive8 from '../images/kolazh/layout-8-active.png';
import { useDispatch, useSelector } from 'react-redux';
import { openPages } from 'redux/edit-cover';

import { setCurrentTemplate } from 'redux/edit-book';
import { keyGenerator } from 'utils/helpers';

function PageLayoutSidePanel() {
    const dispatch = useDispatch();
    const EditCover = useSelector((state: any) => state.editCover.pages);
    const Layouts = useSelector(
        (state: IOneBook) => state.ThisBook.bookTemplates
    );
    function closePagePanel(e: any) {
        e.preventDefault();
        dispatch(openPages(false));
    }

    function OpenLayout(e: any) {
        const thisId = e.target.getAttribute('data-id');

        const thisTemplate = Layouts.find(
            (template: IBookTemplate) => template.id === thisId
        );
        dispatch(setCurrentTemplate(thisTemplate));
    }
    return (
        <div
            className="page-layout-sidepanel"
            style={{
                left: EditCover ? '7.5rem' : '-20.125rem'
            }}>
            <div className="text-right">
                <Link to="#" onClick={closePagePanel}>
                    <i className="fal fa-long-arrow-left c-black" />
                </Link>
            </div>
            {EditCover && (
                <div>
                    <h4 className="page-layout-title">SELECT PAGE LAYOUT</h4>
                    <div>
                        {Layouts.map((template: IBookTemplate) => {
                            return (
                                <div
                                    key={keyGenerator(30)}
                                    className="layout-box"
                                    data-id={template.id}>
                                    <Link
                                        to="#"
                                        onClick={OpenLayout}
                                        data-id={template.id}
                                        className="layout-box-link">
                                        <img
                                            src={template?.logoURL}
                                            data-id={template.id}
                                            alt="icon"
                                            className="db"
                                        />
                                        <img
                                            src={layoutActive8}
                                            data-id={template.id}
                                            alt="icon"
                                            className="dn"
                                        />
                                        {template.name}
                                    </Link>
                                </div>
                            );
                        })}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout1} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive1}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Blank Page*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link active">*/}
                        {/*        <img src={layout2} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive2}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 2*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout3} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive3}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 3*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout4} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive4}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 4*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout5} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive5}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 5*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout6} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive6}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 6*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout7} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive7}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 7*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout8} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive8}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 8*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout9} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive9}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 9*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                        {/*<div className="layout-box">*/}
                        {/*    <Link to="#" className="layout-box-link">*/}
                        {/*        <img src={layout10} alt="icon" className="db" />*/}
                        {/*        <img*/}
                        {/*            src={layoutActive10}*/}
                        {/*            alt="icon"*/}
                        {/*            className="dn"*/}
                        {/*        />*/}
                        {/*        Layout 10*/}
                        {/*    </Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageLayoutSidePanel;
