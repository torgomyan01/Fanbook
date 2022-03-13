import React, { useState } from 'react';
import hovimg from '../images/how-box-img-1.png';

function HowTo(props) {
    const [closeHowBlock, setCloseHowBlock] = useState(props.closeBlock);

    function closeBlockHowTo() {
        setCloseHowBlock(props.fClose);
    }

    return (
        <>
            {closeHowBlock ? (
                <div
                    className="how-box-proj box how-box position-relative pr-0"
                    style={{ height: '937.953px' }}>
                    <span
                        onClick={closeBlockHowTo}
                        className="close-icon d-inline-block d-flex justify-content-center align-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17.22"
                            height="17.25"
                            viewBox="0 0 17.22 17.25">
                            <path
                                style={{ fill: '#b12029' }}
                                d="M1274.95,217.723L1273.23,216l-6.89,6.894-6.9-6.894-1.72,1.723,6.89,6.895-6.89,6.894,1.72,1.723,6.9-6.894,6.89,6.894,1.72-1.723-6.89-6.894Z"
                                transform="translate(-1257.72 -216)">
                                {''}
                            </path>
                        </svg>
                    </span>
                    <h2 className="event-box_title f-omnesMedium mb-4 mr-4">
                        How to…
                    </h2>
                    <ul className="video-block scroll-vertical mb-0 pr-1">
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                        <li className="mb-4">
                            <div
                                className="video-box"
                                style={{
                                    backgroundImage: `url(${hovimg})`
                                }}>
                                <span className="video-icon">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 50 50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="25"
                                            fill="white"
                                        />
                                        <path
                                            d="M18 14L38 26L18 38V14Z"
                                            fill="#B21A24"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="fs18 f-myriadproreg">
                                Make something with something else
                            </h3>
                        </li>
                    </ul>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default HowTo;
