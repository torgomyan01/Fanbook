import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { DEF_URL } from './urls';
import {
    addLikeAlbumImages,
    AddProductToCart,
    AllRequestsEventPrivate,
    AllRequestsEventPublic,
    GetAllPlansSettings,
    RemoveLikeAlbumImages,
    UploadFileAlbum,
    UploadFileAmazonS3
} from 'api/all-apis';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import moment from 'moment-timezone';
import { openAlert, setMessageAlert } from '../redux/alert-site';
import { allProducts, setNewCard } from 'redux/site-card';
import { AlertSiteTypes, UserLoginTypes } from 'enums/enums';
import { UM } from './user-messages';
import { albumFileT } from '../pages/create-book/Components/Digital/digital';
import {
    setMyPlans,
    setSetAllPlans,
    setUserLoginMethod
} from 'redux/auth.slice';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import fbLogo from 'assets/images/logoFb.png';
import { encodeString } from './codingDecoding';

export const LoginUser = {
    toSocial: 'toSocial',
    toSite: 'toSite'
};

export const userIsLogin = {
    becomePublisher: 'becomePublisher',
    normalLogin: 'normalLogin'
};

export const UploadAndEdit = {
    upload: 'upload',
    edit: 'edit',
    close: 'closed'
};

export const eventStatus = {
    public: 'public',
    private: 'private'
};

export const publisherGroups = {
    publisher: 'publisher',
    admin: 'admin'
};

export const productTypes = {
    official: 'official',
    user: 'user'
};

export const usersPlansStorage = 'usersPlansNameStorage';
export const plansKey = {
    basic: 'basic',
    pro: 'pro',
    agency: 'agency'
};

export const plans = [
    {
        name: 'Basic',
        key: plansKey.basic
    },
    {
        name: 'Pro',
        key: plansKey.pro
    },
    {
        name: 'Agency',
        key: plansKey.agency
    }
];

export const thisSizes = [
    {
        dimension: { width: 18, height: 24 },
        price: 25.5
    }
];

export const REMEMBER_USER_DAYS = 2;
export const INCH_ONE_PIXEL = 96;
export const MINIMISE_IMAGE_BLOCK = 1.5;
export const PK_TEST = process.env.REACT_APP_PK_TEST
    ? process.env.REACT_APP_PK_TEST
    : '';

export const BookEditorTextColors = [
    '#000',
    '#fff',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#607d8b'
];

export const setMessageUser = (message: string[]) => (dispatch: any) => {
    dispatch(
        openAlert({
            status: message[1],
            go: true
        })
    );
    dispatch(setMessageAlert(message[0] ? message[0] : ''));
};

export const randomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const eventUrlPublicPrivate = (event: IEvent | undefined) => {
    const userInfo: UserInfo = JSON.parse(
        localStorage.getItem('user') as string
    );
    if (userInfo && event?.userId === userInfo?.id) {
        return `${DEF_URL.EVENT}/${event?.id}/${eventStatus.private}`;
    } else {
        return event?.isAvailable
            ? `${DEF_URL.EVENT}/${event?.id}/${eventStatus.public}`
            : `${DEF_URL.EVENT}/${event?.id}/${eventStatus.private}`;
    }
};

export const DEFAULT_DATE = 'D MMM, h:mm A';
export const DEFAULT_DATE_AND_YEAR = 'D MMM, h:mm A, YYYY';

export const getData = (data: string, dataType: string, tz: any) => {
    return moment(data).tz(tz).format(dataType);
};

export const getEventDate = (event: IEvent) => {
    if (event) {
        const tz = moment.tz.guess();
        if (
            event.dateFrom === event.dateTo ||
            !event.dateFrom ||
            !event.dateTo
        ) {
            return getData(
                event.dateFrom || event.dateTo,
                DEFAULT_DATE_AND_YEAR,
                tz
            );
        } else {
            const yearDataFrom = moment(event.dateFrom).tz(tz).format('YYYY');
            const yearDataTo = moment(event.dateTo).tz(tz).format('YYYY');
            if (yearDataFrom === yearDataTo) {
                return `${getData(
                    event.dateFrom,
                    DEFAULT_DATE,
                    tz
                )} - ${getData(event.dateTo, DEFAULT_DATE_AND_YEAR, tz)}`;
            } else {
                return `${getData(
                    event.dateFrom,
                    DEFAULT_DATE_AND_YEAR,
                    tz
                )} - ${getData(event.dateTo, DEFAULT_DATE_AND_YEAR, tz)}`;
            }
        }
    }
    return '';
};

