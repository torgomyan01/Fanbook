import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import {
    Avatar,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    TextField
} from '@material-ui/core';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import moment from 'moment';
import { keyGenerator, publisherGroups, userAvatarName } from 'utils/helpers';
import { defaultEmptyPublisher, userDefaultData } from 'admin/consts';
import EditImageDropdown from '../edit-image-dropdown';
import SocialSites from '../components/social-sites';
import {
    AdminCreatePublisher,
    AdminUpdatePublisher,
    DeleteUser,
    GetPublisherFrom,
    UpdateFanInfo
} from 'api/all-apis';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ModalChangePassword from '../components/modal-change-password';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'redux/auth.slice';
import { AxiosResponse } from 'axios';

interface IThisProps {
    modal: {
        openClose: boolean;
        user: UserInfoAdmin | null;
    };
    close: any;
    userDeleted: any;
}

function MoreDetailsUser({ modal, close, userDeleted }: IThisProps) {
    const dispatch = useDispatch();
    const iAmInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [inpDisabled, setInpDisabled] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<any | UserInfoAdmin>(
        userDefaultData
    );

    const [DiscardChanges, setDiscardChanges] = useState<UserInfoAdmin>();
    const iAmPublisher = userInfo.groups.includes(publisherGroups.publisher);
    const iAmAdmin = userInfo.groups.includes(publisherGroups.admin);
    const checkboxColor = inpDisabled ? '#B12029C0' : '#b12029';

    const [countriesCodes, setCountriesCodes] = useState<
        { code: string; name: string }[]
    >([]);

    const [countries, setCountries] =
        useState<{ code: string; name: string }>();

    useEffect(() => {
        if (modal.user) {
            setUserInfo(modal.user);
            setCountries({
                code: modal.user.publisherProfile?.countryCode || '',
                name: modal.user.publisherProfile?.country || ''
            });
        }
        GetPublisherFrom()
            .then((res) => {
                const countries =
                    res.data.data.item.publisherProfile.countryCode;
                setCountriesCodes(countries);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [modal]);

    function setPubCountry(e: any, val: any) {
        setCountries(val);
        if (val) {
            changeUserInfo('publisherProfile', 'country', val.name);
            changeUserInfo('publisherProfile', 'countryCode', val.code);
        }
    }

    useEffect(() => {
        if (!inpDisabled) {
            const _oldData = { ...userInfo };
            setDiscardChanges(_oldData);
        }
    }, [inpDisabled]);

    function _discardChange() {
        setInpDisabled(true);
        setUserInfo(DiscardChanges);
        setDiscardChanges(undefined);
    }

    function changeUserInfo(key: string, PB: string | null = null, value: any) {
        const _data = { ...userInfo };
        PB ? (_data[key][PB] = value) : (_data[key] = value);
        setUserInfo(_data);
    }

    function changeForPublisher(e: any, val: boolean) {
        const _data = { ...userInfo };
        if (!val) {
            _data.publisherProfile = null;
            const _groups = [..._data.groups];
            _groups.splice(_groups.indexOf(publisherGroups.publisher), 1);
            _data.groups = _groups;
        } else {
            _data.groups.push(publisherGroups.publisher);
            _data.publisherProfile = { ...defaultEmptyPublisher };
        }
        setUserInfo(_data);
    }

    function changeForAdmin(e: any, val: boolean) {
        const _data = { ...userInfo };
        if (!val) {
            const _groups = [..._data.groups];
            _groups.splice(_groups.indexOf(publisherGroups.admin), 1);
            _data.groups = _groups;
        } else {
            _data.groups.push(publisherGroups.admin);
        }
        setUserInfo(_data);
    }

    function addCompany(e: any, val: boolean) {
        const _data = { ...userInfo };
        if (userInfo.publisherProfile) {
            _data.publisherProfile!.isCompany = val;
            _data.publisherProfile!.companyType = val ? '' : null;
            _data.publisherProfile!.companyName = val ? '' : null;
            _data.publisherProfile!.companyAddress = val ? '' : null;
            _data.publisherProfile!.companyCity = val ? '' : null;
            _data.publisherProfile!.companyState = val ? '' : null;
            _data.publisherProfile!.companyZip = val ? '' : null;
            setUserInfo(_data);
        }
    }

    function closeModal() {
        setInpDisabled(true);
        close();
    }

    function removeSites(site: string) {
        const _data = { ...userInfo };
        const sites = [..._data.publisherProfile.sites];
        sites.splice(sites.indexOf(site), 1);
        _data.publisherProfile.sites = sites;
        setUserInfo(_data);
    }

    const [addSite, setAddSite] = useState<boolean>(false);
    function addSites(site: string) {
        const _data = { ...userInfo };
        const sites = [..._data.publisherProfile.sites];
        sites.push(site);
        _data.publisherProfile.sites = sites;
        setUserInfo(_data);
    }

    function changeAddSite(e: any) {
        if (e.key === 'Enter') {
            addSites(e.target.value);
            setAddSite(false);
        }
    }

    function newSocialSites(sites: object) {
        const _data = { ...userInfo };
        _data.publisherProfile.socialNetwork = sites;
        setUserInfo(_data);
    }

    const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false);
    function deleteUser() {
        setDeleteUserLoading(true);
        DeleteUser(userInfo.id)
            .then(() => {
                setDeleteUserLoading(false);
                userDeleted();
            })
            .catch((err) => {
                console.log(err);
                setDeleteUserLoading(false);
            });
    }

    const [saveUserLoading, setSaveUserLoading] = useState<boolean>(false);
    function saveUser() {
        const _userData = { ...userInfo };
        setSaveUserLoading(true);
        const fanData: { [index: string]: any } = {
            email: _userData.email,
            firstName: _userData.firstName,
            lastName: _userData.lastName,
            groups: _userData.groups
        };
        if (
            _userData.avatarURL?.includes('base64') ||
            _userData.avatarURL === null
        ) {
            fanData['avatar'] = _userData.avatarURL;
        }

        UpdateFanInfo(_userData.id, fanData)
            .then((res) => {
                !_userData.publisherProfile && setInpDisabled(true);
                setSaveUserLoading(false);
                _userData.publisherProfile && createPublisher(_userData);

                editedMyInfo(_userData, res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function createPublisher(_userData: UserInfoAdmin) {
        setSaveUserLoading(true);
        const _pbData: { [index: string]: any } = {
            publisherProfile: {
                name: _userData.publisherProfile?.name,
                description: _userData.publisherProfile?.description,
                sites: _userData.publisherProfile?.sites,
                socialNetwork: _userData.publisherProfile?.socialNetwork,
                fiscalNumber: _userData.publisherProfile?.fiscalNumber,
                vatNumber: _userData.publisherProfile?.vatNumber,
                countryCode: _userData.publisherProfile?.countryCode,
                isCompany: _userData.publisherProfile?.isCompany,
                companyType: _userData.publisherProfile?.companyType,
                companyName: _userData.publisherProfile?.companyName,
                companyAddress: _userData.publisherProfile?.companyAddress,
                companyCity: _userData.publisherProfile?.companyCity,
                companyState: _userData.publisherProfile?.companyState,
                companyZip: _userData.publisherProfile?.companyZip
            }
        };
        if (
            _userData.publisherProfile?.avatarURL?.includes('base64') ||
            _userData.publisherProfile?.avatarURL === null
        ) {
            _pbData['publisherProfile']['avatar'] =
                _userData.publisherProfile?.avatarURL;
        }
        if (
            _userData.publisherProfile?.coverURL?.includes('base64') ||
            _userData.publisherProfile?.coverURL === null
        ) {
            _pbData['publisherProfile']['cover'] =
                _userData.publisherProfile?.coverURL;
        }

        if (DiscardChanges?.publisherProfile) {
            AdminUpdatePublisher(_userData.id, _pbData)
                .then((res) => {
                    editedMyInfo(_userData, res);
                    setSaveUserLoading(false);
                    setInpDisabled(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            AdminCreatePublisher(_userData.id, _pbData)
                .then((res) => {
                    editedMyInfo(_userData, res);
                    setSaveUserLoading(false);
                    setInpDisabled(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function editedMyInfo(_userData: UserInfoAdmin, res: AxiosResponse) {
        if (_userData.id === iAmInfo?.id) {
            const profile = res.data.data.item;
            localStorage.setItem('user', JSON.stringify(profile));

            dispatch(
                setUser({
                    profile: { ...profile }
                })
            );
        }
    }
    const [modalChangePassword, setModalChangePassword] =
        useState<boolean>(false);

    return (
        <>
            <Modal
                size="xl"
                style={{ zIndex: 1000 }}
                show={modal.openClose}
                onHide={closeModal}
                className="book-details-modal modal-bg-blur-effect">
                <Modal.Body>
                    <div className="modal-body p-0">
                        <div className="left-part">
                            <div className="left-part_inner h-100">
                                <h2 className="modal-title">
                                    User Information
                                </h2>
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-content-start flex-wrap">
                                        <div>
                                            <div className="d-flex justify-content-between flex-wrap">
                                                <TextField
                                                    label="First Name"
                                                    className="mr-2"
                                                    style={{ width: 275 }}
                                                    value={userInfo.firstName}
                                                    disabled={inpDisabled}
                                                    onChange={(e: any) =>
                                                        changeUserInfo(
                                                            'firstName',
                                                            null,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <TextField
                                                    label="Last Name"
                                                    style={{ width: 275 }}
                                                    value={userInfo.lastName}
                                                    disabled={inpDisabled}
                                                    onChange={(e: any) =>
                                                        changeUserInfo(
                                                            'lastName',
                                                            null,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                <TextField
                                                    label="Email"
                                                    className="mr-2"
                                                    style={{ width: 275 }}
                                                    value={userInfo.email}
                                                    disabled={inpDisabled}
                                                    onChange={(e: any) =>
                                                        changeUserInfo(
                                                            'email',
                                                            null,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <TextField
                                                    label="Status"
                                                    style={{ width: 275 }}
                                                    value={
                                                        userInfo.isEnabled
                                                            ? 'Active'
                                                            : 'Inactive'
                                                    }
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                <TextField
                                                    label="Last Login At"
                                                    className="mr-2"
                                                    style={{ width: 275 }}
                                                    value={moment(
                                                        userInfo.lastLoginAt
                                                    ).format('lll')}
                                                    disabled={true}
                                                />
                                                <TextField
                                                    label="Date Joined"
                                                    style={{ width: 275 }}
                                                    value={moment(
                                                        userInfo.createdAt
                                                    ).format('lll')}
                                                    disabled={true}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                <TextField
                                                    label="Password"
                                                    type="password"
                                                    className="mr-2"
                                                    style={{ width: 275 }}
                                                    value="password"
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center flex-column mr-5">
                                            <p className="text-center">
                                                Avatar
                                            </p>
                                            <div className="position-relative">
                                                <Avatar
                                                    alt={
                                                        userInfo.firstName || ''
                                                    }
                                                    src={
                                                        userInfo.avatarURL ||
                                                        undefined
                                                    }
                                                    style={{
                                                        width: 100,
                                                        height: 100
                                                    }}>
                                                    {userAvatarName(userInfo)}
                                                </Avatar>
                                                {!inpDisabled && (
                                                    <EditImageDropdown
                                                        inputId="upload-image-fan"
                                                        inputChange={(
                                                            imageBase64: string
                                                        ) =>
                                                            changeUserInfo(
                                                                'avatarURL',
                                                                null,
                                                                imageBase64
                                                            )
                                                        }
                                                        removeChange={() =>
                                                            changeUserInfo(
                                                                'avatarURL',
                                                                null,
                                                                null
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap justify-content-start">
                                    <div className="col-lg-4 col-12">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={userInfo.isEnabled}
                                                    name="ActiveUser"
                                                    style={{
                                                        color: checkboxColor
                                                    }}
                                                    disabled={true}
                                                />
                                            }
                                            label="Fan"
                                        />
                                        <FormHelperText className="description-user-status">
                                            Mark the User as Fan
                                        </FormHelperText>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={iAmPublisher}
                                                    name="Publisher"
                                                    style={{
                                                        color: checkboxColor
                                                    }}
                                                    disabled={inpDisabled}
                                                    onChange={
                                                        changeForPublisher
                                                    }
                                                />
                                            }
                                            label="Publisher"
                                        />
                                        <FormHelperText className="description-user-status">
                                            Mark the User as Publisher
                                        </FormHelperText>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={iAmAdmin}
                                                    name="Admin"
                                                    style={{
                                                        color: checkboxColor
                                                    }}
                                                    disabled={inpDisabled}
                                                    onChange={changeForAdmin}
                                                />
                                            }
                                            label="Admin"
                                        />
                                        <FormHelperText className="description-user-status">
                                            Mark the User as Admin
                                        </FormHelperText>
                                    </div>
                                </div>
                                {iAmPublisher && (
                                    <>
                                        <h2 className="modal-title mt-4">
                                            For Publisher
                                        </h2>
                                        <div className="d-flex justify-content-between align-content-start flex-wrap">
                                            <div>
                                                <div className="d-flex justify-content-between flex-wrap">
                                                    <TextField
                                                        label="Balance"
                                                        className="mr-2"
                                                        style={{ width: 275 }}
                                                        value={`$${userInfo.balance}`}
                                                        disabled={true}
                                                    />
                                                    <TextField
                                                        label="Plan"
                                                        style={{ width: 275 }}
                                                        value={userInfo.plan}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                    <TextField
                                                        label="Bank Name"
                                                        className="mr-2"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.bankName || ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'bankName',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <TextField
                                                        label="Bank Name Account"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.bankNameAccount ||
                                                            ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'bankNameAccount',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                    <TextField
                                                        label="Bank Account Number"
                                                        className="mr-2"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.bankAccountNumber ||
                                                            ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'bankAccountNumber',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <TextField
                                                        label="Bank Routing Number"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.bankRoutingNumber ||
                                                            ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'bankRoutingNumber',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                    {countriesCodes.length >
                                                        0 && (
                                                        <Autocomplete
                                                            options={
                                                                countriesCodes
                                                            }
                                                            style={{
                                                                width: 275
                                                            }}
                                                            getOptionLabel={(
                                                                option
                                                            ) =>
                                                                option.name ||
                                                                ''
                                                            }
                                                            value={countries}
                                                            disabled={
                                                                inpDisabled
                                                            }
                                                            onChange={
                                                                setPubCountry
                                                            }
                                                            aria-required={true}
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Country"
                                                                    variant="standard"
                                                                    className="mr-2"
                                                                    name="SelectCountry"
                                                                />
                                                            )}
                                                        />
                                                    )}

                                                    <TextField
                                                        label="Description"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.description ||
                                                            ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'description',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                    <TextField
                                                        label="Fiscal Number"
                                                        className="mr-2"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.fiscalNumber ||
                                                            ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'fiscalNumber',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <TextField
                                                        label="Name"
                                                        style={{ width: 275 }}
                                                        value={
                                                            userInfo
                                                                .publisherProfile
                                                                ?.name || ''
                                                        }
                                                        disabled={inpDisabled}
                                                        onChange={(e: any) =>
                                                            changeUserInfo(
                                                                'publisherProfile',
                                                                'name',
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mt-3 pl-2">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.isCompany ||
                                                                    false
                                                                }
                                                                name="checkedB"
                                                                color="primary"
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                style={{
                                                                    color: checkboxColor
                                                                }}
                                                                onChange={
                                                                    addCompany
                                                                }
                                                            />
                                                        }
                                                        label="I am representing a company"
                                                    />
                                                </div>
                                                {userInfo.publisherProfile
                                                    ?.isCompany && (
                                                    <>
                                                        <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                            <TextField
                                                                label="Company Name"
                                                                className="mr-2"
                                                                style={{
                                                                    width: 275
                                                                }}
                                                                value={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.companyName
                                                                }
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'companyName',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <TextField
                                                                label="Company State"
                                                                style={{
                                                                    width: 275
                                                                }}
                                                                value={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.companyState
                                                                }
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'companyState',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                            <TextField
                                                                label="Company Address"
                                                                className="mr-2"
                                                                style={{
                                                                    width: 275
                                                                }}
                                                                value={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.companyAddress
                                                                }
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'companyAddress',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <TextField
                                                                label="Company City"
                                                                style={{
                                                                    width: 275
                                                                }}
                                                                value={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.companyCity
                                                                }
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'companyCity',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="d-flex justify-content-between mt-3 flex-wrap">
                                                            <TextField
                                                                label="Company Type"
                                                                className="mr-2"
                                                                style={{
                                                                    width: 275
                                                                }}
                                                                value={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.companyType
                                                                }
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'companyType',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                            <TextField
                                                                label="Company Zip"
                                                                style={{
                                                                    width: 275
                                                                }}
                                                                value={
                                                                    userInfo
                                                                        .publisherProfile
                                                                        ?.companyZip
                                                                }
                                                                disabled={
                                                                    inpDisabled
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'companyZip',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center flex-column mr-5">
                                                <div>
                                                    <p className="text-center">
                                                        Publisher Avatar
                                                    </p>
                                                    <div className="position-relative">
                                                        <Avatar
                                                            alt={
                                                                userInfo
                                                                    .publisherProfile
                                                                    ?.name
                                                            }
                                                            src={
                                                                userInfo
                                                                    .publisherProfile
                                                                    ?.avatarURL ||
                                                                undefined
                                                            }
                                                            style={{
                                                                width: 100,
                                                                height: 100
                                                            }}>
                                                            {userAvatarName(
                                                                userInfo
                                                            )}
                                                        </Avatar>
                                                        {!inpDisabled && (
                                                            <EditImageDropdown
                                                                inputId="upload-image-avatar-publisher"
                                                                inputChange={(
                                                                    imageBase64: string
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'avatarURL',
                                                                        imageBase64
                                                                    )
                                                                }
                                                                removeChange={() =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'avatarURL',
                                                                        null
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-5">
                                                    <p className="text-center">
                                                        Cover
                                                    </p>
                                                    <div className="position-relative">
                                                        <Avatar
                                                            alt={
                                                                userInfo
                                                                    .publisherProfile
                                                                    ?.name
                                                            }
                                                            src={
                                                                userInfo
                                                                    .publisherProfile
                                                                    ?.coverURL ||
                                                                undefined
                                                            }
                                                            style={{
                                                                width: 100,
                                                                height: 100
                                                            }}
                                                        />
                                                        {!inpDisabled && (
                                                            <EditImageDropdown
                                                                inputId="upload-image-cover-publisher"
                                                                inputChange={(
                                                                    imageBase64: string
                                                                ) =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'coverURL',
                                                                        imageBase64
                                                                    )
                                                                }
                                                                removeChange={() =>
                                                                    changeUserInfo(
                                                                        'publisherProfile',
                                                                        'coverURL',
                                                                        null
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start mt-5 pt-4 border-top flex-wrap">
                                            <div
                                                className="mr-5"
                                                style={{ minWidth: 250 }}>
                                                <div className="pl-2">
                                                    <FormControlLabel
                                                        control={
                                                            <i
                                                                className="fas fa-window-maximize mr-2 c-red fs18"
                                                                style={{
                                                                    marginLeft: 5
                                                                }}
                                                            />
                                                        }
                                                        label="Sites"
                                                    />
                                                </div>
                                                <div>
                                                    {userInfo?.publisherProfile
                                                        ?.sites?.length > 0 ? (
                                                        userInfo.publisherProfile?.sites?.map(
                                                            (site: string) => (
                                                                <div
                                                                    key={keyGenerator(
                                                                        20
                                                                    )}
                                                                    className="d-flex justify-content-start align-items-center">
                                                                    <span>
                                                                        <a
                                                                            href={
                                                                                site
                                                                            }
                                                                            target="_blank"
                                                                            rel="noreferrer">
                                                                            {
                                                                                site
                                                                            }
                                                                        </a>
                                                                    </span>
                                                                    {!inpDisabled && (
                                                                        <i
                                                                            className="fas fa-trash ml-2 c-red cursor-pointer"
                                                                            onClick={() =>
                                                                                removeSites(
                                                                                    site
                                                                                )
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <p>No Sites</p>
                                                    )}
                                                </div>

                                                <div className="mt-1">
                                                    {!inpDisabled &&
                                                        (addSite ? (
                                                            <input
                                                                type="text"
                                                                className="add-site-input"
                                                                onKeyUp={
                                                                    changeAddSite
                                                                }
                                                                placeholder="Site URL"
                                                            />
                                                        ) : (
                                                            <FormControlLabel
                                                                control={
                                                                    <i
                                                                        className="fas fa-plus mr-2 c-red"
                                                                        style={{
                                                                            marginLeft: 12
                                                                        }}
                                                                    />
                                                                }
                                                                onClick={() =>
                                                                    setAddSite(
                                                                        true
                                                                    )
                                                                }
                                                                label="Add Site"
                                                            />
                                                        ))}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="pl-2">
                                                    <FormControlLabel
                                                        control={
                                                            <i
                                                                className="fas fa-share-alt mr-2 c-red fs18"
                                                                style={{
                                                                    marginLeft: 5
                                                                }}
                                                            />
                                                        }
                                                        label="Social Network"
                                                    />
                                                </div>
                                                {userInfo?.publisherProfile
                                                    ?.socialNetwork && (
                                                    <SocialSites
                                                        socSites={
                                                            userInfo
                                                                .publisherProfile
                                                                .socialNetwork
                                                        }
                                                        useEdit={inpDisabled}
                                                        onChange={
                                                            newSocialSites
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="right-part">
                            <span className="close-icon" onClick={closeModal}>
                                <i className="fas fa-times" />
                            </span>

                            <div className="d-flex flex-column justify-content-between h-100">
                                <div>
                                    <h2 className="modal-title">Actions</h2>
                                    {inpDisabled ? (
                                        <button
                                            className="checkout-btn btn white mw-100 mb-4 btn-modal-admin-book-list"
                                            onClick={() =>
                                                setInpDisabled(false)
                                            }>
                                            Edit User
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="checkout-btn btn white mw-100 mb-4 btn-modal-admin-book-list"
                                                onClick={_discardChange}>
                                                Discard Changes
                                            </button>
                                            <button
                                                className="checkout-btn btn dred mw-100 mb-2 btn-modal-admin-book-list"
                                                onClick={saveUser}>
                                                Save Changes
                                                {saveUserLoading && (
                                                    <Spinner
                                                        animation="border"
                                                        variant="light"
                                                        className="ml-2"
                                                    />
                                                )}
                                            </button>
                                            <button
                                                className="checkout-btn btn dred mw-100 mb-2 btn-modal-admin-book-list"
                                                onClick={() =>
                                                    setModalChangePassword(true)
                                                }>
                                                Change Password
                                            </button>
                                        </>
                                    )}
                                    {!userInfo.isEnabled && (
                                        <button className="checkout-btn btn dred mw-100 mb-2 btn-modal-admin-book-list">
                                            Activate Account
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <button
                                        className="checkout-btn btn dred mw-100 mb-2 btn-modal-admin-book-list"
                                        onClick={deleteUser}>
                                        Delete User
                                        {deleteUserLoading && (
                                            <Spinner
                                                animation="border"
                                                variant="light"
                                                className="ml-2"
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ModalChangePassword
                show={modalChangePassword}
                close={() => setModalChangePassword(false)}
            />
        </>
    );
}

export default MoreDetailsUser;
