import React, { useEffect, useRef, useState } from 'react';
import 'assets/css/my-drafts.css';
import MainTemplate from 'features/main-template/MainTemplate';
import { isUserLogin, keyGenerator } from 'utils/helpers';
import { GetAlbumList, GetAllBooks, GetAllPoster } from 'api/all-apis';
import { useSelector } from 'react-redux';
import AlbumBlockDraft from './components/album-block-draft';
import BookBlockDraft from './components/book-block-draft';
import FilesLoading from './components/files-loading';
import EditStatusBookModal from 'features/edit-status-book/edit-status-book';
import EditStatusAlbumModal from 'features/edit-status-album/edit-status-book';
import EditStatusPoster from 'features/edit-status-poster/edit-status-event-modal';
import DeleteBookModal from 'features/delete-book-modal';
import EditBookModal from 'features/edit-book-modal';
import { Box, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import ModalAddAlbum from '../event-detail/modal/add-album';
import DeleteAlbumModal from 'features/delete-album-modal';
import ModalDeletePoster from 'features/modal-delete-poster/modal-delete-poster';
import ModalEditFolder from 'pages/library/modal/edit-folder';
import PosterBlockDrafts from './components/poster-block-drafts';
import ModalEditPoster from 'pages/event-detail/components/modal-edit-poster';
import moment from 'moment';
import openBook from 'assets/images/book/open-book.png';
import openFolder from 'assets/images/albums/open-folder.png';
import openPoster from 'assets/images/poster/poster.png';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
    };
}

const fixClassName: string = 'fixTop';

function NoResultTable({ text, img }: { text: string; img: string }) {
    return (
        <div className="d-flex justify-content-center flex-column align-items-center mt-5">
            <img
                src={img}
                alt="No result book"
                width={180}
                style={{ opacity: 0.2 }}
            />
            <h1
                className="no-result-h1"
                style={{
                    margin: '10px 0 100px 0',
                    fontSize: 28
                }}>
                {text}
            </h1>
        </div>
    );
}

function MyDrafts() {
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const [albums, setAlbums] = useState<OneAlbum[]>([]);

    const [books, setBooks] = useState<IBookInfo[]>([]);
    const [posters, setPosters] = useState<IPosterInfo[]>([]);

    const [loadingAlbums, setLoadingAlbums] = useState<boolean>(true);
    const [loadingBook, setLoadingBook] = useState<boolean>(true);
    const [loadingPosters, setLoadingPoster] = useState<boolean>(true);

    useEffect(() => {
        if (userInfo) {
            // GET ALBUMS
            GetAlbumList({
                'page[number]': 1,
                'page[size]': 1000,
                sort: '-createdAt',
                'append[0]': 'files',
                'append[1]': 'files.likes',
                'append[2]': 'user',
                'append[3]': 'userEvent',
                'append[4]': 'files',
                'filter[userId]': userInfo.id,
                'filter[type]': 'user'
            }).then((res) => {
                const albums: OneAlbum[] = res.data.data.items;
                setAlbums(albums);
                setLoadingAlbums(false);
            });

            // GET BOOKS
            GetAllBooks({
                'page[number]': 1,
                'page[size]': 1000,
                sort: '-createdAt',
                'append[0]': 'user',
                'append[1]': 'userEvent',
                'append[2]': 'files',
                'filter[userId]': userInfo.id,
                'filter[type]': 'user'
            })
                .then((res) => {
                    const books: IBookInfo[] = res.data.data.items;
                    setBooks(books);
                    setLoadingBook(false);
                })
                .catch((err) => {
                    console.log(err);
                });

            // GET POSTERS
            GetAllPoster({
                'page[number]': 1,
                'page[size]': 1000,
                sort: '-createdAt',
                'append[0]': 'user',
                'append[1]': 'userEvent',
                'filter[userId]': userInfo.id,
                'filter[type]': 'user'
            })
                .then((res) => {
                    const posters: IPosterInfo[] = res.data.data.items;
                    setPosters(posters);
                    setLoadingPoster(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userInfo]);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const table = useRef<any>(null);

    useEffect(() => {
        const topPosition: number = table.current?.offsetTop;
        window.onscroll = function () {
            const scrollResult: boolean = window.scrollY > topPosition;
            scrollResult
                ? table?.current?.classList?.add(fixClassName)
                : table?.current?.classList?.remove(fixClassName);
        };
    }, []);

    return (
        <>
            {isUserLogin() && (
                <div className="my-drafts event-details-page shared-block">
                    <MainTemplate blackLogo={true} shopBlock={true}>
                        <div className="container-fluid wrapper1 mt-4">
                            <h1 className="font-bold mt-0 fs34">My Drafts</h1>
                            <Paper className={classes.root}>
                                <Tabs
                                    value={value}
                                    ref={table}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    className="trans"
                                    TabIndicatorProps={{
                                        className: 'bgc-red'
                                    }}
                                    centered>
                                    <Tab
                                        label={
                                            <span className="fs18">
                                                <i className="fas fa-book-open mr-2" />
                                                Books
                                            </span>
                                        }
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label={
                                            <span className="fs18">
                                                <i className="far fa-folder mr-2" />
                                                Albums
                                            </span>
                                        }
                                        {...a11yProps(1)}
                                    />
                                    <Tab
                                        label={
                                            <span className="fs18">
                                                <i className="far fa-image mr-2" />
                                                Posters
                                            </span>
                                        }
                                        {...a11yProps(2)}
                                    />
                                </Tabs>
                            </Paper>
                            <TabPanel value={value} index={0}>
                                {loadingBook ? (
                                    <>
                                        <FilesLoading />
                                        <FilesLoading />
                                    </>
                                ) : books.length > 0 ? (
                                    books.map((book: IBookInfo) => (
                                        <BookBlockDraft
                                            key={keyGenerator(30)}
                                            book={book}
                                        />
                                    ))
                                ) : (
                                    <NoResultTable
                                        text=" There are no books customized yet."
                                        img={openBook}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {loadingAlbums ? (
                                    <>
                                        <FilesLoading />
                                        <FilesLoading />
                                    </>
                                ) : albums.length > 0 ? (
                                    albums.map((album: OneAlbum) => (
                                        <AlbumBlockDraft
                                            key={keyGenerator(30)}
                                            album={album}
                                        />
                                    ))
                                ) : (
                                    <NoResultTable
                                        text="There are no albums created yet."
                                        img={openFolder}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {loadingPosters ? (
                                    <>
                                        <FilesLoading />
                                        <FilesLoading />
                                    </>
                                ) : posters.length > 0 ? (
                                    posters.map((poster: IPosterInfo) => (
                                        <PosterBlockDrafts
                                            key={keyGenerator(30)}
                                            poster={poster}
                                        />
                                    ))
                                ) : (
                                    <NoResultTable
                                        text="There are no posters customized yet."
                                        img={openPoster}
                                    />
                                )}
                            </TabPanel>
                        </div>
                    </MainTemplate>
                    <EditStatusBookModal />
                    <EditStatusAlbumModal />
                    <DeleteBookModal />
                    <EditBookModal />
                    <ModalAddAlbum />
                    <DeleteAlbumModal />
                    <EditStatusPoster />
                    <ModalDeletePoster />
                    <ModalEditFolder />
                    <ModalEditPoster />
                </div>
            )}
        </>
    );
}

export default MyDrafts;