export const PASSWORD_LENGTH = 8;

export default function randomBackground() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const black = Math.floor(Math.random() * 255);
    return `rgb(${red} ${green} ${black})`;
}

export const keyGenerator = (length: number) => {
    let s = '';
    const randomchar = function () {
        const n = Math.floor(Math.random() * 62);
        if (n < 10) {
            return n;
        }
        if (n < 36) {
            return String.fromCharCode(n + 55);
        }
        return String.fromCharCode(n + 61);
    };
    while (s.length < length) {
        s += randomchar();
    }
    return s;
};
function token(key: string) {
    const allTokens = document.cookie.split(' ');
    return allTokens
        .find((tokens: string) => tokens.includes(key))
        ?.split('=')[1]
        .replace(/;/g, '');
}

export const getToken: any = () => {
    return token('access_token');
};
export const getRefreshToken: any = () => {
    return token('refresh_token');
};
export const getIdToken = () => {
    return token('id_token');
};
export const userProfile: any = () => {
    const users: any = localStorage.getItem('user');
    return JSON.parse(users);
};

export const SearchResultPageLS = localStorage.getItem('search-result-page')
    ? localStorage.getItem('search-result-page')
    : 'true';

const openCloseMap: any = localStorage.getItem('open-close-map');
export const openCloseMapStorage = localStorage.getItem('open-close-map')
    ? JSON.parse(openCloseMap)
    : false;

export const history = createBrowserHistory();

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export const checkIsEditable = (userId: string) => {
    const token_: any = getToken();
    if (!token_) {
        return false;
    }
    const decodedToken: any = getToken() && jwt_decode(token_);
    return decodedToken?.sub === userId;
};

export const getUsernameFromToken = () => {
    const token: any = getToken();
    if (token) {
        const decodedToken: any = jwt_decode(token);
        return decodedToken.sub;
    }
    return '';
};
export const checkAccessTokenIsValid = () => {
    const decodedToken: any = getToken() && jwt_decode(getToken());
    return moment().unix() < decodedToken?.exp - 60;
};

export const validateEmail = (email: string) => {
    return email.length > 5 && email.indexOf('@') > 0;
};

export const startPromise = (files: any, res: any) => {
    Promise.all(files).then(function (results: any) {
        res(results);
    });
};

export const userAvatarName = (userInfo: UserInfo | null | undefined) => {
    if (userInfo?.avatarURL || userInfo?.avatarURL !== null) {
        return '';
    } else {
        return (
            userInfo?.firstName &&
            userInfo?.lastName &&
            `${userInfo?.firstName[0]?.toLocaleUpperCase()}${userInfo?.lastName[0]?.toLocaleUpperCase()}`
        );
    }
};

export const PrintPublisherName = (userInfo: UserInfo | null | undefined) => {
    if (
        userInfo?.publisherProfile?.avatarURL ||
        userInfo?.publisherProfile?.avatarURL !== null
    ) {
        return '';
    } else {
        return (
            userInfo?.publisherProfile.name &&
            userInfo?.publisherProfile.name[0]?.toLocaleUpperCase()
        );
    }
};

export const userEvent = (events: IEvent[], userId: string, result: any) => {
    const userEvents = events.filter((e: IEvent) => e.userId === userId);
    result(userEvents);
};
export const countryFlag = (e: any) => {
    const code = e?.geolocation ? e?.geolocation.countryCode : 'AM';
    return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
};

export const countryFlagForPublisherPage = (e: any) => {
    return `https://flagcdn.com/w20/${e.toLowerCase()}.png`;
};

// FIND STYLES TO VIEW NUMBERS
export const findOneTextEditorStyle = (styles: any, styleName: string) => {
    const currentStyle = styles.find(
        (st: { key: string; value: string }) => st.key === styleName
    );
    return currentStyle ? currentStyle.value : '0';
};

