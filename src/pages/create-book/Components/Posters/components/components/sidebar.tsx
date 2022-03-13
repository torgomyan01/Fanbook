import React, { Fragment } from 'react';
import TemplateImage1 from 'assets/images/poster/poster18x24.png';
import TemplateImage2 from 'assets/images/poster/poster24x36.png';
import TemplateImage1Active from 'assets/images/poster/poster18x24-active.png';
import TemplateImage2Active from 'assets/images/poster/poster24x36-active.png';
import Library from 'assets/images/poster/library.png';
import LibraryActive from 'assets/images/poster/library-active.png';
import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    changeSizes: any;
    posterSizes: {
        width: number;
        height: number;
    };
    changeLibraryBlock: any;
    openCloseLibraryBlock: boolean;
}

const sizes = [
    {
        width: 24,
        height: 36,
        imageActive: TemplateImage2Active,
        image: TemplateImage2
    },
    {
        width: 18,
        height: 24,
        imageActive: TemplateImage1Active,
        image: TemplateImage1
    }
];

function EditorPosterPageSideBar({
    changeSizes,
    posterSizes,
    changeLibraryBlock,
    openCloseLibraryBlock
}: IThisProps) {
    return (
        <Fragment>
            <div className="edit-tools-sidebar">
                <ul className="menu-list">
                    {sizes.map((sz) => {
                        return (
                            <li
                                key={keyGenerator(30)}
                                className="menu_item"
                                onClick={() => {
                                    changeSizes(sz.width, sz.height);
                                }}>
                                <span
                                    className={`menu_item_link cursor-pointer ${
                                        posterSizes.width === sz.width &&
                                        posterSizes.height === sz.height &&
                                        'active'
                                    }`}>
                                    <img
                                        src={sz.image}
                                        alt="edit"
                                        className="db"
                                    />
                                    <img
                                        src={sz.imageActive}
                                        alt="edit"
                                        className="dn"
                                    />
                                    {sz.width}x{sz.height}
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <ul
                    className="menu-list cursor-pointer"
                    onClick={changeLibraryBlock}>
                    <li className="menu_item">
                        <span
                            className={`menu_item_link ${
                                openCloseLibraryBlock && 'active'
                            }`}>
                            <img src={Library} alt="content" className="db" />
                            <img
                                src={LibraryActive}
                                alt="content"
                                className="dn"
                            />
                            LIBRARY
                        </span>
                    </li>
                    {/* <li className="menu_item">
                        <a href="#" className="menu_item_link">
                            <img
                                src="image/drafts.png"
                                alt="draft"
                                className="db"
                            />
                            <img
                                src="image/drafts-active.png"
                                alt="dash"
                                className="dn"
                            />
                            DRAFTS
                        </a>
                    </li> */}
                </ul>
            </div>
        </Fragment>
    );
}

export default EditorPosterPageSideBar;
