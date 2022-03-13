import React, {
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import WhiteLogo from 'assets/images/logo.png';
import BlackLogo from 'assets/images/black-logo.png';
import 'assets/css/header.style.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setError, setUserLoginMethod } from 'redux/auth.slice';
import 'assets/css/header.style.css';
import { ALL_URL, DEF_URL } from 'utils/urls';
import randomBackground, {
    getPlans,
    history,
    isUserLogin,
    keyGenerator,
    publisherGroups,
    setMessageUser,
    updateMyPlans,
    userAvatarName,
    userIsLogin,
    usersPlansStorage
} from 'utils/helpers';
import { setCheckoutBlock } from 'redux/modals';
import BlockPlaceholder from '../block-placeholder';
import Cookies from 'js-cookie';
import { UM } from 'utils/user-messages';
import { MenuUrls } from 'admin/admin-book-list';
import DropDownAnd from '../drop-down-and/drop-down-and';
import { Avatar } from '@material-ui/core';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import { UserLoginTypes } from 'enums/enums';
import { decodingString } from 'utils/codingDecoding';

interface IHeaderComponent {
    children?: ReactElement;
    blackLogo?: boolean;
    shopBlock?: boolean;
    searchBlock?: boolean;
    BlackFontUser?: boolean;
}

const HeaderComponent = ({
    children,
    blackLogo,
    shopBlock = false,
    searchBlock = true,
    BlackFontUser = true
}: IHeaderComponent) => {
    const dispatch = useDispatch();
    const isLoggedIn = isUserLogin();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const ForPublisher = [
        {
            url: ALL_URL.MY_DASHBOARD,
            name: 'My Dashboard',
            icon: <i className="fas fa-tachometer-alt mr-2" />
        },
        {
            url: `${DEF_URL.PUBLISHER_PROFILE}/${userInfo?.id}`,
            name: 'My Profile',
            icon: <i className="far fa-user mr-2" />
        },
        {
            url: DEF_URL.MY_EVENTS,
            name: 'My Events',
            icon: <i className="far fa-calendar mr-2" />
        },
        {
            url: DEF_URL.MY_LIBRARY,
            name: 'My Library',
            icon: <i className="fas fa-book-reader mr-2" />
        },
        {
            url: ALL_URL.PREVIOUS_ORDERS,
            name: 'My Orders',
            icon: <i className="fas fa-shopping-bag mr-2" />
        },
        {
            url: ALL_URL.BILLING,
            name: 'Billing',
            icon: <i className="fas fa-credit-card mr-2" />
        }
    ];

    const AllOrders = useSelector(
        (state: ISiteCard) => state.SiteCard.allCardOrders
    );

    const [openDropdown, setOpenDropdown] = useState(false);
    const handleLogOut = useCallback(() => {
        setOpenDropdown(false);
        dispatch(logOut());

        Cookies.remove('access_token');
        Cookies.remove('id_token');
        Cookies.remove('refresh_token');

        history.push('/');
    }, []);

    const [openSearch, setOpenSearch] = useState(false);
    const searchingInput = useRef<HTMLInputElement | null>(null);

    function openSearchBlock() {
        setOpenSearch(!openSearch);
    }

    useEffect(() => {
        openSearch && searchingInput && searchingInput.current?.select();
    }, [openSearch]);

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

    function OpenCheckoutBlock() {
        dispatch(setCheckoutBlock(true));
    }

    const iAmStatus = userInfo?.groups?.some(
        (st: string) => st === publisherGroups.publisher
    );

    const iAmAdmin = userInfo?.groups?.some(
        (st: string) => st === publisherGroups.admin
    );

    function openLoginMethod() {
        dispatch(setUserLoginMethod(userIsLogin.normalLogin));
        dispatch(setOpenCloseModal(true));
        dispatch(setUseType(UserLoginTypes.signIn));
    }

    function useBlack(status: boolean | undefined) {
        return status ? '#000' : '#fff';
    }

    const plans = localStorage.getItem(usersPlansStorage);
    function startGetPlans() {
        if (userInfo) {
            const decodingPlans: IPlans[] | null = plans
                ? JSON.parse(decodingString(plans))
                : null;
            if (decodingPlans) {
                dispatch(updateMyPlans(decodingPlans, userInfo));
            }
            getPlans(userInfo);
        }
    }

    useEffect(() => {
        startGetPlans();
    }, [plans, userInfo]);
    return (
        <header>
            <div className="header-top">
                <div className="container-fluid">
                    <nav className="menu-site">
                        <h1 className="navbar-brand">
                            <Link
                                to="/"
                                className=" d-inline-block"
                                title="fanbook">
                                {blackLogo ? (
                                    <img src={BlackLogo} alt="logo" />
                                ) : (
                                    <img src={WhiteLogo} alt="logo" />
                                )}
                            </Link>
                        </h1>

                        <div className="menu-site--body">
                            <ul
                                className={`menu-site--body--c ${
                                    blackLogo ? 'c-black' : ''
                                }`}>
                                {isLoggedIn ? (
                                    <>
                                        {userInfo &&
                                            userInfo?.publisherProfile !==
                                                null && (
                                                <li className="manage-dropdown dropdown nav-item ">
                                                    <DropDownAnd
                                                        name={
                                                            <div>
                                                                <i className="fas fa-cog mr-2" />
                                                                For Publisher
                                                            </div>
                                                        }
                                                        className="pl-3"
                                                        style={{
                                                            color: useBlack(
                                                                blackLogo
                                                            )
                                                        }}
                                                        downBodyStyle={{
                                                            padding: '0 10px'
                                                        }}>
                                                        {ForPublisher.map(
                                                            (menu) => {
                                                                return (
                                                                    <div
                                                                        key={keyGenerator(
                                                                            30
                                                                        )}
                                                                        className="c-white">
                                                                        <Link
                                                                            to={
                                                                                menu.url
                                                                            }
                                                                            className="my-4 pl-2 d-flex justify-content-start align-items-center"
                                                                            style={{
                                                                                color: useBlack(
                                                                                    blackLogo
                                                                                )
                                                                            }}>
                                                                            {
                                                                                menu.icon
                                                                            }
                                                                            {
                                                                                menu.name
                                                                            }
                                                                        </Link>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </DropDownAnd>
                                                </li>
                                            )}
                                        <li className="nav-item d-flex justify-content-start align-items-center mt-menu position-relative">
                                            <div className="d-flex align-items-center">
                                                <h3
                                                    className="fs24 mb-0 menu-user-name"
                                                    style={{
                                                        color: useBlack(
                                                            BlackFontUser
                                                        )
                                                    }}>
                                                    Hi,{' '}
                                                    {userInfo?.firstName ? (
                                                        userInfo?.firstName
                                                    ) : (
                                                        <BlockPlaceholder
                                                            width={100}
                                                            height={25}
                                                            borderRadius={5}
                                                            status={true}
                                                            count={1}
                                                            className="m-0"
                                                        />
                                                    )}
                                                </h3>
                                                <span className="publisher-status-header-page">
                                                    {userInfo ? (
                                                        iAmStatus ? (
                                                            iAmAdmin ? (
                                                                'Admin'
                                                            ) : (
                                                                'Publisher'
                                                            )
                                                        ) : (
                                                            'Fan'
                                                        )
                                                    ) : (
                                                        <BlockPlaceholder
                                                            width={50}
                                                            height={8}
                                                            borderRadius={5}
                                                            status={true}
                                                            count={1}
                                                            className="m-0"
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                            <DropDownAnd
                                                name={
                                                    <div>
                                                        {userInfo?.firstName ? (
                                                            <Avatar
                                                                alt={
                                                                    userInfo.firstName
                                                                }
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    marginRight:
                                                                        -15,
                                                                    background:
                                                                        userInfo.avatarURL ===
                                                                        null
                                                                            ? randomBackground()
                                                                            : '',
                                                                    fontWeight: 600
                                                                }}
                                                                src={
                                                                    userInfo.avatarURL ||
                                                                    undefined
                                                                }>
                                                                {userAvatarName(
                                                                    userInfo
                                                                )}
                                                            </Avatar>
                                                        ) : (
                                                            <BlockPlaceholder
                                                                width={50}
                                                                height={50}
                                                                borderRadius={
                                                                    100
                                                                }
                                                                status={true}
                                                                count={1}
                                                                className="m-0 ml-3"
                                                            />
                                                        )}
                                                    </div>
                                                }
                                                downIcon={null}
                                                style={{
                                                    color: useBlack(blackLogo)
                                                }}
                                                downBodyStyle={{
                                                    paddingLeft: 15
                                                }}>
                                                {userInfo?.firstName && (
                                                    <div style={{ width: 120 }}>
                                                        <Link
                                                            className="d-flex justify-content-start align-items-center c-black mt-3"
                                                            style={{
                                                                color: useBlack(
                                                                    BlackFontUser
                                                                )
                                                            }}
                                                            to={
                                                                ALL_URL.MY_DRAFTS
                                                            }>
                                                            <i className="fas fa-file-alt mr-2 fs15" />
                                                            My Drafts
                                                        </Link>
                                                        {userInfo?.publisherProfile ===
                                                            null && (
                                                            <Link
                                                                className="d-flex justify-content-start align-items-center c-black mt-3"
                                                                style={{
                                                                    color: useBlack(
                                                                        BlackFontUser
                                                                    )
                                                                }}
                                                                to={
                                                                    ALL_URL.PUBLISHER
                                                                }>
                                                                <i className="fas fa-user mr-2 fs15" />
                                                                Become Publisher
                                                            </Link>
                                                        )}

                                                        {iAmAdmin && (
                                                            <Link
                                                                className="d-flex justify-content-start align-items-center c-black mt-3"
                                                                style={{
                                                                    color: useBlack(
                                                                        BlackFontUser
                                                                    )
                                                                }}
                                                                to={`${DEF_URL.ADMIN_BOOK_LIST}/${MenuUrls.users}`}>
                                                                <i className="fas fa-user-shield mr-2 fs15" />
                                                                Admin Panel
                                                            </Link>
                                                        )}
                                                        <Link
                                                            className="d-flex justify-content-start align-items-center c-black mt-3"
                                                            style={{
                                                                color: useBlack(
                                                                    BlackFontUser
                                                                )
                                                            }}
                                                            to={
                                                                ALL_URL.SETTINGS
                                                            }>
                                                            <i
                                                                className="fas fa-cog mr-2 fs15"
                                                                style={{
                                                                    color: useBlack(
                                                                        BlackFontUser
                                                                    )
                                                                }}
                                                            />
                                                            Settings
                                                        </Link>
                                                        <Link
                                                            className="d-flex justify-content-start align-items-center c-black my-3"
                                                            to={
                                                                ALL_URL.PUBLISHER
                                                            }
                                                            style={{
                                                                color: useBlack(
                                                                    BlackFontUser
                                                                )
                                                            }}
                                                            onClick={
                                                                handleLogOut
                                                            }>
                                                            <i className="fas fa-power-off mr-2 fs15" />
                                                            Log out
                                                        </Link>
                                                    </div>
                                                )}
                                            </DropDownAnd>
                                        </li>
                                    </>
                                ) : (
                                    <li
                                        className={`user-icon mt-menu ${
                                            openDropdown ? 'close-dropdown' : ''
                                        }`}
                                        onClick={openLoginMethod}>
                                        <Link
                                            to="#"
                                            className="nav-link d-flex justify-content-center align-items-center">
                                            <i className="fas fa-user fs18" />
                                        </Link>
                                    </li>
                                )}
                                {searchBlock && (
                                    <>
                                        <li
                                            className={
                                                openSearch
                                                    ? 'mt-menu search-icon open-menu'
                                                    : 'mt-menu search-icon'
                                            }>
                                            <div onClick={openSearchBlock}>
                                                <span className="header-menu-icon">
                                                    {openSearch ? (
                                                        <i className="fas fa-times fs18" />
                                                    ) : (
                                                        <i className="fas fa-search fs18" />
                                                    )}
                                                </span>
                                            </div>
                                            {openSearch && (
                                                <form
                                                    action="#"
                                                    onSubmit={searchStart}
                                                    method="get"
                                                    style={{
                                                        display: openSearch
                                                            ? 'flex'
                                                            : 'none'
                                                    }}>
                                                    <input
                                                        type="text"
                                                        ref={searchingInput}
                                                        onChange={(e) => {
                                                            setInputValue(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="input search-to-header-component"
                                                        placeholder="Enter the event search term"
                                                    />
                                                    <input
                                                        type="submit"
                                                        value="Find event"
                                                        className="search-submit"
                                                    />
                                                </form>
                                            )}
                                        </li>
                                    </>
                                )}

                                {shopBlock && isLoggedIn && (
                                    <li
                                        className="header-menu-icon"
                                        style={{ background: 'unset' }}>
                                        <span
                                            onClick={OpenCheckoutBlock}
                                            className="nav-link bay-bloock">
                                            <i className="fas fa-shopping-cart fs18" />
                                            {AllOrders > 0 && (
                                                <span className="count">
                                                    {AllOrders}
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            {children}
        </header>
    );
};

export default HeaderComponent;
