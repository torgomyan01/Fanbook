import React from 'react';
import { keyGenerator } from 'utils/helpers';
import BlockPlaceholder from 'features/block-placeholder';

function LoadingProcessEvent() {
    return (
        <li key={keyGenerator(30)}>
            <BlockPlaceholder
                width={150}
                height={150}
                borderRadius={5}
                status={true}
                count={1}
                className="m-0 mr-2"
            />

            <div className="event-info">
                <h3 className="event-info-title">
                    <BlockPlaceholder
                        width={300}
                        height={20}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0"
                    />
                </h3>
                <p className="event-info-calendar d-flex">
                    <i className="icon-calendar mr-2" />
                    <BlockPlaceholder
                        width={220}
                        height={15}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 mt-1"
                    />
                </p>
                <p className="event-info-location">
                    <i
                        className="icon-location"
                        style={{ marginRight: '14px' }}
                    />
                    <BlockPlaceholder
                        width={150}
                        height={15}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0"
                    />
                </p>
                <p className="event-info-gallery">
                    <i className="icon-gallery mr-2 " />
                    <BlockPlaceholder
                        width={120}
                        height={15}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0"
                    />
                </p>
            </div>
            <ul className="events-gallery-list">
                <li key={keyGenerator(30)}>
                    <BlockPlaceholder
                        width={70}
                        height={70}
                        borderRadius={5}
                        status={true}
                        count={16}
                        className="m-0 mr-1 mt-1"
                    />
                </li>
            </ul>
        </li>
    );
}

export default LoadingProcessEvent;
