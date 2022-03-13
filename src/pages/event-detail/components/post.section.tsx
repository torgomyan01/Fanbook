import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlbumSection from './album.section';
import { useParams } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import { TAB_NAMES } from 'pages/create-book/settings/tab-names';
import BookBlock from './book-block';
import {
    checkPublisher,
    eventStatus,
    history,
    keyGenerator
} from 'utils/helpers';
import { modalAddPlan, setOpenCreateModalAlbum } from 'redux/modals';
import BookLoading from '../loadings/book-loading';
import PosterBlock from './poster-block';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ModalEditPoster from './modal-edit-poster';
import PosterBlockDoItYourself from './do-it-you-self-poster';
import BlockPlaceholder from 'features/block-placeholder';

const PostSection = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const { status }: { status: string } = useParams();

    function openModalToAddAlbum() {
        dispatch(setOpenCreateModalAlbum(true));
    }

    const iAmPublisher = checkPublisher(userInfo?.id, event.user.id);

    const posterOptionPageUrl = `${DEF_URL.CREATE_BOOK}/${event?.id}/${
        TAB_NAMES.POSTERS
    }/${event?.isAvailable ? eventStatus.public : eventStatus.private}`;

    const bookOptionPageUrl = `${DEF_URL.CREATE_BOOK}/${event?.id}/${TAB_NAMES.BOOK}/${status}`;

    function addPoster() {
        if (event?.posters?.length < myPlan.options.posters.limit) {
            history.push(posterOptionPageUrl);
        } else {
            dispatch(
                modalAddPlan({
                    openClose: true
                })
            );
        }
    }

    function AddAlbumButton() {
        return (
            <span
                className="red-btn cursor-pointer btn-red-hover"
                onClick={openModalToAddAlbum}>
                <i className="fas fa-plus-circle mr-2" />
                Add Album
            </span>
        );
    }

    function AddPosterButton() {
        return (
            <button
                className="red-btn cursor-pointer btn-red-hover btn"
                onClick={addPoster}>
                <i className="fas fa-plus-circle mr-2" />
                Add Poster
            </button>
        );
    }
    function addBook() {
        if (event?.books?.length < myPlan.options.books.perEvent) {
            history.push(bookOptionPageUrl);
        } else {
            dispatch(
                modalAddPlan({
                    openClose: true
                })
            );
        }
    }

    return (
        <section className="post-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-md-8 col-12 mb-md-0">
                        <div className="books-block">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="books-block_title">Books</h3>
                                {iAmPublisher && (
                                    <span
                                        className="red-btn cursor-pointer btn-red-hover"
                                        onClick={addBook}>
                                        <i className="fas fa-plus-circle mr-2" />
                                        Add Book
                                    </span>
                                )}
                            </div>
                            {event?.id === '' ? (
                                <>
                                    <BookLoading />
                                    <BookLoading />
                                </>
                            ) : event?.books?.length > 0 ? (
                                event.books
                                    .filter(
                                        (book: IThisBook) =>
                                            book.userId === event.userId
                                    )
                                    .map((book: IThisBook) => (
                                        <BookBlock
                                            key={keyGenerator(30)}
                                            book={book}
                                            event={event}
                                        />
                                    ))
                            ) : (
                                <p>
                                    {iAmPublisher
                                        ? 'You have not created any pre-built book yet. Start using the button on the right.'
                                        : 'There is no pre-built book yet.'}
                                </p>
                            )}
                        </div>
                        <div className="shared-block">
                            <div className="d-flex justify-content-between">
                                <h2 className="books-block_title">
                                    Shared Albums
                                </h2>
                                {iAmPublisher && <AddAlbumButton />}
                            </div>
                            <div>
                                <p className="shared-txt">
                                    Browse and favorite event photos that you
                                    can use in your Fanbooks.{' '}
                                </p>
                                <p className="shared-txt mb-4">
                                    Click the{' '}
                                    <i className="fas fa-heart c-blue" /> to add
                                    an image to your Favorites or click{' '}
                                    <i className="fas fa-shopping-cart c-blue" />{' '}
                                    the icon to order a print.
                                </p>
                            </div>
                            <AlbumSection />
                        </div>
                        <div className="posters-block">
                            <div className="d-flex justify-content-between">
                                <h2 className="books-block_title">Posters</h2>
                                {iAmPublisher && <AddPosterButton />}
                            </div>
                            {event.posters.length > 0 ? (
                                <div className="posters-box mt-3">
                                    {(event?.posters || [])
                                        .filter(
                                            (poster: IPoster) =>
                                                poster.userId === event.userId
                                        )
                                        .map((poster: IPoster) => (
                                            <PosterBlock
                                                key={keyGenerator(30)}
                                                poster={poster}
                                            />
                                        ))}
                                    {!iAmPublisher && (
                                        <PosterBlockDoItYourself
                                            event={event}
                                        />
                                    )}
                                </div>
                            ) : iAmPublisher ? (
                                'You have not created any posters yet. Start using the button on the right.'
                            ) : (
                                <div className="posters-box">
                                    <PosterBlockDoItYourself event={event} />
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="col-md-4 col-12 pl-xl-5">
                        <div className="red-box">
                            <h2 className="red-box_title">About the event</h2>
                            {event.id ? (
                                <p className="red-box_txt">
                                    {event?.description}
                                </p>
                            ) : (
                                <BlockPlaceholder
                                    width="100%"
                                    height={10}
                                    borderRadius={5}
                                    status={true}
                                    count={30}
                                    difference="random"
                                    className="m-0 d-block mt-2"
                                />
                            )}
                        </div>
                    </aside>
                </div>
            </div>
            <ModalEditPoster />
        </section>
    );
};

export default PostSection;
