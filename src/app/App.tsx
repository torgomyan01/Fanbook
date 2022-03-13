import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import 'utils/fontawesome';
import 'features/upload-photos/index.css';
// styles
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap/dist/react-bootstrap.js';
import 'assets/fonts/saasuma-icons/style.css';
import 'assets/css/fontawesome.css';
import 'assets/css/general.css';
import 'assets/css/responsive.css';
import 'assets/css/hover.css';
import 'react-image-crop/dist/ReactCrop.css';
import 'assets/css/create-event.css';
import EventDetail from 'pages/event-detail/event-detail';
import LandingPage from 'pages/landing-page';
import PublisherLandingPage from 'pages/publisher/landing-page';
import SearchEvent from 'pages/search-event';
import { setMyPlans, setSetAllPlans, setUser } from 'redux/auth.slice';
import Settings from 'pages/settings';
import SearchResult from 'pages/search-result';
import Album from 'pages/album';
import Library from 'pages/library';
import { getToken, ScrollToTop, SearchResultPageLS } from 'utils/helpers';
import MyDashboard from 'pages/my-dashboard';
import PublisherProfile from 'pages/publisher-profile';
import EditProfile from 'pages/edit-publier-empty';
import EditPublisherComplete from 'pages/edit-publisher-complete';
import VaucherCreate from 'pages/vaucher-create';
import VaucherManagment from 'pages/vaucher-managment';
import FpEventsList from 'pages/fp-events-list-view';
import Serp from 'pages/serp';
import Events from 'pages/events';
import Transition from 'pages/transition';
import PreOrder from 'pages/pre-order';
import NoPreOrder from 'pages/no-preorder';
import PreviousOrders from 'pages/previous-orders';
import FolderView from 'pages/folder-view';
import EmbeddableSettings from 'pages/embeddable-settings';
import EditCovers from 'pages/edit-covers';
import { closeSearch } from 'redux/search-result-page';

// for admin
import AdminLogin from 'admin/admin-login';
import AdminBookList from 'admin/admin-book-list';
import Shipping from 'pages/shipping';
import PreviewImage from 'features/preview-image';
import { SignUpPublisherContainer } from 'pages/sign-up-publisher/sign-up-publisher';
import { ALL_URL } from 'utils/urls';
import CreateBook from 'pages/create-book';
import MyLibrary from '../pages/my-library';
import AlertSite from '../features/alert/alert';
import BookPreview from 'pages/cover-preview';
import CheckoutBlock from 'features/checkout-block';
import Billing from 'pages/billing';
import EditorPosterPage from 'pages/create-book/Components/Posters/components/editor-poster-page';
import PosterPreview from 'pages/poster-preview';
import MyDrafts from '../pages/my-drafts';
import SignModal from '../pages/sign-modal/components/sign-modal';
import { GetAllPlansSettings } from '../api/all-apis';
import { decodingString, encodeString } from '../utils/codingDecoding';
import UpgradeModal from '../features/upgrade-modal/upgrade-modal';
import ModalUserMessagesForPan from '../features/modal-user-messages-for-pan/modal-user-messages-for-pan';
import { EditPublisherInformation } from '../pages/edit-publisher-information/sign-up-publisher';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: IAuth) => state.sign.user.isLoggedIn
    );

    useEffect(() => {
        dispatch(closeSearch(SearchResultPageLS));
    }, []);

    const userStorage: any = localStorage.getItem('user');
    const Profile: UserInfo = JSON.parse(userStorage);
    const token = getToken();

    useEffect(() => {
        if (token && Profile) {
            dispatch(
                setUser({
                    profile: Profile,
                    token
                })
            );
        }
    }, [Profile, token]);

    return (
        <>
            <ScrollToTop />
            <div id="app">
                {isLoggedIn ? (
                    <Route exact path={ALL_URL.HOME} component={SearchEvent} />
                ) : (
                    <Route exact path={ALL_URL.HOME} component={LandingPage} />
                )}
                <Route path={ALL_URL.EVENT} exact component={EventDetail} />

                <Route path={ALL_URL.ALBUM} exact component={Album} />
                <Route
                    path={ALL_URL.PUBLISHER}
                    exact
                    component={PublisherLandingPage}
                />

                <Route path={ALL_URL.SETTINGS} exact component={Settings} />
                <Route
                    exact
                    path={ALL_URL.MY_DASHBOARD}
                    component={MyDashboard}
                />
                <Route
                    exact
                    path={ALL_URL.PUBLISHER_PROFILE}
                    component={PublisherProfile}
                />
                <Route
                    exact
                    path={ALL_URL.EDIT_PROFILE}
                    component={EditProfile}
                />
                <Route
                    exact
                    path={ALL_URL.PROFILE}
                    component={EditPublisherComplete}
                />
                <Route
                    exact
                    path={ALL_URL.VAUCHER_CREATE}
                    component={VaucherCreate}
                />
                <Route
                    exact
                    path={ALL_URL.VAUCHER_MANAGMENT}
                    component={VaucherManagment}
                />
                <Route exact path={ALL_URL.PRE_ORDER} component={PreOrder} />
                <Route
                    exact
                    path={ALL_URL.NO_PREORDER}
                    component={NoPreOrder}
                />
                <Route path={ALL_URL.EDIT_BOOK} component={EditCovers} />
                <Route
                    exact
                    path={ALL_URL.FP_EVENT_LIST}
                    component={FpEventsList}
                />
                <Route
                    exact
                    path={ALL_URL.CREATE_BOOK}
                    component={CreateBook}
                />
                <Route
                    exact
                    path={ALL_URL.EDITOR_POSTER_PAGE}
                    component={EditorPosterPage}
                />
                <Route exact path={ALL_URL.MY_LIBRARY} component={MyLibrary} />
                <Route exact path={ALL_URL.SEARCH} component={SearchResult} />
                <Route exact path={ALL_URL.LIBRARY} component={Library} />

                <Route exact path={ALL_URL.SERP} component={Serp} />
                <Route path={ALL_URL.SEARCH_EVENTS} component={Events} />
                <Route path={ALL_URL.TRANSITION} component={Transition} />
                <Route path={ALL_URL.COVER_PREVIEW} component={BookPreview} />
                <Route
                    path={ALL_URL.POSTER_PREVIEW}
                    component={PosterPreview}
                />

                <Route
                    path={ALL_URL.PREVIOUS_ORDERS}
                    component={PreviousOrders}
                />
                <Route path={ALL_URL.BILLING} component={Billing} />
                <Route path={ALL_URL.FOLDER_VIEW} component={FolderView} />
                <Route
                    path={ALL_URL.EMBEDDABLE_SETTINGS}
                    component={EmbeddableSettings}
                />
                <Route path={ALL_URL.ADMIN} component={AdminLogin} />
                <Route
                    path={ALL_URL.ADMIN_BOOK_LIST}
                    component={AdminBookList}
                />
                <Route path={ALL_URL.SHIPPING} component={Shipping} />
                <Route
                    path={ALL_URL.SIGN_UP_PUBLISHER}
                    component={SignUpPublisherContainer}
                />
                <Route path={ALL_URL.MY_DRAFTS} component={MyDrafts} />
                <Route
                    path={ALL_URL.EDIT_PUBLISHER_INFORMATION}
                    component={EditPublisherInformation}
                />
            </div>

            <div id="modal-container" />
            <PreviewImage />
            <AlertSite />
            <SignModal />
            {isLoggedIn && (
                <>
                    <CheckoutBlock />
                    <UpgradeModal />
                    <ModalUserMessagesForPan />
                </>
            )}
        </>
    );
}

export default App;
