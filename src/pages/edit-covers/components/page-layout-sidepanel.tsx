import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openPages } from 'redux/edit-cover';
import { keyGenerator } from 'utils/helpers';
import LayoutBlocks from './layout-blocks';

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

    const SortingLayouts = Layouts?.slice()?.sort(
        (a: IBookTemplate, b: IBookTemplate) => a.order - b.order
    );
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
                    <div className="layouts-for-editor-page">
                        {SortingLayouts.map(
                            (template: IBookTemplate, index: number) => {
                                return (
                                    <LayoutBlocks
                                        key={keyGenerator(30)}
                                        index={index}
                                        template={template}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PageLayoutSidePanel;
