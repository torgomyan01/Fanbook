import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalFollowers from './modal-followers';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkPublisher,
    keyGenerator,
    setMessageUser,
    textCrop
} from 'utils/helpers';
import { Dropdown } from 'react-bootstrap';
import DefaultImage from 'assets/images/fanbookDefault.jpg';
import BlockPlaceholder from 'features/block-placeholder';
import { GetPublisher, UpdateProfilePublisher } from 'api/all-apis';
import ModalUploadCoverPublisher from 'features/modal-upload-cover-publisher/modal-upload-cover-publisher';
import { setOpenCloseModalUploadPublisherCover } from 'redux/modals';
import { setProfileData } from 'redux/publisher-profile';
import ModalEditDescription from './modal-edit-description';
import { Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagramSquare,
    faLinkedin,
    faTwitterSquare
} from '@fortawesome/free-brands-svg-icons';
import { UM } from 'utils/user-messages';
import { Link } from 'react-router-dom';

const PUBLISHER_DESCRIPTION_LENGTH = 230;

function HeaderPublisher() {
    const dispatch = useDispatch();
    const { publisherID }: { publisherID: string } = useParams();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const PBInformation = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.data
    );
    const PBPageLoading = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.loading
    );
    const [OpenClose, setOpenClose] = useState(false);

    function openModalFollowers() {
        setOpenClose(true);
    }

    const isEditTable = checkPublisher(userInfo?.id, publisherID);

    function deleteCover(e: any) {
        e.preventDefault();
        dispatch(setMessageUser(UM.P_W));
        UpdateProfilePublisher({
            publisherProfile: {
                cover: null
            }
        }).then(() => {
            if (userInfo?.id) {
                GetPublisher(userInfo.id).then((res) => {
                    dispatch(setProfileData(res.data.data));
                    dispatch(
                        setOpenCloseModalUploadPublisherCover({
                            publisherID: '',
                            openClose: false
                        })
                    );
                });
            }
        });
    }

    function openModalToUploadCoverPublisher() {
        dispatch(
            setOpenCloseModalUploadPublisherCover({
                publisherID: userInfo?.id,
                openClose: true
            })
        );
    }

    const [readMoreDesc, setReadMoreDesc] = useState<string | null | undefined>(
        ''
    );
    const [readMoreOpenClose, setReadMoreOpenClose] = useState<boolean>(false);

    useEffect(() => {
        setReadMoreDesc(
            textCrop(
                PBInformation?.item?.publisherProfile?.description,
                PUBLISHER_DESCRIPTION_LENGTH
            )
        );
    }, [PBInformation]);

    function openReadMore() {
        setReadMoreOpenClose(true);
        setReadMoreDesc(PBInformation?.item?.publisherProfile?.description);
    }

    function closeReadMore() {
        setReadMoreOpenClose(false);
        setReadMoreDesc(
            textCrop(
                PBInformation?.item?.publisherProfile?.description,
                PUBLISHER_DESCRIPTION_LENGTH
            )
        );
    }

    const [showHideModalDescription, setShowHideModalDescription] =
        useState<boolean>(false);

    function closeModalEditDescription() {
        setShowHideModalDescription(false);
    }

    function openModalEditDescription() {
        setShowHideModalDescription(true);
    }
    const socSites = PBInformation?.item?.publisherProfile?.socialNetwork;

    function openSocSitePage(url: string | null) {
        url && window.open(url.replace(/@/g, ''), '_blank');
    }

    return (
        <div className="about-box">
            <ModalUploadCoverPublisher />
            <div
                className={`img-box ${
                    !PBInformation?.item?.publisherProfile?.coverURL &&
                    'no-cover-pb'
                }`}
                style={{
                    backgroundImage: `url(${
                        PBInformation?.item?.publisherProfile?.coverURL
                            ? PBInformation?.item?.publisherProfile?.coverURL
                            : DefaultImage
                    })`
                }}>
                {isEditTable && (
                    <div className="editor-cover-block-publisher">
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-light"
                                className="edit-block">
                                <i className="fas fa-pen" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {PBInformation?.item?.publisherProfile
                                    ?.coverURL && (
                                    <Dropdown.Item
                                        href="#"
                                        className="mt-2"
                                        onClick={deleteCover}>
                                        <i className="fas fa-trash mr-2 c-red" />
                                        Delete Cover
                                    </Dropdown.Item>
                                )}

                                <Dropdown.Item
                                    href="#"
                                    className="mt-2 mb-2"
                                    onClick={openModalToUploadCoverPublisher}>
                                    <i className="fas fa-upload mr-2 c-red" />
                                    Upload Cover
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}

                <div
                    className="about-note c-white"
                    style={{
                        height: readMoreOpenClose ? 'auto' : '15.625rem'
                    }}>
                    {isEditTable && (
                        <div className="edit-description-publisher-page">
                            <Tooltip title="Edit Description" placement="top">
                                <i
                                    className="fas fa-pencil-alt cursor-pointer"
                                    onClick={openModalEditDescription}
                                />
                            </Tooltip>
                        </div>
                    )}

                    <h2 className="about-note_title font-bold">
                        About the Publisher
                    </h2>
                    <p className="about-note_txt mb-0">
                        {PBPageLoading ? (
                            <BlockPlaceholder
                                width={189}
                                height={8}
                                borderRadius={5}
                                status={true}
                                count={5}
                                className="m-0 w-100"
                            />
                        ) : (
                            <>
                                {readMoreDesc}
                                {PBInformation?.item?.publisherProfile
                                    ?.description &&
                                    PBInformation?.item?.publisherProfile
                                        ?.description.length >
                                        PUBLISHER_DESCRIPTION_LENGTH &&
                                    (readMoreOpenClose ? (
                                        <span
                                            className="tdu c-white cursor-pointer"
                                            onClick={closeReadMore}>
                                            {' '}
                                            Close
                                        </span>
                                    ) : (
                                        <span
                                            className="tdu c-white cursor-pointer"
                                            onClick={openReadMore}>
                                            Read More
                                        </span>
                                    ))}
                            </>
                        )}
                    </p>
                </div>
            </div>
            <div className="social-box d-sm-flex justify-content-between">
                <div className="d-flex mb-sm-0 mb-2 justify-content-start align-items-center">
                    {userInfo?.publisherProfile?.sites.map((site: string) => (
                        <a
                            key={keyGenerator(20)}
                            href={
                                site.includes('http') ? site : `https://${site}`
                            }
                            target="_blank"
                            className="c-red mr-3"
                            rel="noreferrer">
                            <b>{site}</b>
                            <i className="fas fa-external-link-alt ml-2" />
                        </a>
                    ))}
                </div>
                <ul className="list-unstyled mb-0 d-flex align-items-center">
                    {socSites?.facebook && (
                        <li className="mr-1">
                            <span
                                onClick={() =>
                                    openSocSitePage(socSites?.facebook)
                                }
                                className="social-item border-0 cursor-pointer">
                                <i className="fab fa-facebook-square c-red" />
                            </span>
                        </li>
                    )}
                    {socSites?.instagram && (
                        <li className="mr-1">
                            <span
                                onClick={() =>
                                    openSocSitePage(socSites?.instagram)
                                }
                                className="social-item border-0 cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faInstagramSquare}
                                    className="c-red"
                                />
                            </span>
                        </li>
                    )}

                    {socSites?.linkedin && (
                        <li>
                            <span
                                onClick={() =>
                                    openSocSitePage(socSites?.instagram)
                                }
                                className="social-item border-0 cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="c-red"
                                />
                            </span>
                        </li>
                    )}
                    {socSites?.twitter && (
                        <li>
                            <span
                                onClick={() =>
                                    openSocSitePage(socSites?.instagram)
                                }
                                className="social-item border-0 cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faTwitterSquare}
                                    className="c-red"
                                />
                            </span>
                        </li>
                    )}
                    {socSites?.tiktok && (
                        <li>
                            <span
                                onClick={() =>
                                    openSocSitePage(socSites?.instagram)
                                }
                                className="social-item border-0 cursor-pointer">
                                <i className="fab fa-tiktok c-red" />
                            </span>
                        </li>
                    )}
                </ul>
            </div>
            <ModalFollowers
                show={OpenClose}
                hide={() => {
                    setOpenClose(false);
                }}
            />
            <ModalEditDescription
                closeModal={closeModalEditDescription}
                showHide={showHideModalDescription}
            />
        </div>
    );
}

export default HeaderPublisher;
