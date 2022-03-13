import axios from 'axios';
import { API_URL } from 'utils/const';
import { defImage } from './creating-book-default-data';
import { googleFontUrl } from '../utils/google';
import CheckTokenExpiration from '../features/for-token/token-helper';
import Cookies from 'js-cookie';
import { history, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { ALL_URL } from 'utils/urls';
import store from '../app/store';
import { AlertSiteTypes } from 'enums/enums';
import { logOut } from 'redux/auth.slice';

const amazonS3URL1 = process.env.REACT_APP_AMAZON_S3_FILE_URL;
const amazonS3URL2 = process.env.REACT_APP_AMAZON_S3_FILE_TEST_URL;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(async function (conf) {
    let access_token = Cookies.get('access_token');
    await CheckTokenExpiration(function (newToken: string) {
        if (newToken !== '') {
            access_token = newToken;
        }
    });
    conf.headers['Authorization'] = `Bearer ${access_token}`;
    if (conf.url === amazonS3URL1 || conf.url === amazonS3URL2) {
        delete conf.headers.Authorization;
    }
    return conf;
});

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        err?.response?.data?.message &&
            store.dispatch(
                setMessageUser([
                    err?.response?.data?.message,
                    AlertSiteTypes.warning
                ])
            );
        if (err?.response?.data?.message === 'Unauthorized') {
            window.location.href = ALL_URL.HOME;
        }

        if (err?.response?.data?.message.includes('token has expired')) {
            store.dispatch(logOut());
            Cookies.remove('access_token');
            Cookies.remove('id_token');
            Cookies.remove('refresh_token');
            history.push('/');
        }

        return err;
    }
);
// REGISTER USER
export const userRegister = (data: object) => {
    return axios.post(API_URL.REGISTRATION, data);
};

// CONFIRM USER REGISTER
export const ConfirmUserRegister = (data: object) => {
    return axios.post(API_URL.CONFIRM, data);
};

// GET PUBLIC EVENTS
export const getPublicEvents = (data: object) => {
    return axios.get(API_URL.PUBLIC_EVENT, {
        params: { ...data }
    });
};

export const AllRequestsEventPublic = (eventID: string, params: object) => {
    return axios.get(`${API_URL.PUBLIC_EVENT}/${eventID}`, {
        params: { ...params }
    });
};

export const AllRequestsEventPrivate = (eventID: string, params: object) => {
    return axios.get(`${API_URL.USER_EVENT}/${eventID}`, {
        params: { ...params }
    });
};

// GET MY EVENTS
export const AllRequestsForMyEvents = (params: object) => {
    return axios.get(API_URL.USER_EVENT, {
        params: { ...params }
    });
};

export const BecomePublisher = (data: object) => {
    return axios.post(`${API_URL.PUBLISHERS}/join`, {
        publisherProfile: { ...data }
    });
};

// FOR REMOVE COVER PUBLISHER
export const UpdateProfilePublisher = (data: object) => {
    return axios.patch(`${API_URL.SETTINGS}/profile`, data);
};

// GET ALBUM
export const GetAlbum = (albumID: string, data: object) => {
    return axios.get(`${API_URL.ALBUM}/${albumID}`, {
        params: { ...data }
    });
};

// REMOVE ALBUM IMAGE
export const DeleteImage = (albumID: string, data: object) => {
    return axios.delete(`${API_URL.ALBUM}/${albumID}/files`, {
        params: data
    });
};

// GET ALBUMS LIST
export const GetAlbumList = (data: object) => {
    return axios.get(API_URL.ALBUM, {
        params: { ...data }
    });
};

// GET BOOK LIST
export const GetAllBooks = (data: object) => {
    return axios.get(API_URL.BOOK, {
        params: { ...data }
    });
};

// GET BOOK LIST
export const CloneBook = (bookID: string) => {
    return axios.post(`${API_URL.BOOK}/${bookID}/clone`);
};

// GET POSTER LIST
export const GetAllPoster = (data: object) => {
    return axios.get(API_URL.POSTERS, {
        params: { ...data }
    });
};

