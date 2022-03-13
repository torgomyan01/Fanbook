import {
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';

import SignReducer from '../redux/auth.slice';
import EventReducer from '../redux/events.slice';
import editFolderImages from '../redux/edit-folder-images.slice';

import ModalInviteEvent from '../redux/ModalInvite.slice';
import EditCover from '../redux/edit-cover';
import SearchResultPage from '../redux/search-result-page';
import ModalAdminPage from '../redux/admin-site';
import AllModalSiteTwo from '../redux/modals';

import ViewImageModal from '../redux/preveiw-image';
import editImage from '../redux/edit-image';
import Library from '../redux/library';
import EditFolder from '../redux/edit-folder';
import DeleteFolder from '../redux/delete-folder';
import EditEditPhotos from '../redux/edit-photos';
import CreateBook from '../redux/create-book';
import Posters from '../redux/posters';
import AlertSite from '../redux/alert-site';
import MyDashboard from '../redux/my-dashboard';
import ThisBook from '../redux/edit-book';
import MyEventPage from '../redux/my-event.page';
import GoogleFonts from '../redux/google-fonts';
import PublisherProfile from '../redux/publisher-profile';
import SiteCard from '../redux/site-card';
import BecomePublisher from '../redux/become-publisher';
import EditAlbum from '../redux/edit-album';
import Shipping from '../redux/shipping';
import regLogin from '../redux/login-reg-user';
import EditPublisherInfo from '../redux/edit-pablisher-information';

const reducers = combineReducers({
    sign: SignReducer,
    editCover: EditCover,
    adminSite: ModalAdminPage,
    searchResultPageK: SearchResultPage,
    events: EventReducer,
    Library,
    // editImage: editImageReducer,
    ModalInviteEvent,
    AllModalSiteTwo,
    ViewImageModal,
    editImage,
    EditEditPhotos,
    EditFolder,
    EditAlbum,
    DeleteFolder,
    CreateBook,
    MyDashboard,
    Posters,
    AlertSite,
    ThisBook,
    editFolderImages,
    MyEventPage,
    PublisherProfile,
    GoogleFonts,
    SiteCard,
    BecomePublisher,
    Shipping,
    regLogin,
    EditPublisherInfo
});

export default configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.config.transformRequest']
        }
    })
});
