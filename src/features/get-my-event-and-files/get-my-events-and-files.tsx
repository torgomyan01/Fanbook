import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getEventAllAlbumFiles } from 'api/all-apis';

function getMyEventsAndFiles(limit: string, res: any) {
    const Events = useSelector((state: IEvents) => state.events.events);
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [myEvents, setMyEvents] = useState<IEvent[]>([]);
    let files: any = [];

    useEffect(() => {
        const myEvents = Events.filter(
            (event: IEvent) => event.userId === userInfo?.id
        );
        setMyEvents(myEvents);
    }, [Events, userInfo]);

    useEffect(() => {
        files = [];
        myEvents.map((e: IEvent, x: number) => {
            files.push(
                getEventAllAlbumFiles(e.id, limit, true, true, false, false)
            );
            if (x === myEvents.length - 1) {
                startPromise();
            }
        });
    }, [myEvents]);

    function startPromise() {
        Promise.all(files).then(function (results: any) {
            res(results);
        });
    }
}

export default getMyEventsAndFiles;