// GET ALBUM
export const GetAlbumFiles = (albumID: string, data: object) => {
    return axios.get(`${API_URL.ALBUM}/${albumID}/files`, {
        params: { ...data }
    });
};

// UPDATE ALBUM FILE ALBUM
export const UpdateAlbumFile = (data: object) => {
    return axios.post(API_URL.TEMP, data);
};

// TMP ADD FILE
export const TmpAddFile = (albumID: string, fileId: string) => {
    return axios.patch(`${API_URL.ALBUM}/${albumID}/files/${fileId}`);
};

// GET DELETED ALBUMS
export const GetDeletedAlbums = () => {
    return axios.get(`${API_URL.ALBUM}/deleted`);
};

// GET ALL BLOCKS
export const getBook = (id: string) => {
    return axios.get(`${API_URL.BOOK}/${id}`);
};

// GET USER INFO
export const getUserInfo = (tokenForLogin: string) => {
    return axios.get(API_URL.USER_DATA, {
        headers: {
            Authorization: `Bearer ${tokenForLogin}`
        }
    });
};

// GET ALL FILES TO CURRENT EVENT
export const getEventAllAlbumFiles = (
    eventID: string,
    limit: string,
    album_file: boolean,
    album_files_count: boolean,
    album_file_likes: boolean,
    album_file_likes_count: boolean
) => {
    const AlbumFiles = album_file ? '&append[]=AlbumFiles' : '';
    const AlbumFilesCount = album_files_count
        ? '&append[]=AlbumFilesCount'
        : '';
    const appendParams =
        limit === 'all' ? '' : `&appendParams[AlbumFiles][limit]=${limit}`;
    const AlbumFileLikes = album_file_likes ? '&append[]=AlbumFileLikes' : '';
    const AlbumFileLikesCount = album_file_likes_count
        ? '&append[]=AlbumFileLikesCount'
        : '';

    return axios.get(
        `${API_URL.PUBLIC_EVENT}/${eventID}?${AlbumFiles}${AlbumFilesCount}${appendParams}${AlbumFileLikes}${AlbumFileLikesCount}`
    );
};

// GET IMAGE
export const getImage = (imageUrl: string) => {
    return axios.get(imageUrl, {
        transformRequest: (data, headers) => {
            delete headers.common['Authorization'];
        }
    });
};

// DELETE BOOK
export const DeleteBook = (bookID: string) => {
    return axios.delete(`${API_URL.BOOK}/${bookID}`);
};

// DELETE BOOK
export const DeleteAlbum = (albumID: string) => {
    return axios.delete(`${API_URL.ALBUM}/${albumID}`);
};

// EDIT BOOK
export const EditBook = (bookID: string, data: any) => {
    return axios.patch(`${API_URL.BOOK}/${bookID}`, data);
};

// EDIT BOOK
export const GetPublisherFrom = () => {
    return axios.get(`${API_URL.PUBLISHERS}/form`);
};

// UPDATE PUBLISHER INFORMATION
export const UpdatePublisherInformation = (data: object) => {
    return axios.patch(`${API_URL.PUBLISHERS}/profile`, data);
};

// GET ALL TEMPLATE BOOK
export const deleteEvent = (eventID: string) => {
    return axios.delete(`${API_URL.USER_EVENT}/${eventID}`);
};

// CREATE BOOK TO EVENT
export const createBook = (data: any) => {
    return axios.post(API_URL.BOOK, data);
};

export const getSizesBook = () => {
    return axios.get(API_URL.BOOK_SIZES);
};

// VIEW SEARCH RESULT
export const viewSearchResult = (params: object) => {
    return axios.get(API_URL.PUBLIC_SEARCH, { params: { ...params } });
};

// CREATE ALBUM EVENT
export const createAlbum = (data: object) => {
    return axios.post(API_URL.ALBUM, data);
};

// ADD LINE ALBUM IMAGES
export const addLikeAlbumImages = (albumID: string, ImagesID: string) => {
    return axios.post(`${API_URL.ALBUM}/${albumID}/files/${ImagesID}/like`);
};

// ADD LINE ALBUM IMAGES
export const RemoveLikeAlbumImages = (albumID: string, ImagesID: string) => {
    return axios.delete(`${API_URL.ALBUM}/${albumID}/files/${ImagesID}/like`);
};

