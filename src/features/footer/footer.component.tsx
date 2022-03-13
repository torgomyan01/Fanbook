import React, { useState } from 'react';
import 'features/footer/footer.style.css';
import Logo from 'assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import BecomePublisherButton from '../components/become-publisher-button.component';
import { history, setMessageUser } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { useDispatch } from 'react-redux';
import { UM } from 'utils/user-messages';

function FooterComponent() {
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
        <footer>
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12">
                        <span
                            title="Fanbooks"
                            className="footer-logo mb-3 d-inline-block">
                            <img src={Logo} alt="logo" />
                        </span>
                    </div>
                </div>
                <div className="row fix-footer mb-3">
                    <div className="col-lg-5 col-md-6 col-sm-7 col-12  mb-sm-0 mb-5">
                        <form
                            action="#"
                            method="post"
                            onSubmit={searchStart}
                            className="form-box">
                            <label htmlFor="search" className="form-title">
                                Search for an event
                            </label>
                            <div className="d-flex flex-sm-row flex-column ">
                                <input
                                    id="search"
                                    type="text"
                                    onChange={(e: any) => {
                                        setInputValue(e.target.value);
                                    }}
                                    placeholder="e.g. 2019 Challenge"
                                    className="mr-2 mb-sm-0 mb-2"
                                />
                                <button type="submit">
                                    Find Event
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-5 col-12 ">
                        <ul className="">
                            <li>
                                <BecomePublisherButton className="mr-auto" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="mb-0 privacy-txt">
                            Privacy Policy, Terms
                        </p>
                    </div>
                </div>
            </div>
            {/*<PreLoader openClose={true} />*/}
        </footer>
    );
}

export default FooterComponent;
