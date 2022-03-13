import React, { EventHandler, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import myEventsImg from '../images/material-collections-bookmark.png';
import { ALL_URL } from 'utils/urls';
import { history } from 'utils/helpers';

function HeaderBlockEventList() {
    const [searchValue, setSearchValue] = useState<string>('');
    function startSearchMyEvents(e: any) {
        if (e.key === 'Enter') {
            localStorage.setItem('search-my-events-page', searchValue);
            history.push(ALL_URL.SEARCH_EVENTS);
        }
    }

    function deleteValue() {
        setSearchValue('');
    }
    return (
        <div className="header-bottom bg-white mb-4">
            <div className="container-fluid wrapper-1447 p-0">
                <div className="row no-gutters">
                    <div className="col-12 header-block-event-lists d-flex justify-content-between align-items-center">
                        <Link to="#" className="fs28 c-black mb-2">
                            <img src={myEventsImg} alt="" className="mr-2" />
                            My Events
                        </Link>
                        <div className="header-search-event-bar mt-2">
                            <i className="fas fa-search c-red mr-2" />
                            <input
                                type="text"
                                onKeyUp={startSearchMyEvents}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                                value={searchValue}
                                placeholder="Search an event..."
                            />
                            {searchValue.length > 0 && (
                                <i
                                    className="fas fa-times mr-3 c-red cursor-pointer"
                                    onClick={deleteValue}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderBlockEventList;