// DELETE ALBUM
export const deleteAlbum = (albumID: string) => {
    return axios.delete(`${API_URL.ALBUM}/${albumID}`);
};

// RETURN REMOVED ALBUM
export const returnRemoveAlbum = (albumID: string) => {
    return axios.patch(`${API_URL.ALBUM}/deleted/${albumID}`);
};

// GET ALL TEMPLATE BOOK
export const getAllTemplates = () => {
    return axios.get(`${API_URL.TEMPLATES}/pages`);
};

// CREATE BOOK PAGE
export const creatingPage = async (bookId: string) => {
    let templateID = '';

    await getAllTemplates().then((res) => {
        templateID = res.data.data.items[0].id;
    });
    return axios.post(`${API_URL.BOOK}/${bookId}/pages`, {
        templateId: templateID,
        params: {
            template: {
                style: ''
            },
            images: {
                style: '',
                items: [
                    {
                        tag: 'image0',
                        style: `background-image: url(${defImage}); background-repeat: no-repeat; background-position:center; background-size: 13%;`,
                        texts: []
                    }
                ]
            },
            texts: []
        }
    });
};

// GET ALL PAGES BOOK
export const getAllPagesBook = (bookId: string) => {
    return axios.get(`${API_URL.BOOK}/${bookId}/pages`);
};

// CREATE EVENT
export const createEvent = (data: object) => {
    return axios.post(API_URL.USER_EVENT, data);
};

// UPLOAD EVENT VIDEO
export const uploadVideoEvent = (eventId: string, videoName: string) => {
    return axios.post(`${API_URL.USER_EVENT}/${eventId}/video`, {
        name: videoName
    });
};