// FOND FONT TO STYLES
export const findOneTextEditorStyleTexts = (
    styles: any,
    styleName: string,
    defaultName: string
) => {
    const currentStyle = styles.find(
        (st: { key: string; value: string }) => st.key === styleName
    );
    return currentStyle ? currentStyle.value : defaultName;
};

export const findStyleParameters = (AllStyle: string) => {
    const NewAllStyles: any = [];
    const styleArray = AllStyle?.split(';');

    styleArray?.map((style: string) => {
        const newStyle = style.split(':');
        NewAllStyles.push({
            key: newStyle[0]?.replace(/ /g, ''),
            value: newStyle[1]
        });
    });
    return {
        height: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'height')
        ),
        left: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'left')
        ),
        width: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'width')
        ),
        borderColor: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'border-color')
        ),
        borderWidth: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'border-width')
        ),
        borderStyle: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'border-style')
        ),
        top: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'top')
        ),
        transform: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'transform')
        ),
        lineHeight: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'line-height')
        ),
        letterSpacing: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'letter-spacing')
        ),
        backgroundImage: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'background-image')
        ),
        fontSize: removeAllSablesStyleValue(
            findOneTextEditorStyle(NewAllStyles, 'font-size')
        ),
        fontFamily: findOneTextEditorStyleTexts(
            NewAllStyles,
            'font-family',
            'sans-serif'
        ),
        color: findOneTextEditorStyleTexts(NewAllStyles, 'color', '#fff'),
        backgroundColor: findOneTextEditorStyleTexts(
            NewAllStyles,
            'background-color',
            '#000'
        )
    };
};

function removeAllSablesStyleValue(value: string) {
    return value
        ?.replace(/ /g, '')
        .replace(/([*+?^=%!:${}()|\\[\]/])/g, '')
        .replace(/[a-z]/g, '');
}

export const findStyleBackground = (AllStyle: string) => {
    const styleArray = AllStyle.split(';');
    const currentStyle = styleArray.find((style: string) =>
        style.includes('background-color')
    );
    if (currentStyle) {
        const styleKey = currentStyle.split(':')[0];
        const styleValue = currentStyle.split(':')[1];
        return {
            key: styleKey,
            value: styleValue
        };
    } else {
        return {
            key: 'background-color',
            value: '#fff'
        };
    }
};

export const removeAllClass = () => {
    const blocks = window.document.getElementsByClassName('blocks');
    for (let i = 0; i < blocks.length; i++) {
        blocks.item(i)?.classList.remove('yes');
    }
};

export const AddDisabled = (className: string) => {
    const blocks = window.document.getElementsByClassName(className);
    for (let i = 0; i < blocks.length; i++) {
        blocks.item(i)?.classList.add('Disabled');
    }
};

export const RemoveDisabled = (className: string) => {
    const blocks = window.document.getElementsByClassName(className);
    for (let i = 0; i < blocks.length; i++) {
        blocks.item(i)?.classList.remove('Disabled');
    }
};

const rgbToHex = function (rgb: number) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = `0${hex}`;
    }
    return hex;
};

export const fullColorHex = function (r: number, g: number, b: number) {
    const red = rgbToHex(r);
    const green = rgbToHex(g);
    const blue = rgbToHex(b);
    return red + green + blue;
};

export const viewNumbersRbg = (rgb: string) => {
    return rgb
        ?.replace(/[a-z]/g, '')
        .replace(/\)/g, '')
        .replace(/\(/g, '')
        .replace(/ /g, '')
        .split(',');
};

export const openCloseEditor = (status: boolean) => {
    const middleMainBlock: any = document.getElementById('middle-main');
    // const headerBlockToEditorPagesView: any = document.getElementById(
    //     'header-block-to-editor-pages-view'
    // );
    const btnAddText = document.querySelectorAll('.btn-add-text');
    const EditButtonMaxBlock = document.querySelectorAll('.edit-max-block');

    if (status) {
        middleMainBlock.style.width = 'calc(100% - 470px)';
        // headerBlockToEditorPagesView.style.width = '75%';
        btnAddText.forEach((AddTextBlock: any) => {
            AddTextBlock.style.display = 'none';
        });
        EditButtonMaxBlock.forEach((AddTextBlock: any) => {
            AddTextBlock.style.display = 'none';
        });
    } else {
        middleMainBlock.style.width = 'calc(100% - 120px)';
        // headerBlockToEditorPagesView.style.width = '100%';
        btnAddText.forEach((AddTextBlock: any) => {
            AddTextBlock.style.display = 'flex';
        });
        EditButtonMaxBlock.forEach((AddTextBlock: any) => {
            AddTextBlock.style.display = 'flex';
        });
    }
};

