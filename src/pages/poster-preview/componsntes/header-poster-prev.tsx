import React from 'react';
import BlackLogo from 'assets/images/black-logo.png';
import BlockPlaceholder from 'features/block-placeholder';
import { Link } from 'react-router-dom';
import { eventUrlPublicPrivate, history } from '../../../utils/helpers';

interface IThisProps {
    thisPoster: IPoster | undefined;
    loading: boolean;
}

function HeaderPosterPrevPage({ thisPoster, loading }: IThisProps) {
    function goToBack() {
        history.go(-1);
    }

    return (
        <header>
            <div className="header-top">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="header-left d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <h1 className="navbar-brand">
                                    <Link
                                        to="/"
                                        className="d-inline-block"
                                        title="fanbook">
                                        <img
                                            src={BlackLogo}
                                            alt="logo"
                                            className="img-logo"
                                        />
                                    </Link>
                                </h1>
                                <span className="banner-editor mt-2">
                                    poster editor
                                </span>
                            </div>
                            <div className="editor-parametres">
                                <div className="dropdown drop-book-editor">
                                    <label
                                        htmlFor="dropBookName"
                                        className="d-block label-book-editor">
                                        Event Name
                                    </label>
                                    <Link
                                        className="dropdown-toggle mr-2"
                                        to={eventUrlPublicPrivate(
                                            thisPoster?.userEvent
                                        )}
                                        data-toggle="dropdown"
                                        id="dropBookName">
                                        <span className="mr-2">
                                            {loading ? (
                                                <BlockPlaceholder
                                                    width={100}
                                                    height={20}
                                                    borderRadius={5}
                                                    status={true}
                                                    count={1}
                                                    className="m-0"
                                                />
                                            ) : (
                                                thisPoster?.userEvent.name
                                            )}
                                        </span>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="#">text</Link>
                                        </li>
                                        <li>
                                            <Link to="#">text</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul className="list-unstyled btns-list">
                                <li>
                                    <div
                                        className="btn btn-outline-light white c-gray"
                                        onClick={goToBack}>
                                        <span className="d-flex align-items-center">
                                            Close
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderPosterPrevPage;