// START UPLOADED VIDEO AMAZON
export const startUploadingVideoAmazon =
    (amazonUrl: string, formData: any) => (dispatch: any) => {
        delete axios.defaults.headers.common['Authorization'];
        axios
            .post(amazonUrl, formData, {
                onUploadProgress(progressEvent) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    dispatch(setMessageUser(UM.UPLOADED(percentCompleted)));
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function () {
                dispatch(setMessageUser(UM.EVENT_EDITED));
                window.location.reload();
            });
    };

// EDIT EVENT INFORMATION
export const EditEvent = (eventId: string, data: any) => {
    return axios.patch(`${API_URL.USER_EVENT}/${eventId}`, data);
};

// EDIT ALBUM INFORMATION
export const EditAlbum = (albumId: string, data: any) => {
    return axios.patch(`${API_URL.ALBUM}/${albumId}`, data);
};

// UPLOAD FILE ALBUM
export const UploadFileAlbum = (folderID: string, data: any) => {
    return axios.post(`${API_URL.ALBUM}/${folderID}/files`, data);
};

// LOGIN USER TO GOOGLE
export const LoginUSerGoogle = (token: string) => {
    return axios.get(API_URL.USER_DATA, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// SAVE INFORMATION CHANGES USER
export const UserInformationSave = (data: any) => {
    return axios.patch(API_URL.USER_DATA, data);
};

// GET GOOGLE ALL FONTS
export const getGoogleFont = () => {
    return axios.get(googleFontUrl);
};

// UPDATE PAGE BOOK
export const UpdatePageBook = (bookID: string, pageID: string, data: any) => {
    return axios.patch(`${API_URL.BOOK}/${bookID}/pages/${pageID}`, data);
};

// UPDATE PAGE BOOK BATCH
export const UpdatePageBookBatch = (bookID: string, data: any) => {
    return axios.post(`${API_URL.BOOK}/${bookID}/pages/batch`, data);
};

// DELETE PAGE BOOK
export const RemovePageBook = (bookID: string, pageID: string) => {
    return axios.delete(`${API_URL.BOOK}/${bookID}/pages/${pageID}`);
};

// DELETE AVATAR IMAGE SETTINGS PAGE
export const DeleteAvatarSetting = () => {
    return axios.delete(API_URL.AVATAR);
};

// UPLOAD AVATAR USER SETTINGS PAGE
export const UploadAvatarSetting = (data: any) => {
    return axios.patch(API_URL.USER_DATA, data);
};

// GET PUBLISHER INFORMATION
export const GetPublisher = (publisherID: string) => {
    return axios.get(`${API_URL.PUBLISHER}/${publisherID}`);
};

// UPLOAD FILES AMAZON S3
export const UploadFileAmazonS3 = (amazonUrl: string, formData: any) => {
    return axios.post(amazonUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// UPLOAD COVER BOOK
export const uploadCoverBook = (bookID: string, data: any) => {
    return axios.post(`${API_URL.BOOK}/${bookID}/front-cover`, data);
};

// UPLOAD BACK BOOK
export const uploadBackBook = (bookID: string, data: any) => {
    return axios.post(`${API_URL.BOOK}/${bookID}/back-cover`, data);
};

// GET USER EVENT POSTERS
export const GetUserEventPosters = (eventID: string) => {
    return axios.get(`${API_URL.USER_EVENT}/${eventID}/posters`);
};

// CREATE POSTER
/**
 *
 * @param data
 * @constructor
 */
export const CreatePoster = (data: any) => {
    return axios.post(API_URL.POSTERS, data);
};

// UPDATE POSTER
/**
 *
 * @param posterID
 * @param data
 * @constructor
 */
export const UpdatePoster = (posterID: string, data: any) => {
    return axios.patch(`${API_URL.POSTERS}/${posterID}`, data);
};

// GET POSTER
/**
 *
 * @param posterID
 * @constructor
 */
export const GetPosters = (posterID: string) => {
    return axios.get(`${API_URL.POSTERS}/${posterID}`);
};

// GET MY DASHBOARD
export const GetMyDashboard = () => {
    return axios.get(API_URL.DASHBOARD);
};

// GET POSTER TEMPLATES
export const GetPosterTemplate = () => {
    return axios.get(`${API_URL.TEMPLATES}/posters`);
};

// DELETE POSTER
export const RemovePoster = (id: string) => {
    return axios.delete(`${API_URL.POSTERS}/${id}`);
};

// GET CART PRODUCT
export const GetCardProducts = () => {
    return axios.get(`${API_URL.ORDERS}/cart`);
};

// GET USER ALL ADDRESS
export const GetAllAddressUser = () => {
    return axios.get(`${API_URL.SETTINGS}/addresses`);
};

// CREATE SHIPPING ADDRESS
export const CreateAddress = (data: object) => {
    return axios.post(`${API_URL.SETTINGS}/addresses`, data);
};

// UPDATE ADDRESS SHIPPING
export const UpdateShippingAddress = (data: object, id: string) => {
    return axios.patch(`${API_URL.SETTINGS}/addresses/${id}`, data);
};

// CREATE SHIPPING ADDRESS
export const RemoveAddress = (id: string) => {
    return axios.delete(`${API_URL.SETTINGS}/addresses/${id}`);
};

// CREATE PAYMENT METHODS
export const CreatePaymentsMethods = (data: object) => {
    return axios.post(`${API_URL.SETTINGS}/payment-methods`, data);
};

// GET PAYMENTS METHODS
export const GetPaymentsMethods = () => {
    return axios.get(`${API_URL.SETTINGS}/payment-methods`);
};

// REMOVE PAYMENTS METHODS
export const RemovePaymentsMethods = (paymentsMethodID: string) => {
    return axios.delete(
        `${API_URL.SETTINGS}/payment-methods/${paymentsMethodID}`
    );
};

// UPDATE CARD INFORMATION
export const UpdateCardInformation = (data: object) => {
    return axios.patch(`${API_URL.ORDERS}/cart`, data);
};

// CONFIRM CARD
export const ConfirmCard = () => {
    return axios.post(`${API_URL.ORDERS}/cart/confirm`);
};

// GET MY ORDERS
export const GetOrder = (params: object) => {
    return axios.get(API_URL.ORDERS, {
        params
    });
};

// GET MY ORDER
export const GetOneOrder = (orderID: string) => {
    return axios.get(`${API_URL.ORDERS}/${orderID}`);
};

// ADD PRODUCT TO CART
export const AddProductToCart = (data: object) => {
    return axios.post(`${API_URL.ORDERS}/cart/items`, data);
};

// ADD PRODUCT TO CART ALL IMAGES FROM EVENT
export const AddAllImagesEventToCart = (data: object) => {
    return axios.post(`${API_URL.ORDERS}/cart/items/group`, data);
};
// GET PUBLISHER ORDERS
export const GetPublisherOrders = (params: object) => {
    return axios.get(`${API_URL.ORDERS}/publisher-items`, {
        params: { ...params }
    });
};

// ADD PRODUCT TO CART
export const RemoveProductToCart = (data: object) => {
    return axios.delete(`${API_URL.ORDERS}/cart/items`, { data });
};

export const UpdateProductToCart = (data: object) => {
    return axios.patch(`${API_URL.ORDERS}/cart/items/qty`, data);
};

export const GetTransactions = (params: object) => {
    return axios.get(API_URL.TRANSACTIONS, { params: { ...params } });
};

export const GetAllPlansSettings = () => {
    return axios.get(`${API_URL.SETTINGS}/plans`);
};

export const ChangePlanUser = (data: object) => {
    return axios.post(`${API_URL.SETTINGS}/plans/change`, data);
};

export const CancelPlanUser = () => {
    return axios.post(`${API_URL.SETTINGS}/plans/cancel`);
};

export const DownloadFile = (data: object) => {
    return axios.post(API_URL.DOWNLOADS, data);
};

//--------------------------------------------->>>>>>> FOR ADMIN <<<<<<<<<----------------------------

// GET ADMIN ALBUMS
export const GetAdminAlbums = (params: object) => {
    return axios.get(API_URL.ADMIN_ALBUMS, {
        params: { ...params }
    });
};

export const GetTransactionsAdmin = (params: object) => {
    return axios.get(API_URL.ADMIN_TRANSACTIONS, { params: { ...params } });
};

export const GetUserAdmin = (id: string) => {
    return axios.get(`${API_URL.ADMIN_USER}/${id}`);
};

export const CreateOutTransaction = (data: object) => {
    return axios.post(API_URL.TRANSACTIONS, data);
};

// GET ADMIN BOOK
export const GetAdminBook = (params: object) => {
    return axios.get(API_URL.ADMIN_BOOKS, {
        params: { ...params }
    });
};

// GET ADMIN BOOK
export const GetAdminUsers = (params: object) => {
    return axios.get(API_URL.USERS, {
        params: { ...params }
    });
};
// GET ADMIN BOOK
export const GetAdminPublishers = (params: object) => {
    return axios.get(API_URL.ADMIN_PUBLISHERS, {
        params: { ...params }
    });
};

// DELETE USER
export const DeleteUser = (userID: string) => {
    return axios.delete(`${API_URL.DELETE_USERS}/${userID}`);
};

// UPDATE FAN INFO
export const UpdateFanInfo = (userID: string, data: object) => {
    return axios.patch(`${API_URL.USERS}/${userID}`, data);
};

// CREATE PUBLISHER USER
export const AdminCreatePublisher = (userID: string, data: object) => {
    return axios.post(`${API_URL.USERS}/${userID}/publisher`, data);
};

// UPDATE PUBLISHER INFORMATION
export const AdminUpdatePublisher = (userID: string, data: object) => {
    return axios.patch(`${API_URL.USERS}/${userID}/publisher`, data);
};

// SEARCH USER
export const AdminSearchUser = (data: object) => {
    return axios.get(`${API_URL.USERS}/search`, {
        params: data
    });
};

// GET ORDERS ADMIN
export const GetOrdersAdmin = (data: object) => {
    return axios.get(API_URL.ADMIN_ORDERS, {
        params: data
    });
};

// GO PRINT ORDER
export const GoPrintOrder = (orderID: string) => {
    return axios.post(`${API_URL.ADMIN_ORDERS}/${orderID}/print`);
};

// GO CONFIRM ORDER
export const GoConfirmOrder = (orderID: string) => {
    return axios.post(`${API_URL.ADMIN_ORDERS}/${orderID}/confirm`);
};
