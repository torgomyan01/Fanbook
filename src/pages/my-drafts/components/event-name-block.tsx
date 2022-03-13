import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { eventUrlPublicPrivate } from 'utils/helpers';
import DraftEventBlock from './event-block';

interface IThisProps {
    event: IEvent;
}

function EventNameBlock({ event }: IThisProps) {
    const [eventBlockLayer, setEventBlockLayer] = useState({
        layerX: 0,
        layerY: 0
    });
    const [eventBlock, setEventBlock] = useState<boolean>(false);

    function onEnter(e: any) {
        setEventBlockLayer({
            layerX: e.nativeEvent.layerX - 30,
            layerY: e.nativeEvent.layerY - 30
        });
        openCloseBlock(true);
    }

    function onLeave() {
        openCloseBlock(false);
    }

    function enterEventBlock() {
        openCloseBlock(true);
    }

    function openCloseBlock(status: boolean) {
        setTimeout(() => {
            setEventBlock(status);
        }, 500);
    }

    return (
        <>
            <Link
                to={eventUrlPublicPrivate(event)}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className="c-gray">
                {event.name}
            </Link>
            {eventBlock && (
                <DraftEventBlock
                    event={event}
                    enterEventBlock={enterEventBlock}
                    eventBlockLayer={eventBlockLayer}
                    onLeave={onLeave}
                />
            )}
        </>
    );
}

export default EventNameBlock;
