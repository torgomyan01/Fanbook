import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCamera,
    faEdit,
    faEllipsisV,
    faFolder,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Spinner } from 'react-bootstrap';
import DefaultImage from 'assets/images/fanbookDefault.jpg';

import {
    checkPublisher,
    goToBuy,
    keyGenerator,
    userProfile
} from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { OpenCloseModal, SetFile } from 'redux/edit-folder';
import { OpenCloseModalForDelete, SetFileForDelete } from 'redux/delete-folder';
import { DEF_URL } from 'utils/urls';
import { setAddIdModalEdit, setOpenEditAlbumModal } from 'redux/modals';
import CheckInCard from 'features/CheckInCard/check-in-card';

interface IProps {
    type: string;
    files: any;
}

function LibraryList({ type, files }: IProps) {
    const dispatch = useDispatch();
    const User = userProfile();
    const [image, setImage] = useState<any>([]);
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    useEffect(() => {
        setImage([
            `${files?.albumFiles[0] ? files.albumFiles[0].url : DefaultImage}`,
            `${files?.albumFiles[1] ? files.albumFiles[1].url : DefaultImage}`,
            `${files?.albumFiles[2] ? files.albumFiles[2].url : DefaultImage}`,
            `${files?.albumFiles[3] ? files.albumFiles[3].url : DefaultImage}`
        ]);
    }, [files]);

    function opnModalEditFolder() {
        dispatch(OpenCloseModal(true));
        dispatch(SetFile(files));
    }
    function OpenModalForDelete() {
        dispatch(OpenCloseModalForDelete(true));
        dispatch(SetFileForDelete(files));
    }
    function openModalEditPhotos() {
        dispatch(setOpenEditAlbumModal(true));
        dispatch(setAddIdModalEdit(files.id));
    }

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    function buyThisImage(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        setBuyLoading(true);
        dispatch(
            goToBuy(
                files?.userId,
                userInfo?.id,
                {
                    entityType: 'Album',
                    entityId: files.id,
                    qty: 1
                },
                () => setBuyLoading(false)
            )
        );
    }

    const IPublisher = checkPublisher(files?.userId, userInfo?.id);

    const [buoyed, setBuoyed] = useState<boolean>(false);
    return (
        <>
            {type === 'grid' ? (
                <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-xl-0 mb-3 mt-3 mr-3">
                    <div className="photo-box trans">
                        <div className="d-flex mt-2">
                            <span
                                className="photo-img mr-2"
                                style={{
                                    backgroundImage: `url(${image[0]})`
                                }}
                            />
                            <span
                                className="photo-img"
                                style={{
                                    backgroundImage: `url(${image[1]})`
                                }}
                            />
                        </div>
                        <div className="d-flex mt-2">
                            <span
                                className="photo-img mr-2"
                                style={{
                                    backgroundImage: `url(${image[2]})`
                                }}
                            />
                            <span
                                className="photo-img"
                                style={{
                                    backgroundImage: `url(${image[3]})`
                                }}
                            />
                            {/*<span className="c-white fs19 f-myriadproreg">+130</span>*/}
                        </div>
                        <div className="d-flex align-items-center justify-content-between pt-2">
                            <Link
                                to={`${DEF_URL.ALBUM}/${files.id}`}
                                className="d-flex c-black flex-column justify-content-between">
                                <h3 className="mb-0 fs18 f-omnesMedium">
                                    {files.name.length > 12
                                        ? `${files.name.substr(0, 12)}...`
                                        : files.name}
                                </h3>
                                <span className="c-gray fs15 f-myriadproreg">
                                    {files.albumFiles?.length > 1
                                        ? `${files.albumFiles?.length} photos`
                                        : `${files.albumFiles?.length} photo`}
                                </span>
                            </Link>
                            <div className="d-flex align-items-center">
                                {files.price > 0 && !IPublisher && (
                                    <Link
                                        to="#"
                                        onClick={buyThisImage}
                                        className={`buy-btn d-inline-block text-center fs16 f-omnesMedium trans ${
                                            files.userId === User?.id && 'mr-0'
                                        } ${buoyed && 'bgc-red c-white'}`}>
                                        {buyLoading ? (
                                            <Spinner
                                                animation="border"
                                                variant="light"
                                                className="mr-2"
                                            />
                                        ) : (
                                            <i className="fas fa-shopping-cart mr-2" />
                                        )}
                                        <CheckInCard
                                            productID={files.id}
                                            price={files.price}
                                            buyName={null}
                                            buoyed={(res: boolean) =>
                                                setBuoyed(res)
                                            }
                                        />
                                    </Link>
                                )}

                                {files.userId === User?.id && (
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-light">
                                            <FontAwesomeIcon
                                                icon={faEllipsisV}
                                                className="c-gray fs18"
                                            />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                to="#"
                                                onClick={opnModalEditFolder}>
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    style={{ color: '#1479fc' }}
                                                    className="mr-3"
                                                />
                                                Edit Album
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                to="#"
                                                onClick={openModalEditPhotos}>
                                                <FontAwesomeIcon
                                                    icon={faCamera}
                                                    style={{ color: '#1479fc' }}
                                                    className="mr-3"
                                                />
                                                Edit Photos
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                to="#"
                                                onClick={OpenModalForDelete}>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ color: '#b12029' }}
                                                    className="mr-3"
                                                />
                                                Delete Album
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="tableBlockToList">
                    <table className="folder-table w-100">
                        <tbody>
                            <tr className="trans pt-3 pb-3">
                                <td>
                                    <div className="d-flex">
                                        <span className="mr-2">
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="mt-1"
                                            />
                                        </span>
                                        <div>
                                            <Link
                                                to={`${DEF_URL.ALBUM}/${files.id}`}
                                                className="c-black">
                                                <h3 className="mb-0 fs18 f-omnesMedium">
                                                    {files.name}
                                                </h3>
                                            </Link>
                                            <span className="c-gray fs15 f-myriadproreg">
                                                {files.albumFiles?.length > 1
                                                    ? `${files.albumFiles?.length} photos`
                                                    : `${files.albumFiles?.length} photo`}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ width: '30%' }}>
                                    <ul className="mb-0 d-flex">
                                        {files?.albumFiles
                                            ?.slice(0, 6)
                                            .map((e: any) => {
                                                return (
                                                    <li
                                                        key={keyGenerator(30)}
                                                        className="img-box mr-1"
                                                        style={{
                                                            backgroundImage: `url(${e.url})`
                                                        }}
                                                    />
                                                );
                                            })}
                                        <li className="img-box mr-1">
                                            <span className="c-red fs16 b-bottom f-myriadproreg">
                                                {files?.albumFiles.length > 6 &&
                                                    `+${
                                                        files?.albumFiles
                                                            .length - 6
                                                    }`}
                                            </span>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center justify-content-end">
                                        {files.price > 0 && !IPublisher && (
                                            <Link
                                                to="#"
                                                onClick={buyThisImage}
                                                className={`buy-btn d-inline-block text-center fs16 f-omnesMedium trans ${
                                                    buoyed && 'bgc-red c-white'
                                                }`}>
                                                {buyLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        variant="light"
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <i className="fas fa-shopping-cart mr-2" />
                                                )}
                                                <CheckInCard
                                                    productID={files.id}
                                                    price={files.price}
                                                    buyName={null}
                                                    buoyed={(res: boolean) =>
                                                        setBuoyed(res)
                                                    }
                                                />
                                            </Link>
                                        )}

                                        {files.userId === User?.id && (
                                            <Dropdown>
                                                <Dropdown.Toggle variant="outline-light">
                                                    <FontAwesomeIcon
                                                        icon={faEllipsisV}
                                                        className="c-gray fs18"
                                                    />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        to="#"
                                                        onClick={
                                                            opnModalEditFolder
                                                        }>
                                                        <FontAwesomeIcon
                                                            icon={faEdit}
                                                            style={{
                                                                color: '#1479fc'
                                                            }}
                                                            className="mr-3"
                                                        />
                                                        Edit Album
                                                    </Dropdown.Item>

                                                    <Dropdown.Item
                                                        to="#"
                                                        onClick={
                                                            openModalEditPhotos
                                                        }>
                                                        <FontAwesomeIcon
                                                            icon={faCamera}
                                                            style={{
                                                                color: '#1479fc'
                                                            }}
                                                            className="mr-3"
                                                        />
                                                        Edit Photos
                                                    </Dropdown.Item>

                                                    <Dropdown.Item
                                                        to="#"
                                                        onClick={
                                                            OpenModalForDelete
                                                        }>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            style={{
                                                                color: '#b12029'
                                                            }}
                                                            className="mr-3"
                                                        />
                                                        Delete Album
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default LibraryList;
