import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlockPlaceholder from 'features/block-placeholder';
import defaultImage from 'assets/images/fanbookDefault.jpg';
import { Dropdown } from 'react-bootstrap';
import { checkPublisher, setMessageUser } from 'utils/helpers';
import { GetPublisher, UpdateProfilePublisher } from 'api/all-apis';
import { setProfileData } from 'redux/publisher-profile';
import { useParams } from 'react-router-dom';
import { setOpenCloseModalUploadPublisherAvatar } from 'redux/modals';
import { UM } from 'utils/user-messages';
import { Link } from 'react-router-dom';
import { ALL_URL } from 'utils/urls';

function LeftBlock() {
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const { publisherID }: { publisherID: string } = useParams();
    const dispatch = useDispatch();
    const PBInformation = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.data
    );
    const PBPageLoading = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.loading
    );

    const isEditTable = checkPublisher(userInfo?.id, publisherID);

    function deleteCover(e: any) {
        e.preventDefault();
        dispatch(setMessageUser(UM.P_W));
        UpdateProfilePublisher({
            publisherProfile: {
                avatar: null
            }
        }).then(() => {
            if (userInfo?.id) {
                GetPublisher(userInfo.id).then((res) => {
                    dispatch(setProfileData(res.data.data));
                    dispatch(
                        setOpenCloseModalUploadPublisherAvatar({
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
            setOpenCloseModalUploadPublisherAvatar({
                publisherID: userInfo?.id,
                openClose: true
            })
        );
    }
    return (
        <div className="col-xl-2 col-12">
            <div className="publisher-left">
                <div className="mr-md-0 mr-3">
                    {PBPageLoading ? (
                        <BlockPlaceholder
                            width={189}
                            height={189}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    ) : (
                        <div
                            className="user-box cursor-pointer"
                            style={{
                                backgroundImage: `url(${
                                    PBInformation?.item.publisherProfile
                                        ?.avatarURL
                                        ? PBInformation.item.publisherProfile
                                              ?.avatarURL
                                        : defaultImage
                                })`
                            }}>
                            {isEditTable && (
                                <div className="editor-cover-block-publisher">
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="outline-light"
                                            className="edit-block"
                                            id="dropdown-basic">
                                            <i className="fas fa-pen" />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {PBInformation?.item
                                                ?.publisherProfile
                                                ?.avatarURL && (
                                                <Dropdown.Item
                                                    href="#"
                                                    className="mt-2"
                                                    onClick={deleteCover}>
                                                    <i className="fas fa-trash mr-2 c-red" />
                                                    Delete Avatar
                                                </Dropdown.Item>
                                            )}

                                            <Dropdown.Item
                                                href="#"
                                                className="mt-2 mb-2"
                                                onClick={
                                                    openModalToUploadCoverPublisher
                                                }>
                                                <i className="fas fa-upload mr-2 c-red" />
                                                Upload Avatar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )}
                        </div>
                    )}
                    <h2 className="publisher-left_title font-bold">
                        {PBPageLoading ? (
                            <BlockPlaceholder
                                width={120}
                                height={25}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        ) : (
                            <>{PBInformation?.item.publisherProfile?.name}</>
                        )}
                    </h2>
                    <p className="publisher-left_txt ">Publisher</p>
                </div>

                <ul className="list list-unstyled mb-0">
                    <li className="list-item">
                        <span className="number-item  d-block">
                            {PBPageLoading ? (
                                <BlockPlaceholder
                                    width={100}
                                    height={18}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0"
                                />
                            ) : (
                                PBInformation?.eventsCount
                            )}
                        </span>
                        <span className="txt-iten d-block">Events</span>
                    </li>
                    <li className="list-item">
                        <span className="number-item d-block">
                            {PBPageLoading ? (
                                <BlockPlaceholder
                                    width={80}
                                    height={18}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0"
                                />
                            ) : (
                                PBInformation?.albumsCount
                            )}
                        </span>
                        <span className="txt-iten d-block">Albums</span>
                    </li>
                    <li className="list-item">
                        <span className="number-item  d-block">
                            {PBPageLoading ? (
                                <BlockPlaceholder
                                    width={100}
                                    height={18}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0"
                                />
                            ) : (
                                PBInformation?.photosCount
                            )}
                        </span>
                        <span className="txt-iten d-block">Photos</span>
                    </li>
                    {PBInformation?.item.id === userInfo?.id && (
                        <li className="list-item position-relative">
                            <Link to={ALL_URL.EDIT_PUBLISHER_INFORMATION}>
                                <button className="btn btn-danger bgc-red border-0 w-100">
                                    Edit Profile
                                </button>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default LeftBlock;
