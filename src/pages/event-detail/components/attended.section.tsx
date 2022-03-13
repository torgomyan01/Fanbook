import React from 'react';
import AttendEventImg from 'assets/images/event-detail/attend-book-img-big.png';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalToUploadImage, setEventID } from 'redux/modals';
import ModalUpload from 'features/upload-photos/modal-upload';
import randomBackground, {
    checkPublisher,
    isUserLogin,
    UploadAndEdit,
    userAvatarName
} from 'utils/helpers';
import { DEF_URL } from 'utils/urls';

const AttendedSection = () => {
    const dispatch = useDispatch();
    const { id, status }: { id: string; status: string } = useParams();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const iAmPublisher = checkPublisher(event.userId, userInfo?.id);

    function openModalUpload() {
        dispatch(ModalToUploadImage(UploadAndEdit.upload));
        dispatch(
            setEventID({
                id,
                eventStatus: status
            })
        );
    }

    function UploadButton() {
        return (
            <ul className="upload-list position-">
                <li>
                    <Link
                        to="#"
                        className="upload-btn trans"
                        onClick={openModalUpload}>
                        <i className="fas fa-upload mr-2" />
                        Upload Photos
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <section className="attended-section">
            <div className="container-fluid wrapper1 position-relative">
                <div className="row">
                    <div className="col-12">
                        <div className="d-sm-flex align-items-start justify-content-between mb-4">
                            <div className="mb-sm-0 mb-3">
                                <h2 className="attended-section_title f-omnesMedium fs40">
                                    Attended the Event? Upload YOUR photos!
                                </h2>
                                <p className="attended-section_txt mb-0">
                                    Great news! Publisher (
                                    <Link
                                        className="c-white"
                                        to={`${DEF_URL.PUBLISHER_PROFILE}/${event?.user.id}`}>
                                        {event?.user?.publisherProfile?.name}
                                    </Link>
                                    ) allows you to upload your photos and get
                                    started with your Book or Poster
                                </p>
                            </div>
                            <div className="redbull-top">
                                <div className="d-flex mb-sm-0 mb-2">
                                    <div className="img-box mr-3">
                                        {event?.user?.publisherProfile
                                            ?.avatarURL ? (
                                            <div
                                                className="publisher-img-from-event-page-footer"
                                                style={{
                                                    backgroundImage: `url(${event?.user?.publisherProfile?.avatarURL})`
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="publisher-to-event-page"
                                                style={{
                                                    background:
                                                        randomBackground()
                                                }}>
                                                {
                                                    event?.user.publisherProfile
                                                        ?.name[0]
                                                }
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex flex-column">
                                        <p className="redbull-title mb-2">
                                            Allowed by Publisher
                                        </p>
                                        <h3 className="redbull-txt mb-0">
                                            <Link
                                                className="c-white"
                                                to={`${DEF_URL.PUBLISHER_PROFILE}/${event?.user.id}`}>
                                                {
                                                    event?.user
                                                        ?.publisherProfile?.name
                                                }
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="book-img">
                            <img
                                src={AttendEventImg}
                                alt="book"
                                className="d-sm-block d-none"
                            />
                            <UploadButton />
                        </div>
                    </div>
                </div>
            </div>
            <ModalUpload />
        </section>
    );
};

export default AttendedSection;
