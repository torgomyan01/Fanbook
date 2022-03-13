import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import doneImg from 'assets/images/poster/done.png';
import { DEF_URL } from 'utils/urls';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePoster } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import { history, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThsProps {
    status: boolean;
    eventID: string;
}

export const four_step_bloc_for_crate_poster =
    'four_step_bloc_for_crate_poster';

function CropSection({ status, eventID }: IThsProps) {
    const dispatch = useDispatch();
    const { eventStatus }: { eventStatus: string } = useParams();
    const posterInfo = useSelector(
        (state: IPosters) => state.Posters.posterCreateInfo
    );

    const [loading, setLoading] = useState(false);
    function createPoster() {
        const _posterInfo = { ...posterInfo };
        _posterInfo.isAvailable = true;
        dispatch(setMessageUser(UM.P_W));
        setLoading(true);
        CreatePoster(_posterInfo).then((res) => {
            console.log(res);
            history.push(
                `${DEF_URL.EDITOR_POSTER}/${res.data.data.item.userEventId}/${res.data.data.item.id}/${eventStatus}`
            );
            setLoading(false);
        });
    }

    return (
        <section
            className="crop-section"
            id={four_step_bloc_for_crate_poster}
            style={{
                height: status ? 'auto' : '0',
                padding: status ? '4.375rem 0' : 'unset'
            }}>
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12 text-center">
                        <span className="step-icon">3</span>
                        <h2 className="f-omnesMedium fs30 mb-3">
                            Select &amp; Crop Photo
                        </h2>
                        <p className="fs17 f-myriadprolight mb-3 lh-13">
                            Choose which photo you want to include in the
                            poster, fitting your poster size.
                        </p>
                        <div className="border-right-left text-center">
                            <span className="ready-txt f-omnesMedium">
                                <span className="d-flex align-items-center lh-13">
                                    you are ready for the last step
                                    <img
                                        src={doneImg}
                                        className="ml-2"
                                        alt=""
                                    />
                                </span>
                            </span>
                        </div>
                        <button
                            className="btn red-btn mb-3"
                            onClick={createPoster}>
                            Go To Editor
                            {loading ? (
                                <Spinner animation="border" variant="light" />
                            ) : (
                                <i className="fas fa-arrow-right ml-2" />
                            )}
                        </button>
                        <p className="fs17 f-myriadprolight">
                            You will get into the editor section
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CropSection;
