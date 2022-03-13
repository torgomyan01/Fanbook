import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
    countryFlag,
    eventUrlPublicPrivate,
    getEventDate,
    history
} from 'utils/helpers';

interface IThisProps {
    event: IEvent;
}

function TableBlock({ event }: IThisProps) {
    const [albumLength, setAlbumLength] = useState(0);

    useEffect(() => {
        setAlbumLength(0);
    }, [event]);

    function openEventPage() {
        history.push(eventUrlPublicPrivate(event));
    }

    return (
        <tr onClick={openEventPage} className="pre-order-body trans">
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
                        {event?.geolocation?.country}
                    </Link>
                </span>
            </td>
            <td className="text-right pr-3">
                <span className="f-myriadprolight fs16 mr-3">
                    {event?.books.length} books, {albumLength} photos
                </span>
                {/*<Link to="#" className="btn pre-order-btn f-myriadproSemibold">*/}
                {/*    Pre-order*/}
                {/*</Link>*/}
            </td>
        </tr>
    );
}

export default TableBlock;
