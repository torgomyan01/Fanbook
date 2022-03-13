import React, { useEffect, useState } from 'react';
import { Modal, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faCheckCircle,
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
    Avatar,
    Checkbox,
    createStyles,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sortingBook } from '../components/book-page';
import moment from 'moment/moment';

interface IThisProps {
    modal: {
        openClose: boolean;
        book: IBookInfo | null;
    };
    close: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 120,
            width: '100%'
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

function MoreDetailsBook({ modal, close }: IThisProps) {
    const classes = useStyles();

    const [eventName, setEventName] = useState<string>('');
    const [bookName, setBookName] = useState<string>('');
    const [bookDescription, setBookDescription] = useState<string>('');
    const [BookStatus, setBookStatus] = useState<string>('');
    const [bookPages, setBookPages] = useState<string>('60');
    const [bookSize, setBookSize] = useState<string>('');
    const [bookCreationDate, setBookCreationDate] = useState<string>('');
    const [bookUpdateDate, setBookUpdateDate] = useState<string>('');
    const [bookIsAvailable, setBookIsAvailable] = useState<boolean>(false);
    const [bookUserName, setBookUserName] = useState<string>('');
    const [bookUserAvatar, setBookUserAvatar] = useState<string>('');

    useEffect(() => {
        if (modal.book) {
            modal.book.userEvent && setEventName(modal.book.userEvent.name);
            setBookName(modal.book.name);
            setBookDescription(modal.book.description);
            setBookStatus(modal.book.status);
            setBookSize(modal.book.size);
            setBookCreationDate(
                moment(modal.book.createdAt).format('MMMM Do YYYY, h:mm')
            );
            setBookUpdateDate(
                moment(modal.book.updatedAt).format('MMMM Do YYYY, h:mm')
            );
            setBookUserName(
                `${modal.book.user.firstName} ${modal.book.user.lastName}`
            );
            setBookIsAvailable(modal.book.isAvailable);
            modal.book.user.avatarURL &&
                setBookUserAvatar(modal.book.user.avatarURL);
        }
    }, [modal]);
    return (
        <Modal
            size="xl"
            style={{ zIndex: 100000 }}
            show={modal.openClose}
            className="book-details-modal modal-bg-blur-effect"
            onHide={close}>
            <Modal.Body>
                <div className="modal-body p-0">
                    <div className="left-part">
                        <div className="left-part_inner h-100">
                            <h2 className="modal-title">Book Information</h2>
                            <div className="info-block mb-4">
                                <ul className="info-box mb-lg-0 mb-4">
                                    <li className="info-item">
                                        <TextField
                                            label="Book Name"
                                            className="w-100"
                                            value={bookName}
                                        />
                                    </li>
                                    <li className="info-item">
                                        <TextField
                                            label="Book Description"
                                            multiline={true}
                                            rows={4}
                                            className="w-100"
                                            value={bookDescription}
                                        />
                                    </li>
                                    <li className="info-item">
                                        <TextField
                                            label="Event"
                                            className="w-100"
                                            value={eventName}
                                        />
                                    </li>
                                    <li className="info-item">
                                        <FormControl
                                            className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">
                                                Status
                                            </InputLabel>
                                            <Select
                                                value={BookStatus}
                                                className="w-100"
                                                onChange={(event: any) => {
                                                    setBookStatus(
                                                        event.target.value
                                                    );
                                                }}>
                                                <MenuItem
                                                    value={sortingBook.publish.toLowerCase()}>
                                                    {sortingBook.publish.toLowerCase()}
                                                </MenuItem>
                                                <MenuItem
                                                    value={sortingBook.draft.toLowerCase()}>
                                                    {sortingBook.draft.toLowerCase()}
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </li>
                                    <li className="info-item d-flex justify-content-between ">
                                        <div className="mw-95">
                                            <TextField
                                                label="Pages"
                                                style={{ width: 100 }}
                                                disabled={true}
                                                value={bookPages}
                                            />
                                        </div>
                                        <div className="mw-95">
                                            <TextField
                                                label="Size"
                                                style={{ width: 100 }}
                                                disabled={true}
                                                value={bookSize}
                                            />
                                        </div>
                                    </li>
                                    <li className="info-item">
                                        <TextField
                                            label="Creation Date"
                                            className="w-100"
                                            disabled={true}
                                            value={bookCreationDate}
                                        />
                                    </li>
                                    <li className="info-item">
                                        <TextField
                                            label="Last Modified"
                                            className="w-100"
                                            disabled={true}
                                            value={bookUpdateDate}
                                        />
                                    </li>
                                    <li className="info-item">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={bookIsAvailable}
                                                    onChange={() =>
                                                        setBookIsAvailable(
                                                            !bookIsAvailable
                                                        )
                                                    }
                                                    style={{ color: '#b12029' }}
                                                    name="bookIsAvailable"
                                                    color="primary"
                                                />
                                            }
                                            label="Is Available"
                                        />
                                    </li>
                                </ul>
                                <ul className="info-box mb-0">
                                    <li className="info-item">
                                        <Grid
                                            container
                                            spacing={1}
                                            className="w-100"
                                            alignItems="flex-end">
                                            <Grid item>
                                                <Avatar
                                                    alt={bookUserName}
                                                    src={bookUserAvatar}
                                                />
                                            </Grid>
                                            <Grid item className="w-75">
                                                <TextField
                                                    className="w-100"
                                                    disabled={true}
                                                    label={bookUserName}
                                                />
                                            </Grid>
                                        </Grid>
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Processed Date
                                        </h3>
                                        <p className="info-box-txt">
                                            2020-01-01, 01:23 AM
                                        </p>
                                    </li>
                                    <li className="info-item ">
                                        <div className="mw-95">
                                            <h3 className="info-box-title">
                                                Quantity
                                            </h3>
                                            <p className="info-box-txt">1</p>
                                        </div>
                                    </li>
                                    <li className="info-item mb-4 mt-4 minh-auto">
                                        <h2 className="info-box-title d-flex align-items-center">
                                            <svg
                                                className="mr-3"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19.2"
                                                height="19.2"
                                                viewBox="0 0 19.2 19.2">
                                                <path
                                                    fill="#77909D"
                                                    stroke="#000"
                                                    strokeWidth="0.2px"
                                                    opacity="0.502"
                                                    className="a"
                                                    d="M21.389,4.5H6.611A2.117,2.117,0,0,0,4.5,6.611V21.389A2.117,2.117,0,0,0,6.611,23.5H21.389A2.117,2.117,0,0,0,23.5,21.389V6.611A2.117,2.117,0,0,0,21.389,4.5Zm-9.5,14.778L6.611,14l1.478-1.478,3.8,3.8L19.911,8.3l1.478,1.478Z"
                                                    transform="translate(-4.4 -4.4)"
                                                />
                                            </svg>
                                            Deleted
                                        </h2>
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Last Modified
                                        </h3>
                                        <p className="info-box-txt disabled">
                                            2020-01-01, 01:23 AM
                                        </p>
                                    </li>
                                    <li className="info-item d-flex">
                                        <svg
                                            className="mr-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18.68"
                                            height="16.133"
                                            viewBox="0 0 18.68 16.133">
                                            <path
                                                fill="#bac7cd"
                                                className="a"
                                                d="M1.5,19.133H20.18L10.84,3Zm10.189-2.547h-1.7v-1.7h1.7Zm0-3.4h-1.7v-3.4h1.7Z"
                                                transform="translate(-1.5 -3)"
                                            />
                                        </svg>
                                        <p className="info-box-title">
                                            0 Errors
                                            <span className="txt">
                                                [Simple description for errors]
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <h2 className="modal-title">Payment Details</h2>
                            <div className="info-block mb-4">
                                <ul className="info-box mb-0">
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Total Amount
                                        </h3>
                                        <p className="info-box-txt">$123.45</p>
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Book Cost
                                        </h3>
                                        <p className="info-box-txt">$123.45</p>
                                    </li>

                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Discount Codes
                                        </h3>
                                        <p className="info-box-txt">
                                            FREESHIPPING
                                        </p>
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Shipping Address
                                        </h3>
                                        <p
                                            className="info-box-txt"
                                            style={{ height: 'auto' }}>
                                            <span className="d-block">
                                                John Smith
                                            </span>
                                            <span className="d-block">
                                                123 Fake Street
                                            </span>
                                            <span className="d-block">
                                                456ABC
                                            </span>
                                            <span className="d-block">
                                                12345, Springfield, North Takoma
                                            </span>
                                            <span className="d-block">USA</span>
                                        </p>
                                    </li>
                                </ul>
                                <ul className="info-box mb-0">
                                    <li className="info-item">
                                        <p className="info-box-txt border-none">
                                            <span className="icon-check_circle c-red fs19" />
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className="mr-2 c-red"
                                            />
                                            Paid
                                        </p>
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Shipping Cost
                                        </h3>
                                        <p className="info-box-txt">$12.34</p>
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Total Discount
                                        </h3>
                                        <p className="info-box-txt">- $12.34</p>
                                    </li>

                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Bindery Date
                                        </h3>
                                        <p className="info-box-txt">-</p>
                                    </li>
                                </ul>
                            </div>
                            <h2 className="modal-title">Book Details</h2>
                            <div className="info-block  mb-4 ">
                                <ul className="info-box mb-0 w-100 disabled">
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Preview PDF
                                        </h3>
                                        <p className="info-box-txt">
                                            example.com
                                        </p>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Downloadable PDF
                                        </h3>
                                        <p className="info-box-txt">
                                            example.com
                                        </p>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Publisher PDF
                                        </h3>
                                        <p className="info-box-txt">
                                            example.com
                                        </p>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Cover PDF
                                        </h3>
                                        <p className="info-box-txt">
                                            example.com
                                        </p>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </li>
                                    <li className="info-item">
                                        <h3 className="info-box-title">
                                            Publisher Cover PDF
                                        </h3>
                                        <p className="info-box-txt">
                                            example.com
                                        </p>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right-part">
                        <Link to="#" className="close-icon" onClick={close}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Link>

                        <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                                <h2 className="modal-title">Actions</h2>
                                <button className="checkout-btn btn white mw-100 mb-4 btn-modal-admin-book-list">
                                    Edit Book
                                </button>
                                <button className="checkout-btn btn dred mw-100 mb-2 btn-modal-admin-book-list">
                                    Send to Bindery
                                </button>
                                <button className="checkout-btn btn dred mw-100 mb-4 btn-modal-admin-book-list">
                                    Rebuild Book
                                </button>
                            </div>
                            <button className="checkout-btn btn lred mw-100">
                                Preview Book (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default MoreDetailsBook;
