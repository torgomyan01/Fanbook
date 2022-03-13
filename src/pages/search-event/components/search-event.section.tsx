import React, { useState } from 'react';
import { history, setMessageUser } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { useDispatch } from 'react-redux';
import { UM } from 'utils/user-messages';
import { Fade } from 'react-awesome-reveal';

const SearchEventHeader = () => {
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
        <div className="header-bottom position-relative">
            <div className="container-fluid wrapper">
                <div className="row">
                    <div className="col-12 text-center">
                        <Fade direction="left">
                            <h2 className="header-bottom_title">
                                Making an Event Memorable
                            </h2>
                        </Fade>

                        <Fade direction="right">
                            <p className="header-bottom_txt ">
                                Enter your Event Search Term in the box below
                            </p>
                        </Fade>

                        <Fade>
                            <form
                                action="/"
                                onSubmit={searchStart}
                                method="get"
                                className="form-box">
                                <input
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Enter the event search term"
                                    className="mb-2"
                                />
                                <button className="blue-btn">Find Event</button>
                            </form>
                        </Fade>
                    </div>
                </div>
            </div>
            {/*<LoadBox />*/}
        </div>
    );
};

export default SearchEventHeader;
