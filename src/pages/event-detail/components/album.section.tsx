import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DEF_URL } from 'utils/urls';
import { keyGenerator } from 'utils/helpers';
import AlbumBlock from './album-block';
import { Accordion } from 'react-bootstrap';
import BlockPlaceholder from 'features/block-placeholder';

const AlbumSection = () => {
    const { status }: { status: string } = useParams();
    const currentEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );

    const isEditable = useSelector(
        (state: IEvents) => state.events.currentEvent?.isEditable
    );

    return (
        <Fragment>
            <div>
                {currentEvent?.name === '' ? (
                    <BlockPlaceholder
                        borderRadius={5}
                        count={2}
                        className="m-0 w-100 mt-3"
                        status={true}
                        height={100}
                        width={100}
                    />
                ) : (
                    <>
                        {currentEvent?.albums?.length > 0 ? (
                            <Accordion
                                defaultActiveKey="0"
                                className="mt-3 accordion-to-event-page-albums">
                                {currentEvent.albums
                                    .slice(0, 3)
                                    .map((album: any) => {
                                        return (
                                            <AlbumBlock
                                                key={keyGenerator(30)}
                                                album={album}
                                                event={currentEvent}
                                            />
                                        );
                                    })}
                            </Accordion>
                        ) : (
                            <p>
                                {isEditable
                                    ? 'You have not created any albums yet. Start using the button on the right.'
                                    : 'There are no albums created yet.'}
                            </p>
                        )}
                    </>
                )}
            </div>
            {currentEvent?.albums?.length >= 1 && (
                <div className="d-flex justify-content-end align-items-center mt-4 w-100">
                    <Link
                        to={`${DEF_URL.LIBRARY}/${currentEvent?.id}/${status}`}
                        className="btn c-red c-white d-flex align-items-center">
                        Go To Library
                        <i className="fas fa-arrow-right ml-2" />
                    </Link>
                </div>
            )}
        </Fragment>
    );
};

export default AlbumSection;
