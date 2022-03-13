import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_NAMES } from '../settings/tab-names';
import { setTabName } from 'redux/create-book';
import { useParams } from 'react-router-dom';

function TabHeader() {
    const dispatch = useDispatch();
    const tabNameRedux = useSelector(
        (state: ICreateBook) => state.CreateBook.tabValue
    );
    const useInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const { tabName }: { tabName: string } = useParams();

    useEffect(() => {
        if (tabName === TAB_NAMES.BOOK) {
            dispatch(setTabName(TAB_NAMES.BOOK));
        }
        if (tabName === TAB_NAMES.POSTERS) {
            dispatch(setTabName(TAB_NAMES.POSTERS));
        }
        if (tabName === TAB_NAMES.DIGITAL) {
            dispatch(setTabName(TAB_NAMES.DIGITAL));
        }
    }, [dispatch, tabName]);

    function setBook() {
        dispatch(setTabName(TAB_NAMES.BOOK));
    }

    function setPosters() {
        dispatch(setTabName(TAB_NAMES.POSTERS));
    }

    function setDigital() {
        dispatch(setTabName(TAB_NAMES.DIGITAL));
    }

    return (
        <div className="tab-header">
            <div className="container-fluid wrapper1 ">
                <div className="row">
                    <div className="col-12">
                        <ul className="nav nav-tabs d-flex justify-content-center">
                            {thisEvent.userId === useInfo?.id && (
                                <>
                                    <li
                                        className="nav-item cursor-pointer"
                                        onClick={setBook}>
                                        <span
                                            className={
                                                tabNameRedux === TAB_NAMES.BOOK
                                                    ? 'nav-link f-omnesMedium active'
                                                    : 'nav-link f-omnesMedium'
                                            }>
                                            Books
                                        </span>
                                    </li>
                                    <li
                                        className="nav-item cursor-pointer"
                                        onClick={setPosters}>
                                        <span
                                            className={
                                                tabNameRedux ===
                                                TAB_NAMES.POSTERS
                                                    ? 'nav-link f-omnesMedium active'
                                                    : 'nav-link f-omnesMedium'
                                            }>
                                            posters
                                        </span>
                                    </li>
                                </>
                            )}

                            <li
                                className="nav-item cursor-pointer"
                                onClick={setDigital}>
                                <span
                                    className={
                                        tabNameRedux === TAB_NAMES.DIGITAL
                                            ? 'nav-link f-omnesMedium active'
                                            : 'nav-link f-omnesMedium'
                                    }>
                                    digital
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabHeader;
