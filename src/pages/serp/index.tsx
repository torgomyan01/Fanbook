import React, { useEffect, useState } from 'react';
import 'assets/css/serp.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { AllRequestsEventPublic } from 'api/all-apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DEF_URL } from 'utils/urls';
import PrintPhotos from './components/print-photos';

const tablesName = {
    ALL_PHOTOS: 'event-photos',
    OTHERS: 'photo-others',
    MY_PHOTO: 'my-photo'
};

const SHOWING_TABLES = {
    SHOW_ALL: 'show-all',
    FAVORIT: 'favorited',
    SHOW_ONLY_BOUGHT: 'show-only-bought'
};

function Serp() {
    const AllFiles = useSelector((state: ILibrary) => state.Library.AllFiles);
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const dispatch = useDispatch();
    const { eventID }: { eventID: string } = useParams();

    const [tableSearchPhotos, setTableSearchPhotos] = useState('event-photos');

    const [AllImages, setAllImages] = useState<any>([]);

    const [AllPhotos, setAllPhotos] = useState([]);
    const [OtherPhotos, setOtherPhotos] = useState([]);
    const [MyPhotos, setMyPhotos] = useState([]);

    const [AllPhotosCount, setAllPhotosCount] = useState(0);
    const [OtherPhotosCount, setOtherPhotosCount] = useState(0);
    const [MyPhotosCount, setMyPhotosCount] = useState(0);

    useEffect(() => {
        AllRequestsEventPublic(eventID, {
            'append[0]': 'albums'
        }).then((res) => {
            console.log(res);
        });
        // getEventAllAlbumFiles(eventID, 'all', true, true, true, false).then(
        //     (res) => {
        //         dispatch(setAllLibrary(res.data.data.albums));
        //     }
        // );
    }, [dispatch, eventID]);

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        setAllPhotos(AllImages);

        const FilterOtherPhoto = AllImages.filter(
            (images: OneAlbum) => images.userId !== userInfo?.id
        );
        const FilterMyPhotos = AllImages.filter(
            (images: OneAlbum) => images.userId === userInfo?.id
        );
        setMyPhotos(FilterMyPhotos);
        setOtherPhotos(FilterOtherPhoto);
    }, [AllImages]);

    useEffect(() => {
        setAllImages([]);

        setAllPhotosCount(0);
        setOtherPhotosCount(0);
        setMyPhotosCount(0);
        AllFiles?.map((folder: any) => {
            folder.albumFiles.map((album: OneAlbum) => {
                setAllImages((oldArray: any) => [...oldArray, album] as any);

                setAllPhotosCount((AllPhotosCount) => AllPhotosCount + 1);
                if (album.userId === userInfo?.id) {
                    setMyPhotosCount((MyPhotosCount) => MyPhotosCount + 1);
                } else {
                    setOtherPhotosCount(
                        (OtherPhotosCount) => OtherPhotosCount + 1
                    );
                }
            });
        });
    }, [AllFiles]);

    function photosEvents() {
        setTableSearchPhotos(tablesName.ALL_PHOTOS);
    }

    function photosOthers() {
        setTableSearchPhotos(tablesName.OTHERS);
    }

    function MyPhoto() {
        setTableSearchPhotos(tablesName.MY_PHOTO);
    }
    function FavoritView() {
        setAllImages([]);
        // eslint-disable-next-line array-callback-return
        AllFiles.map((folder: any) => {
            // eslint-disable-next-line array-callback-return
            folder.albumFiles.map((album: OneAlbum) => {
                // eslint-disable-next-line array-callback-return
                album.likes.map((likes: IAlbumLikes) => {
                    if (likes.userId === userInfo?.id) {
                        setAllImages(
                            (oldArray: any) => [...oldArray, album] as any
                        );
                    }
                });
            });
        });
    }
    function showALl() {
        setAllImages([]);
        // eslint-disable-next-line array-callback-return
        AllFiles.map((folder: any) => {
            // eslint-disable-next-line array-callback-return
            folder.albumFiles.map((album: OneAlbum) => {
                setAllImages((oldArray: any) => [...oldArray, album] as any);
            });
        });
    }

    function changesInputs(e: any) {
        const dataName = e.target.getAttribute('data-name');
        switch (dataName) {
            case SHOWING_TABLES.FAVORIT:
                FavoritView();
                break;
            case SHOWING_TABLES.SHOW_ALL:
                showALl();
                break;
        }
    }

    function ViewImages(): any {
        switch (tableSearchPhotos) {
            case tablesName.ALL_PHOTOS:
                return <PrintPhotos photos={AllPhotos as []} />;
            case tablesName.OTHERS:
                return <PrintPhotos photos={OtherPhotos as []} />;
            case tablesName.MY_PHOTO:
                return <PrintPhotos photos={MyPhotos as []} />;
            default:
                return (
                    <h1 className="no-result-found-serp">No Results Found</h1>
                );
        }
    }

    return (
        <div className="event-details-page sresult-grid-page serp-page">
            <MainTemplate blackLogo={true} shopBlock={true} searchBlock={true}>
                <div
                    className="main-form w-100 pt-4 pb-4 border-bottom"
                    style={{ background: '#fff' }}>
                    <div className="row">
                        <div className="col-12 d-lg-flex align-items-center justify-content-start pl-5">
                            <Link
                                to={`${DEF_URL.LIBRARY}/${eventID}`}
                                className="back-txt c-black fs19 mr-5 d-inline-block mb-md-0 mb-3 text-center back-link">
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="c-red"
                                />
                                <span className="b-bottom ml-2">
                                    Back to Library
                                </span>
                            </Link>
                            {/*<div*/}
                            {/*    className="search-box d-flex justify-content-start align-items-center mr-lg-4 mr-0 mb-lg-0 mb-3 w-100 position-relative">*/}
                            {/*    <div className="library-add-block">*/}
                            {/*        /!*{this.state.LibraryArray}*!/*/}
                            {/*    </div>*/}
                            {/*    <form*/}
                            {/*        // onSubmit={this.addLibrary}*/}
                            {/*        className="input-add-library">*/}
                            {/*        <input type="text"*/}
                            {/*            // ref={(element) => (this.textInput = element)}*/}
                            {/*               placeholder="Library Name" className="input-add-library" />*/}
                            {/*    </form>*/}
                            {/*    <div className="input-close_icon position-absolute">*/}
                            {/*        <FontAwesomeIcon icon={faSearch} className="mr-2" />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                <section className="serp-section content-section ">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <nav>
                                    <div
                                        className="nav nav-tabs flex-sm-row flex-column pt-3"
                                        id="nav-tab"
                                        role="tablist">
                                        <Link
                                            onClick={photosEvents}
                                            className={
                                                tableSearchPhotos ===
                                                'event-photos'
                                                    ? 'nav-item nav-link f-omnesMedium active mb-sm-0 mb-3  show'
                                                    : 'nav-item nav-link f-omnesMedium mb-sm-0 mb-3  show'
                                            }
                                            id="nav-home-tab"
                                            data-toggle="tab"
                                            to="#"
                                            role="tab"
                                            aria-controls="nav-home"
                                            aria-selected="true">
                                            <span className="sum-item c-white fs16 ">
                                                {AllPhotosCount}
                                            </span>
                                            <p className="sum-txt fs24 mb-0 ">
                                                Event Photos
                                            </p>
                                        </Link>
                                        <Link
                                            onClick={photosOthers}
                                            className={
                                                tableSearchPhotos ===
                                                'photo-others'
                                                    ? 'nav-item nav-link f-omnesMedium active mb-sm-0 mb-3  show'
                                                    : 'nav-item nav-link f-omnesMedium mb-sm-0 mb-3  show'
                                            }
                                            id="nav-profile-tab"
                                            data-toggle="tab"
                                            to="#"
                                            role="tab"
                                            aria-controls="nav-profile"
                                            aria-selected="false">
                                            <span className="sum-item c-white fs16 ">
                                                {OtherPhotosCount}
                                            </span>
                                            <p className="sum-txt fs24 mb-0 ">
                                                From Others
                                            </p>
                                        </Link>
                                        <Link
                                            onClick={MyPhoto}
                                            className={
                                                tableSearchPhotos === 'my-photo'
                                                    ? 'nav-item nav-link f-omnesMedium active mb-sm-0 mb-3  show'
                                                    : 'nav-item nav-link f-omnesMedium mb-sm-0 mb-3  show'
                                            }
                                            id="nav-contact-tab"
                                            data-toggle="tab"
                                            to="#"
                                            role="tab"
                                            aria-controls="nav-contact"
                                            aria-selected="false">
                                            <span className="sum-item c-white fs16 ">
                                                {MyPhotosCount}
                                            </span>
                                            <p className="sum-txt fs24 mb-0">
                                                My Photos
                                            </p>
                                        </Link>
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <div className="tab-content" id="nav-tabContent">
                            <div
                                className="tab-pane event-photo-block fade active show"
                                id="nav-home"
                                role="tabpanel"
                                aria-labelledby="nav-home-tab">
                                <div className="row">
                                    <div className="col-12">
                                        <form action="">
                                            <ul className="form-box d-flex flex-lg-nowrap flex-wrap align-items-center">
                                                <li className="radio-item">
                                                    <input
                                                        id="ra-1"
                                                        onChange={changesInputs}
                                                        data-name={
                                                            SHOWING_TABLES.SHOW_ALL
                                                        }
                                                        type="radio"
                                                        name="radio-b"
                                                    />
                                                    <label
                                                        htmlFor="ra-1"
                                                        className="f-myriadproreg mb-0">
                                                        Show all
                                                    </label>
                                                </li>
                                                <li className="radio-item">
                                                    <input
                                                        id="ra-2"
                                                        type="radio"
                                                        data-name={
                                                            SHOWING_TABLES.FAVORIT
                                                        }
                                                        onChange={changesInputs}
                                                        name="radio-b"
                                                    />
                                                    <label
                                                        htmlFor="ra-2"
                                                        className="f-myriadproreg mb-0">
                                                        Show only favorited
                                                    </label>
                                                </li>
                                                <li className="radio-item">
                                                    <input
                                                        id="ra-3"
                                                        type="radio"
                                                        data-name={
                                                            SHOWING_TABLES.SHOW_ONLY_BOUGHT
                                                        }
                                                        onChange={changesInputs}
                                                        name="radio-b"
                                                    />
                                                    <label
                                                        htmlFor="ra-3"
                                                        className="f-myriadproreg mb-0">
                                                        Show only bought
                                                    </label>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>

                                <div className="row">
                                    <ViewImages />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainTemplate>
        </div>
    );
}

export default Serp;
