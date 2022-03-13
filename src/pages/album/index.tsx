import React, { useEffect, useState } from 'react';
import MainTemplate from 'features/main-template/MainTemplate';
import 'assets/css/album-page.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
    checkPublisher,
    countryFlag,
    eventStatus,
    eventUrlPublicPrivate,
    filterAlbumImages,
    getEventDate,
    GetEventPublicPrivate,
    goToBuy,
    history,
    keyGenerator
} from 'utils/helpers';
import { setCurrentAlbum, setCurrentEvent } from 'redux/events.slice';
import { setEventID } from 'redux/modals';
import { GetAlbum, GetAlbumFiles } from 'api/all-apis';
import AlbumBlock from './components/album-block';
import ModalUploadAlbumsPage from 'features/modal-upload-image-album-page/modal-upload-albums';
import BlockPlaceholder from 'features/block-placeholder';
import { DEF_URL } from 'utils/urls';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { Spinner } from 'react-bootstrap';
import {
    CircularProgress,
    FormControlLabel,
    Radio,
    RadioGroup,
    Tooltip
} from '@material-ui/core';
import { albumFileT, filters } from '../create-book/Components/Digital/digital';
import { AxiosResponse } from 'axios';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';

const Album = () => {
    const dispatch = useDispatch();
    const { id }: { id: string } = useParams();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const currentEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const [albumFileTypes, setAlbumTypes] = useState(albumFileT.showAll);
    const [files, setFiles] = useState<any>([]);
    const [AllAlbumsThisEvent, setAllAlbumsThisEvent] = useState([]);

    const album = useSelector((state: IEvents) => state.events.currentAlbum);
    const iAmCreator = checkPublisher(userInfo?.id, album?.userId);

    useEffect(() => {
        imagesChangeView();
    }, []);

    useEffect(() => {
        if (album) {
            GetEventPublicPrivate(
                album.userEventId,
                album.userEvent.isAvailable
                    ? eventStatus.public
                    : eventStatus.private,
                {
                    'append[0]': 'user'
                },
                function (res: AxiosResponse) {
                    dispatch(setCurrentEvent(res.data.data.item));
                }
            );
        }
    }, [album]);

    const [loading, setLoading] = useState<boolean>(false);
    function imagesChangeView() {
        GetAlbum(id, {
            'append[0]': 'files',
            'append[1]': 'files.likes'
        }).then((res) => {
            const albumFiles = res?.data?.data?.item;
            if (albumFiles) {
                dispatch(setCurrentAlbum(res.data.data.item));
                dispatch(setEventID(albumFiles.userEvent.id));
            }
        });

        setLoading(true);
        GetAlbumFiles(id, {
            'page[number]': '1',
            'page[size]': '1000',
            sort: 'name'
        })
            .then((res) => {
                const files = res.data.data.items;
                setFiles(files);
                setAllAlbumsThisEvent(files);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    useEffect(() => {
        filterAlbumImages(
            albumFileTypes,
            AllAlbumsThisEvent,
            (res: IAlbumFiles[]) => setFiles(res)
        );
    }, [id, albumFileTypes]);

    const [openCLoseModalUpload, setOpenCLoseModalUpload] =
        useState<boolean>(false);

    function closeUploadModal() {
        setOpenCLoseModalUpload(false);
    }

    function openModalUpload() {
        setOpenCLoseModalUpload(true);
    }

    const isEditTable = checkPublisher(album?.userId, userInfo?.id);

    function openPublisherProfile() {
        history.push(`${DEF_URL.PUBLISHER_PROFILE}/${album.user.id}`);
    }

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    function buyThisAlbum() {
        setBuyLoading(true);
        dispatch(
            goToBuy(
                album?.userId,
                userInfo?.id,
                {
                    entityType: 'Album',
                    entityId: album.id,
                    qty: 1
                },
                () => setBuyLoading(false)
            )
        );
    }

    const changeRadios = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlbumTypes((event.target as HTMLInputElement).value);
    };

    const [buoyed, setBuoyed] = useState<boolean>(false);

    const PrintRadio = (value: string) => (
        <FormControlLabel
            key={keyGenerator(20)}
            value={value}
            control={<Radio />}
            label={value}
        />
    );

    const usePrint = (filter: string) => {
        if (filter === albumFileT.onlyBought) {
            return !iAmCreator && PrintRadio(filter);
        } else {
            return PrintRadio(filter);
        }
    };
    return (
        <div className="event-details-page library-grid previous-orders serp-page folder-view">
            <MainTemplate blackLogo={true} shopBlock={true}>
                <div className="main-form w-100">
                    <div className="back-box">
                        <div className="container-fluid wrapper1">
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="d-flex flex-md-row  flex-column align-items-center justify-content-md-start justify-content-center">
                                        <ul className="d-flex mb-0 fs15">
                                            <li className="c-black mr-1">
                                                Album Name
                                            </li>
                                            <li className="c-black mr-1">
                                                {'>'}
                                            </li>
                                            <li className="c-gray">
                                                {album?.name}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="folder-part">
                        <div className="container-fluid wrapper1">
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <h2 className="fs35 mb-4 text-sm-left">
                                        <i className="fas fa-folder mr-3" />
                                        {album?.name}
                                    </h2>
                                    <div className="total-box">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="total-box_txt">
                                                <h3 className="total-box_title f-omnesMedium fs16 c-gray">
                                                    Total Photos
                                                </h3>
                                                <span className="fs23 mb-4 d-inline-block f-omnesMedium">
                                                    {album ? (
                                                        album?.albumFilesCount
                                                    ) : (
                                                        <BlockPlaceholder
                                                            width={50}
                                                            height={20}
                                                            borderRadius={5}
                                                            status={true}
                                                            count={1}
                                                            className="m-0"
                                                        />
                                                    )}
                                                </span>
                                                <h3 className="total-box_title f-omnesMedium fs16 c-gray">
                                                    Total Price
                                                </h3>
                                                <span className="d-inline-block fs23 c-red f-omnesMedium">
                                                    {album ? (
                                                        `$${album.price}`
                                                    ) : (
                                                        <BlockPlaceholder
                                                            width={50}
                                                            height={20}
                                                            borderRadius={5}
                                                            status={true}
                                                            count={1}
                                                            className="m-0"
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                            {album ? (
                                                <Tooltip
                                                    title={album.user.firstName}
                                                    placement="bottom">
                                                    <div
                                                        className="total-box_img"
                                                        style={{
                                                            backgroundImage: `url(${
                                                                album.user
                                                                    .avatarURL ||
                                                                FanbookDefault
                                                            })`
                                                        }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <BlockPlaceholder
                                                    width={80}
                                                    height={80}
                                                    borderRadius={5}
                                                    status={true}
                                                    count={1}
                                                    className="m-0"
                                                />
                                            )}
                                        </div>
                                        {album && !isEditTable && (
                                            <span
                                                className={`event-btn fs17 trans ${
                                                    buoyed
                                                        ? 'bgc-red c-white border-0'
                                                        : 'c-red'
                                                }`}
                                                onClick={buyThisAlbum}>
                                                {buyLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        variant="danger"
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <i className="fas fa-shopping-cart mr-3" />
                                                )}

                                                {album && (
                                                    <CheckInCard
                                                        productID={
                                                            album.id || ''
                                                        }
                                                        price={null}
                                                        buyName="Buy All Photos"
                                                        buoyed={(
                                                            res: boolean
                                                        ) => setBuoyed(res)}
                                                    />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6 col-12">
                                    <div className="folder-box-right library-section">
                                        <div className="d-flex">
                                            {currentEvent.id ? (
                                                <div
                                                    className="box mr-3 pb d-flex justify-content-center align-items-center c-white fs25 font-bold"
                                                    style={{
                                                        background: `url(${
                                                            currentEvent.coverURL ||
                                                            FanbookDefault
                                                        })`
                                                    }}
                                                />
                                            ) : (
                                                <BlockPlaceholder
                                                    width={53}
                                                    height={50}
                                                    borderRadius={10}
                                                    status={true}
                                                    count={1}
                                                    className="m-0 mr-3"
                                                />
                                            )}
                                            <div className="d-flex flex-column ">
                                                <h2 className="fs20 lh-07 mb-2">
                                                    {currentEvent.id ? (
                                                        currentEvent.name
                                                    ) : (
                                                        <BlockPlaceholder
                                                            width={130}
                                                            height={20}
                                                            borderRadius={5}
                                                            status={true}
                                                            count={1}
                                                            className="m-0"
                                                        />
                                                    )}
                                                </h2>
                                                <p className="library-txt fs16 mb-4 ">
                                                    By:
                                                    <span
                                                        className="c-red b-bottom ml-2 cursor-pointer"
                                                        onClick={
                                                            openPublisherProfile
                                                        }>
                                                        {currentEvent.id ? (
                                                            currentEvent.user
                                                                .publisherProfile
                                                                ?.name
                                                        ) : (
                                                            <BlockPlaceholder
                                                                width={100}
                                                                height={10}
                                                                borderRadius={2}
                                                                status={true}
                                                                count={1}
                                                                className="m-0"
                                                            />
                                                        )}
                                                    </span>
                                                </p>
                                                <ul className="d-flex flex-column mb-4">
                                                    <li className="f-myriadprolight fs16 mr-3 mb-3">
                                                        {currentEvent.id ? (
                                                            getEventDate(
                                                                currentEvent
                                                            )
                                                        ) : (
                                                            <BlockPlaceholder
                                                                width={100}
                                                                height={20}
                                                                borderRadius={5}
                                                                status={true}
                                                                count={1}
                                                                className="m-0"
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="fs16">
                                                        {currentEvent.id ? (
                                                            <img
                                                                style={{
                                                                    width: '30px'
                                                                }}
                                                                className="mr-2 rounded"
                                                                src={countryFlag(
                                                                    currentEvent
                                                                )}
                                                                alt="event country flag"
                                                            />
                                                        ) : (
                                                            <BlockPlaceholder
                                                                width={30}
                                                                height={20}
                                                                borderRadius={2}
                                                                status={true}
                                                                count={1}
                                                                className="m-0 mr-2"
                                                            />
                                                        )}

                                                        <span className="b-bottom c-black">
                                                            {currentEvent.id ? (
                                                                currentEvent
                                                                    .geolocation
                                                                    .country
                                                            ) : (
                                                                <BlockPlaceholder
                                                                    width={130}
                                                                    height={10}
                                                                    borderRadius={
                                                                        2
                                                                    }
                                                                    status={
                                                                        true
                                                                    }
                                                                    count={1}
                                                                    className="m-0"
                                                                />
                                                            )}
                                                        </span>
                                                    </li>
                                                </ul>
                                                {album && (
                                                    <Link
                                                        className="event-btn fs17 trans"
                                                        to={eventUrlPublicPrivate(
                                                            album?.userEvent
                                                        )}>
                                                        Go to Event page
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="serp-section content-section ">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col-12">
                                <div className="folder-section w-100 p-0">
                                    <div className="folder-box d-flex justify-content-md-start align-items-center flex-column flex-md-row">
                                        <p className="fs24 c-black mr-5 f-omnesMedium">
                                            All Photos
                                        </p>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="album-filter"
                                            className="d-flex flex-nowrap flex-row"
                                            value={albumFileTypes}
                                            onChange={changeRadios}>
                                            {filters.map((filter) =>
                                                usePrint(filter)
                                            )}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-start py-5">
                            {isEditTable && (
                                <div className="w-100 col-xl-2 col-lg-4 col-sm-6 col-12 mb-4">
                                    <div className="content-box h-100 d-flex justify-content-center align-items-center trans">
                                        <div className="more-fild text-center p-5">
                                            <p className="fs20 c-black f-myriadproreg mb-2">
                                                Hey {userInfo?.firstName},
                                            </p>
                                            <p className="fs16 c-black f-myriadproreg mb-4">
                                                Adding more photos?
                                            </p>
                                            <span
                                                onClick={openModalUpload}
                                                className="see-btn fs16 d-inline-block text-center f-myriadproreg trans c-black">
                                                <i className="fas fa-download mr-2" />
                                                Upload
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center mt-2 w-100">
                                    <CircularProgress />
                                </div>
                            ) : (
                                files?.map((img: any) => (
                                    <AlbumBlock
                                        key={keyGenerator(30)}
                                        album={album}
                                        img={img}
                                        addLikeArray={imagesChangeView}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </MainTemplate>
            <ModalUploadAlbumsPage
                closeModal={closeUploadModal}
                showHide={openCLoseModalUpload}
                albumID={id}
            />
            {/*<EditImage />*/}
        </div>
    );
};

export default Album;
