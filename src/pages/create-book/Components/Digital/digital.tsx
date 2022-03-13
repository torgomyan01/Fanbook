import React, { useEffect, useState } from 'react';
import SelectEventSection from '../Book/select-event-section';
import { useDispatch, useSelector } from 'react-redux';
import { GetAlbumFiles } from 'api/all-apis';

import {
    createStyles,
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Theme
} from '@material-ui/core';
import EventBlockDigital from './event-block';
import AlbumBlockDigital from './album-block-digital';
import {
    filterAlbumImages,
    GetEventPublicPrivate,
    goToBuy,
    keyGenerator,
    setMessageUser
} from 'utils/helpers';
import { useParams } from 'react-router-dom';
import { UM } from 'utils/user-messages';

export const albumFileT = {
    showAll: 'Show all',
    muFavorites: 'Show only favorites',
    onlyBought: 'Show only bought'
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

export const filters = [
    albumFileT.showAll,
    albumFileT.muFavorites,
    albumFileT.onlyBought
];

function Digital() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const [allAlbums, setAllAlbums] = useState<OneAlbum[]>([]);

    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    // FOR SELECT CHANGES
    const [AlbumsName, setAlbums] = React.useState('');
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAlbums(event.target.value as string);
    };
    const { eventID, eventStatus }: { eventID: string; eventStatus: string } =
        useParams();

    // FOR GET ALL ALBUM FILES EVENT
    useEffect(() => {
        GetEventPublicPrivate(
            eventID,
            eventStatus,
            {
                'append[0]': 'user',
                'append[1]': 'albums',
                'append[2]': 'likes'
            },
            function (res: any) {
                setAllAlbums(res.data.data.item.albums);
            }
        );
    }, [thisEvent]);

    const [albumFileTypes, setAlbumTypes] = useState(albumFileT.showAll);
    const [SelectedFile, setSelectedFile] = useState<IAlbumFiles[]>([]);
    const [currentAlbumFiles, setCurrentAlbumFiles] = useState<IAlbumFiles[]>(
        []
    );
    const [albumID, setAlbumID] = useState<string>('');

    useEffect(() => {
        filterAlbumImages(
            albumFileTypes,
            currentAlbumFiles,
            (res: IAlbumFiles[]) => setSelectedFile(res)
        );
    }, [albumFileTypes]);

    const [currentAlbum, setCurrentAlbum] = useState<OneAlbum>();
    // FIND SELECTED ALBUM
    useEffect(() => {
        if (AlbumsName) {
            const album: any = allAlbums.find(
                (album: OneAlbum) => album.name === AlbumsName
            );
            setAlbumID(album.id);
            setCurrentAlbum(album);
        }
    }, [AlbumsName]);

    // FILTER ALBUM FILES MY LIKES
    useEffect(() => {
        if (albumID) {
            dispatch(setMessageUser(UM.P_W));
            GetAlbumFiles(albumID, {
                'page[number]': '1',
                'page[size]': '1000',
                sort: 'name'
            })
                .then((res) => {
                    const files = res.data.data.items;
                    setSelectedFile(files);
                    setCurrentAlbumFiles(files);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [albumID]);

    const [allImagesPrice, setAllImagesPrice] = useState(0);

    useEffect(() => {
        const reducer = (total: any, num: any) => total + num.price;
        setAllImagesPrice(SelectedFile.reduce(reducer, 0).toFixed(2));
    }, [SelectedFile]);

    function BuyThisAlbum() {
        dispatch(
            goToBuy(currentAlbum?.userId, userInfo?.id, {
                entityType: 'Album',
                entityId: albumID,
                qty: 1
            })
        );
    }

    function goLike(res: IAlbumFiles) {
        const oldArray = [...SelectedFile];
        const likedFile = oldArray.find(
            (img: IAlbumFiles) => img.id === res.id
        );
        if (likedFile) {
            const likedIndexOff = oldArray.indexOf(likedFile);
            oldArray[likedIndexOff].isLiked = !oldArray[likedIndexOff].isLiked;
            setSelectedFile(oldArray);
        }
    }

    const changeRadios = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlbumTypes((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <EventBlockDigital albums={allAlbums} />
            <section className="serp-section content-section bg-white">
                <div className="container-fluid wrapper1">
                    <div className="row ">
                        <div className="col-12">
                            <div className="folder-section w-100 p-0 border-bottom-0">
                                <div className="folder-box digital d-flex flex-lg-row flex-column align-items-lg-center justify-content-between align-items-center w-100">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <p className="fs24 c-black mb-lg-0 mb-3 mr-5 f-omnesMedium">
                                            All Photos
                                        </p>
                                        <form action="">
                                            <div className="form-box d-flex flex-lg-nowrap flex-wrap align-items-center mb-0 mr-4">
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="album-filter"
                                                    className="d-flex flex-nowrap flex-row"
                                                    value={albumFileTypes}
                                                    onChange={changeRadios}>
                                                    {filters.map((filter) => (
                                                        <FormControlLabel
                                                            key={keyGenerator(
                                                                20
                                                            )}
                                                            value={filter}
                                                            control={<Radio />}
                                                            label={filter}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </div>
                                        </form>
                                    </div>
                                    <FormControl
                                        className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">
                                            Select Album
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={AlbumsName}
                                            onChange={handleChange}>
                                            {allAlbums?.map(
                                                (album: OneAlbum) => {
                                                    return (
                                                        <MenuItem
                                                            key={keyGenerator(
                                                                30
                                                            )}
                                                            value={album.name}>
                                                            {album.name}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-start mt-2">
                        {SelectedFile.length > 0 ? (
                            <div className="col-xl-3 col-lg-3 col-sm-5 col-12  mb-4">
                                <div className="content-box h-100 d-flex justify-content-center align-items-center trans">
                                    <div className="more-fild text-left p-3">
                                        <p className="fs16 f-myriadproreg mb-0 c-gray">
                                            Album Photos
                                        </p>
                                        <p className="fs20 font-bold c-black f-myriadproreg mb-2">
                                            {SelectedFile.length}
                                        </p>
                                        <p className="fs16 c-black f-myriadproreg mb-0 mt-3 c-gray">
                                            Price
                                        </p>
                                        <p className="fs20 font-bold c-red f-myriadproreg">
                                            ${allImagesPrice}
                                        </p>
                                        <span
                                            onClick={BuyThisAlbum}
                                            className="see-btn fs16 d-inline-block text-center f-myriadproreg trans c-black mt-2 w-auto px-3">
                                            <i className="fas fa-book mr-2" />
                                            Buy Entire Album
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : AlbumsName ? (
                            <h1
                                className="select-your-album-digital"
                                style={{ margin: '100px 0' }}>
                                No Results
                            </h1>
                        ) : (
                            <h1 className="select-your-album-digital mt-5">
                                Select Your Album
                            </h1>
                        )}

                        {SelectedFile.map((file: IAlbumFiles) => {
                            return (
                                <AlbumBlockDigital
                                    key={keyGenerator(30)}
                                    albumID={albumID}
                                    img={file}
                                    goLike={goLike}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
            <SelectEventSection publisherId={thisEvent.user.id} />
        </>
    );
}

export default Digital;