export const textCrop = (text: string | null | undefined, length: number) => {
    return text
        ? text.length > length
            ? `${text?.substring(0, length)}...`
            : text
        : '';
};

export const GetEventPublicPrivate = (
    eventID: string,
    status: string,
    data: object,
    result: any
) => {
    if (eventID !== '') {
        switch (status) {
            case eventStatus.public:
                AllRequestsEventPublic(eventID, { ...data }).then((res) => {
                    result(res);
                });
                break;
            case eventStatus.private:
                AllRequestsEventPrivate(eventID, { ...data }).then((res) => {
                    result(res);
                });
                break;
        }
    }
};

export const checkPublisher = (
    userID: string | null | undefined,
    pageID: string | null | undefined
) => {
    return userID ? userID === pageID : false;
};

// CROP IMAGE FROM PUBLISHER PAGE
export const CropImage = (image: any, canvas: any, crop: any) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.style.width = null;
    canvas.style.height = null;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
    );
    return ctx;
};

export const scrollToBlock = (blockID: string) => {
    const block = document.getElementById(blockID);
    setTimeout(() => {
        window.scrollTo({
            top: block?.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    }, 100);
};

export const getText = (IDName: string) => {
    const block = document.getElementById(IDName);
    return block ? block.innerText : '';
};

export const GetStyleImage = (imageURL: string, imgID: string) => {
    const block = document.getElementById(imgID);
    return block
        ? `background-image: url(${imageURL}); ${block.getAttribute('style')}`
        : '';
};

export const posterGetImageUrl = (style: string) => {
    return style
        ?.split(';')
        .find((st: string) => st.includes('background-image'))
        ?.replace(/background-image: url/g, '')
        ?.replace(/[(,)]/g, '');
};

export const viewUserStatus = (statusName: string) => {
    const userInfo = JSON.parse(localStorage.getItem('user') as string);
    return userInfo?.groups?.some((level: string) => level === statusName);
};

export const isUserLogin = (result: any = null) => {
    const isLogin = !!Cookies.get('access_token');
    result && result(isLogin);
    return isLogin;
};

export const userIsPublisher = (result: any = null) => {
    const userInfo = JSON.parse(localStorage.getItem('user') as string);
    const _user = userInfo !== null ? !!userInfo.publisherProfile : false;
    result && result(_user);
    return _user;
};

export const goToHome = () => {
    window.location.href = '/';
};

export const valueText = (value: number) => {
    return `${value}%`;
};

export const goToBuy =
    (
        productPublisherId: string | undefined,
        userId: string | undefined,
        params: object,
        result: any = null
    ) =>
    (dispatch: any) => {
        if (!isUserLogin()) {
            dispatch(setMessageUser(UM.BUY_PROD_NO_REG));
            dispatch(setUserLoginMethod(userIsLogin.normalLogin));
            dispatch(setOpenCloseModal(true));
            dispatch(setUseType(UserLoginTypes.signIn));
            return;
        }
        if (productPublisherId && userId) {
            const iAm = checkPublisher(productPublisherId, userId);
            if (iAm) {
                dispatch(setMessageUser(UM.NO_BOY_OWN));
                return;
            }
            dispatch(setMessageUser(UM.P_W));

            AddProductToCart({
                items: [{ ...params }]
            })
                .then((res) => {
                    result && result(res);
                    dispatch(setMessageUser(UM.PROD_ADDED_CARD));
                    dispatch(setNewCard(res.data.data.item.items.length));
                    dispatch(allProducts(res.data.data.item.items));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

export const removePosterStyles = (block: any) => {
    block.style.backgroundImage = null;
    block.style.width = null;
    block.style.height = null;
    block.style.transform = null;
};

export const responseError = (err: any) => (dispatch: any) => {
    if (err.response?.status === 415) {
        dispatch(
            setMessageUser([
                err?.response?.data?.validation,
                AlertSiteTypes.error
            ])
        );
    }
};

export const PrintCreateTime = (time: string) => {
    return moment(time).format('ll');
};

export const printEventNameAndDate = (item: any) => {
    return `(${item.userEvent.name}: ${getEventDate(item.userEvent)} -  ${
        item.userEvent.geolocation.country
    })`;
};

export const NAME_MIN_LENGTH = 5;
export const addErr = (val: string) => {
    return val === '' ? false : val.length > 0 && val.length < NAME_MIN_LENGTH;
};

export const likeAlbumFile = (img: IAlbumFiles, muLike: boolean, res: any) => {
    if (muLike) {
        RemoveLikeAlbumImages(img.albumId, img.id).then(() => {
            res && res(false);
        });
    } else {
        addLikeAlbumImages(img.albumId, img.id).then(() => {
            res && res(true);
        });
    }
};

export const filterAlbumImages = (
    albumFileTypes: string,
    images: IAlbumFiles[],
    res: any
) => {
    switch (albumFileTypes) {
        case albumFileT.showAll:
            res(images);
            break;
        case albumFileT.muFavorites:
            res(images.filter((albumFile: IAlbumFiles) => albumFile.isLiked));
            break;
        case albumFileT.onlyBought:
            res(images.filter((albumFile: IAlbumFiles) => albumFile.isBought));
            break;
        default:
            return [];
    }
};

export const getPlans = (Profile: UserInfo) => {
    GetAllPlansSettings()
        .then((res) => {
            const result = res.data.data.items || [];
            const encodingResult = encodeString(JSON.stringify(result));
            localStorage.setItem(usersPlansStorage, encodingResult);
            updateMyPlans(result, Profile);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateMyPlans =
    (result: IPlans[], Profile: UserInfo) => (dispatch: any) => {
        const MyPlan = result.find(
            (plan: IPlans) => plan.plan === Profile.plan
        );
        dispatch(setMyPlans(MyPlan));
        dispatch(setSetAllPlans(result));
    };

export const createImageCanvas = (
    imageSrc: string,
    width: number = 300,
    height: number = 300,
    useLogo: boolean = true
) => {
    return new Promise((res) => {
        const logo = new Image();
        logo.src = fbLogo;

        logo.onload = () => {
            const _image = new Image();
            _image.src = imageSrc;
            _image.onload = function () {
                let widthPercent = 0,
                    newHeight = 0;
                let heightPercent = 0,
                    newWidth = 0;
                const canvas = document.createElement('canvas');
                canvas.oncontextmenu = function (e) {
                    e.preventDefault();
                };
                if (_image.width > _image.height) {
                    widthPercent = (_image.height * 100) / _image.width;
                    newHeight = (height * widthPercent) / 100;
                    canvas.height = newHeight;
                    newWidth = width;
                } else {
                    heightPercent = (_image.width * 100) / _image.height;
                    newWidth = (width * heightPercent) / 100;
                    newHeight = height;
                }

                canvas.height = newHeight;
                canvas.width = newWidth;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(_image, 0, 0, newWidth, newHeight);
                    useLogo &&
                        ctx.drawImage(
                            logo,
                            canvas.width - logo.naturalWidth - 10,
                            canvas.height - logo.naturalHeight - 10
                        );
                    res(canvas);
                }
            };
        };
    });
};

export const startUploadFiles = (
    albumID: string,
    name: any,
    file: any,
    index: number,
    array: any[]
) => {
    UploadFileAlbum(albumID, {
        name
    }).then((res) => {
        fetch(file)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], name, {
                    type: 'image/png'
                });

                const formData = new FormData();
                Object.keys(res.data.data.fields).forEach((key) => {
                    formData.append(key, res.data.data.fields[key]);
                });
                formData.append('file', file);

                UploadFileAmazonS3(res.data.data.url, formData).then(() => {
                    if (index === array.length - 1) {
                        window.location.reload();
                    }
                });
            });
    });
};
