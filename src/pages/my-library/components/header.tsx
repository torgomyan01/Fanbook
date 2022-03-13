import React from 'react';
import materialCollectionsBookmark from 'assets/images/MyLibrary/material-collections-bookmark.png';
import { history } from 'utils/helpers';
import { Link } from 'react-router-dom';

function MyLibraryHeader() {
    return (
        <div className="header-bottom mt-3 d-inline-block">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12 p-0">
                        <ul className="mb-0">
                            <li>
                                <a href="#" className="fs28 c-black">
                                    <img
                                        src={materialCollectionsBookmark}
                                        alt=""
                                        className="mr-2"
                                    />
                                    My Library
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyLibraryHeader;
