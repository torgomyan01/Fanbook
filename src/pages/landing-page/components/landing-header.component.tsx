import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BecomePublisherButton } from 'features/components';
import { history, setMessageUser } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { useDispatch } from 'react-redux';
import { UM } from 'utils/user-messages';
import { Fade } from 'react-awesome-reveal';

const LandingHeader = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<string>('');

    function searchStart(e: any) {
        e.preventDefault();
        if (inputValue === '') {
            dispatch(setMessageUser(UM.SEARCH_ERROR));
        } else {
            const valueSearching: string = JSON.stringify(inputValue);
            localStorage.setItem('search-value', valueSearching);
            history.push(`${DEF_URL.SEARCH}`);
        }
    }

    return (
        <div className="header-bottom">
            <div className="container-fluid wrapper">
                <div className="row mb-4">
                    <div className="col-lg-6 col-12 order-lg-0 order-1 pr-lg-4">
                        <Fade direction="left" cascade={true}>
                            <form
                                action="#"
                                onSubmit={searchStart}
                                method="post"
                                className="form-box">
                                <h2 className="form-box_title">
                                    Search for an event
                                </h2>
                                <p className="form-box_txt ">
                                    Enter your event name below to open an event
                                    and access photo books and prints
                                </p>
                                <input
                                    type="text"
                                    placeholder="e.g. 2019 Challenge"
                                    className="mb-2"
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }}
                                />
                                <button className="blue-btn">
                                    Find Event
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </form>
                        </Fade>
                    </div>
                    <div className="col-lg-6 col-12 order-lg-1 order-0">
                        <div className="txt-box mb-lg-0 mb-5">
                            <Fade direction="right" cascade={true}>
                                <h2 className="txt-box_title">Made for Fans</h2>
                                <p className="txt-box_txt">
                                    The only solution that offers organizations
                                    collaborative, on-demand keepsake books that
                                    fans can personalize.
                                </p>
                                <BecomePublisherButton />
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="intro-box">*/}
            {/*    <div className="container-fluid">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-12">*/}
            {/*                <ul className="intro-list d-flex align-items-center">*/}
            {/*                    <li className="intro-item mr-2">*/}
            {/*                        <span className="intro-link">Intro</span>*/}
            {/*                    </li>*/}
            {/*                    <li className="intro-item">*/}
            {/*                        <span className="play-icon">*/}
            {/*                            <img src={Play} alt="play" />*/}
            {/*                        </span>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    /!*<LoadBox />*!/*/}
            {/*</div>*/}
        </div>
    );
};

export default LandingHeader;
