import React, { useEffect, useState } from 'react';
import TableBlock from 'pages/pre-order/components/table-block';
import { useSelector } from 'react-redux';

import { checkPublisher, keyGenerator } from 'utils/helpers';
import { getPublicEvents } from 'api/all-apis';

interface IPublisherInfo {
    publisherId: string;
}

function SelectEventSection({ publisherId }: IPublisherInfo) {
    const suerInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [publisherEvent, setPublisherEvent] = useState<IEvent[]>([]);

    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    useEffect(() => {
        if (publisherId) {
            getPublicEvents({
                'page[number]': '1',
                'page[size]': '10',
                'append[0]': 'albums',
                'append[1]': 'books',
                'filter[userId]': publisherId
            }).then((res) => {
                const _events: IEvent[] = res.data.data.items.filter(
                    (ev: IEvent) => ev.id !== thisEvent.id
                );
                _events && setPublisherEvent(_events);
            });
        }
    }, [publisherId]);

    const isEditTable = checkPublisher(publisherId, suerInfo?.id);

    return (
        <>
            {!isEditTable && publisherEvent.length > 0 && (
                <section className="select-event-section">
                    <div className="container-fluid wrapper1">
                        <div className="col-12">
                            <h2 className="select-event_title text-left c-black fs24 mb-3 f-omnesMedium">
                                Other events from Publisher
                            </h2>

                            <div
                                className="scroll-horizontal mb-3 mCustomScrollbar _mCS_1 mCS_no_scrollbar"
                                data-mcs-theme="dark">
                                <div className="table-block-pre-order">
                                    <table className="select-table">
                                        <tbody>
                                            {publisherEvent.map(
                                                (event: IEvent) => {
                                                    return (
                                                        <TableBlock
                                                            key={keyGenerator(
                                                                30
                                                            )}
                                                            event={event}
                                                        />
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default SelectEventSection;
