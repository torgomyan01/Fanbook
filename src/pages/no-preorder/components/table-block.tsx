import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { countryFlag, getEventDate } from 'utils/helpers';
import { getEventAllAlbumFiles } from 'api/all-apis';
import { openAlert, setMessageAlert } from 'redux/alert-site';
import { useDispatch } from 'react-redux';

interface IThisProps {
    event: IEvent;
}

function TableBlock({ event }: IThisProps) {
    const dispatch = useDispatch();
    const [albumLength, setAlbumLength] = useState(0);

    useEffect(() => {
        setAlbumLength(0);
        // getEventAllAlbumFiles(event?.id, 'all', true, true, false, false)
        //     .then((res) => {
        //         res.data.data.albums?.map((album: OneAlbum) => {
        //             setAlbumLength(albumLength + album.albumFiles.length);
        //         });
        //     })
        //     .catch((err) => {
        //         dispatch(openAlert(true));
        //         dispatch(setMessageAlert(err));
        //     });
    }, [event]);
    return (
        <tr>
            <td className="f-myriadprolight fs16">{getEventDate(event)}</td>
            <td className="f-omnesMedium fs19">{event?.name}</td>
            <td>
                <span className="fs16">
                    <img
                        style={{
                            width: '25px'
                        }}
                        src={countryFlag(event)}
                        alt="event country flag"
                    />
                    <Link to="#" className="b-bottom c-black ml-2">
                        {event?.geolocation.country}
                    </Link>
                </span>
            </td>
            <td className="text-right pr-3">
                <span className="f-myriadprolight fs16 mr-3">
                    {event?.books.length} books, {albumLength} photos
                </span>
                <Link to="#" className="btn pre-order-btn f-myriadproSemibold">
                    Pre-order
                </Link>
            </td>
        </tr>
    );
}

export default TableBlock;
