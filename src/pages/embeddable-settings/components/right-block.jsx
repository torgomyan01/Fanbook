import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/black-logo.png';
import redbullImg from '../images/redbull-img.png';
import flag from '../images/flag.png';
import smallMap from '../images/small-map.png';
import book from '../images/book.png';
import arrowAltCircleDownFrom from '../images/arrow-alt-circle-down.png';
import shared1 from '../images/shared-1.png';
import shared2 from '../images/shared-2.png';
import shared3 from '../images/shared-3.png';
import shared4 from '../images/shared-4.png';
import shared5 from '../images/shared-5.png';
import shared6 from '../images/shared-6.png';
import shared7 from '../images/shared-7.png';
import shared8 from '../images/shared-8.png';
import shared9 from '../images/shared-8.png';
import shared10 from '../images/shared-10.png';
import poster1 from '../images/poster-1.png';
import poster2 from '../images/poster-2.png';
import poster3 from '../images/poster-3.png';
import poster4 from '../images/poster-4.png';
import addendBookImage from '../images/attend-book-img.png';
import explore from '../images/explore.png';
import exploreImg from '../images/explore-img.png';
import { Dropdown } from 'react-bootstrap';

function DropDownsFolders() {
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="outline"
                id="dropdown-to-edit"
                className="edit-round trans">
                <i className="fas fa-pen" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <ul className="mb-0">
                    <li className="edit-round_item d-flex align-items-center justify-content-between">
                        <h2 className="fs17 c-black mb-0">
                            Custom Sidebar Text
                        </h2>
                        <i className="fas fa-trash-alt fs17 c-red" />
                    </li>
                    <li className="mb-4">
                        <Link to="#" className="w-48per mr-4per btn save-btn">
                            Save Changes
                        </Link>
                        <Link to="#" className="w-48per btn cancel-btn">
                            Cancel
                        </Link>
                    </li>
                    <li className="mb-3">
                        <h2 className="fs17 c-black mb-0 mr-2 d-inline-block">
                            Custom Sidebar Text
                        </h2>
                        <i className="fas fa-trash-alt fs17 c-red" />
                    </li>
                    <li className="mb-3">
                        <div className="box">
                            <p className="box-txt">
                                Pitch gamification low hanging fruit value
                                proposition twitter research &amp; development
                                innovator agile development. Assets success
                                virality lean startup value proposition
                                disruptive funding churn rate metrics.
                            </p>
                            <p className="box-txt mb-0">
                                Assets success virality lean startup value
                                proposition disruptive funding churn rate
                                metrics.
                            </p>
                        </div>
                    </li>
                    <li className="mb-3">
                        <h2 className="fs17 c-black mr-2 d-inline-block">
                            Color Scheme
                        </h2>
                        <ul className="color-list mb-3">
                            <li className="fs16 f-myriadproreg d-flex align-items-center mb-2">
                                <span className="color-box main-color" />
                                Text
                            </li>
                            <li className="fs16 f-myriadproreg d-flex align-items-center">
                                <span className="color-box backg-color" />
                                Background
                            </li>
                        </ul>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                        <Link to="#" className="c-black">
                            Add a Button
                            <i className="fas fa-plus c-red" />
                        </Link>
                        <Link to="#" className="c-black">
                            Add a Image / Video
                            <i className="fas fa-plus c-red" />
                        </Link>
                    </li>
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function RightBlock() {
    return (
        <div className="col-md-8 col-12 my-col">
            <div className="right-block event-details-page">
                <div className="header">
                    <div className="header-top">
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg navbar-dark">
                                <h1 className="navbar-brand mr-2 mb-0 p-0">
                                    <Link
                                        to="#"
                                        className="logo d-inline-block"
                                        title="fanbook">
                                        <img src={logo} alt="logo" />
                                    </Link>
                                </h1>
                                <button
                                    className="navbar-toggler"
                                    type="button">
                                    <i className="navbar-toggler-icon fas fa-bars" />
                                </button>
                                <div
                                    className="collapse navbar-collapse "
                                    id="collapsibleNavbar">
                                    <ul className="navbar-nav ml-auto d-flex align-items-center">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="#">
                                                Solutions
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="#">
                                                How it Works
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="#">
                                                The Book
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="#">
                                                Partner Program
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="#">
                                                Books by Fans
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="#">
                                                Prints by Fans
                                            </Link>
                                        </li>
                                        <li className="user-icon">
                                            <Link className="nav-link" to="#">
                                                <i className="far fa-user" />
                                            </Link>
                                        </li>
                                        <li className="search-icon">
                                            <Link className="nav-link" href="#">
                                                <i className="fas fa-search" />
                                            </Link>
                                        </li>
                                        <li className="bag-icon">
                                            <Link className="nav-link" href="#">
                                                <i className="fas fa-shopping-cart c-white" />
                                            </Link>
                                            <span className="number">1</span>
                                        </li>
                                    </ul>
                                </div>
                                <div id="mySidenav" className="sidenav">
                                    <Link
                                        to="#"
                                        className="navbar-toggler closebtn"
                                        onClick="closeNav()">
                                        <span className="navbar-toggler-icon" />
                                    </Link>
                                    <ul className="first-list mb-5 pl-0">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                Solutions
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                How it Works
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                The Book
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                Partner Program
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                Books by Fans
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                Prints by Fans
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="d-flex justify-content-center">
                                        <li className="user-icon">
                                            <Link className="" to="#">
                                                <i className="far fa-user" />
                                            </Link>
                                        </li>
                                        <li className="search-icon">
                                            <Link className="" to="#">
                                                <i className="fas fa-search" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <section className="img-section position-relative ">
                    <div className="container-fluid wrapper1 h-100">
                        <div className="row h-100">
                            <div className="col-12 position-relative">
                                <DropDownsFolders />

                                <div className="d-flex flex-column justify-content-end h-100">
                                    <div className="redbull-box">
                                        <div className="redbull-top d-sm-flex justify-content-between">
                                            <div className="d-flex mb-sm-0 mb-2">
                                                <div className="img-box mr-3">
                                                    <img
                                                        src={redbullImg}
                                                        alt="redbull"
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-between">
                                                    <p className="redbull-title mb-0">
                                                        Publisher
                                                    </p>
                                                    <h3 className="redbull-txt mb-0">
                                                        RedBull
                                                    </h3>
                                                    <div className="d-flex">
                                                        <Link
                                                            to="#"
                                                            className="redbull-btn mr-1">
                                                            Follow
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="edit-btn">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="8"
                                                                height="8"
                                                                viewBox="0 0 8 8">
                                                                <image
                                                                    id="external-link-alt_copy"
                                                                    data-name="external-link-alt copy"
                                                                    width="8"
                                                                    height="8"
                                                                    href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAALVBMVEUAAACxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICkAAACFRn4zAAAADXRSTlMA768Q37/Pj2AwgHBQT8GUVQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfkBRwGAQ5pAPSXAAAAMUlEQVQI12NgYOC9yKB70eQuQyhzbhFDqNkNBobQ3M4FDKF7uC4wBIaGXGCYtWrVAQDt2A3WcTDKjQAAAABJRU5ErkJggg=="
                                                                />
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="list-unstyled mb-0 d-flex align-items-end">
                                                <li className="mr-1">
                                                    <Link
                                                        to="#"
                                                        className="social-item">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="9"
                                                            height="10"
                                                            viewBox="0 0 9 10">
                                                            <image
                                                                id="facebook"
                                                                width="9"
                                                                height="10"
                                                                href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAKBAMAAACUK2mNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAMFBMVEUAAACxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICkAAAA6Aj3jAAAADnRSTlMAMCCvvxDvj3Bg359AUKHMG2IAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH5AUcAAwtekSHGgAAAERJREFUCNdjYGAQYGBgYLJ758jAEPbuSZoCQ927znUbGPzenXuXwOD3JubdAwa7JyLvHBjOAUUuMPDmnXsJ1BB5MoABAJrHGI1wGortAAAAAElFTkSuQmCC"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </li>
                                                <li className="mr-1">
                                                    <Link
                                                        to=""
                                                        className="social-item">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="9"
                                                            height="10"
                                                            viewBox="0 0 9 10">
                                                            <image
                                                                id="twitter"
                                                                width="10"
                                                                height="8"
                                                                href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAMAAAD3JJ6EAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAM1BMVEUAAACxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICkAAAAdbpEjAAAAD3RSTlMAECBAgDBQz5+/j2Bw36/iethbAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+QFHAASHYjciGkAAAA+SURBVAjXJctBEsAgCEPRTxUq0tb737ag2eQNTJALaF0b2K3YyljV8NSEWCcPyHtYk76VfzTq7FKc7l8k+AFyuAKqkps8qgAAAABJRU5ErkJggg=="
                                                            />
                                                        </svg>
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        to=""
                                                        className="social-item">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="10"
                                                            height="8"
                                                            viewBox="0 0 10 8">
                                                            <image
                                                                id="linkedin"
                                                                width="10"
                                                                height="8"
                                                                href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAIBAMAAAAy1HOFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAIVBMVEWxICmxICmxICmxICmxICmxICmxICmxICmxICmxICkAAAAHVXX0AAAACXRSTlMwQL/v35/PUIBmkRnzAAAAAWJLR0QKaND0VgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+QFHAATBhuicMQAAAAtSURBVAjXY+CcOXPmBAZJ5ZkzJzJIeoLJsKAyINnUkgEiO2eARCKnTmQAqwQAjrERCDnxkgsAAAAASUVORK5CYII="
                                                            />
                                                        </svg>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="redbull-bottom ">
                                            <div className="d-lg-flex flex-lg-row flex-column justify-content-between align-items-center">
                                                <div className="mb-lg-0 mb-3">
                                                    <h2 className="redbull-bottom_title">
                                                        RedBull Enduro 2019
                                                    </h2>
                                                    <ul className="redbull-bottom_list  d-xl-flex mb-0 d-inline-block">
                                                        <li className="redbull-bottom_item mr-xl-2 mb-xl-0 mb-1">
                                                            <Link
                                                                to="#"
                                                                className="font-light">
                                                                1 – 2 June 2019,
                                                                10:00 AM
                                                            </Link>
                                                        </li>
                                                        <li className="redbull-bottom_item ">
                                                            <Link
                                                                to="#"
                                                                className="flag-icon">
                                                                <img
                                                                    src={flag}
                                                                    alt=""
                                                                />
                                                                <span className="ml-2 b-bottom">
                                                                    Erzberg,
                                                                    Österreich
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="map-box position-relative d-inline-block">
                                                    <img
                                                        src={smallMap}
                                                        alt="map"
                                                        className="h-100"
                                                    />
                                                    <Link
                                                        to="#"
                                                        className="location-box">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="8"
                                                            height="9"
                                                            viewBox="0 0 8 9">
                                                            <image
                                                                id="map-marker-alt"
                                                                width="8"
                                                                height="9"
                                                                href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAJBAMAAAD9fXAdAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAALVBMVEUAAACxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICkAAACFRn4zAAAADXRSTlMAEEAg72DfMFC/cI/PiuO3+QAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfkBRwAKDjmcYJXAAAANklEQVQI12NgEFJmYGDyvRLAIHIl15lB97LsJYbaq72XGDjv3k1gYL97V4GBYe1tBgYGzgMMACxVDjZBjuymAAAAAElFTkSuQmCC"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="post-section">
                    <div className="container-fluid wrapper1">
                        <div className="row">
                            <div className="col-md-8 col-12 mb-md-0 mb-5">
                                <div className="books-block position-relative">
                                    <DropDownsFolders />
                                    <p className="books-block_txt">
                                        RedBull Enduro 2019
                                    </p>
                                    <h3 className="books-block_title">Books</h3>
                                    <div className="book-box d-sm-flex mb-3">
                                        <div className="img-box mb-sm-0 mb-2 ">
                                            <div
                                                className="book-img mb-3"
                                                // style="background-image:url(image/book.png)"
                                                style={{
                                                    backgroundImage: `url(${book})`
                                                }}
                                            />
                                            <h3 className="img-box_title mb-0">
                                                Prebuilt
                                            </h3>
                                        </div>
                                        <div className="book-txt-box d-flex flex-column justify-content-between w-100">
                                            <h3 className="book-box_pretitle mb-1">
                                                RedBull Enduro 2019
                                            </h3>
                                            <h2 className="book-box_title mb-2">
                                                2019 Pop Warner Super Bowl -
                                                prebuilt
                                            </h2>
                                            <Link
                                                to="#"
                                                className="buy-btn text-center">
                                                Buy $35.00
                                            </Link>
                                            <div className="upload-box">
                                                <p className="upload-txt mb-0">
                                                    Attended the Event? Drag
                                                    &amp; Drop your photos here
                                                    or
                                                    <Link
                                                        to="#"
                                                        className="upload-link -link">
                                                        upload
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="book-box d-sm-flex mb-3">
                                        <div className="img-box mb-sm-0 mb-2 ">
                                            <div className="book-img mb-3" />
                                            <h3 className="img-box_title mb-0">
                                                Prebuilt
                                            </h3>
                                        </div>
                                        <div className="book-txt-box d-flex flex-column justify-content-between w-100">
                                            <h3 className="book-box_pretitle">
                                                RedBull Enduro 2019
                                            </h3>
                                            <h2 className="book-box_title">
                                                2019 Pop Warner Super Bowl -
                                                prebuilt
                                            </h2>
                                            <Link
                                                to="#"
                                                className="buy-btn text-center">
                                                Buy $35.00
                                            </Link>
                                            <div className="upload-box">
                                                <p className="upload-txt mb-0">
                                                    Attended the Event? Drag
                                                    &amp; Drop your photos here
                                                    or
                                                    <Link
                                                        to="#"
                                                        className="upload-link -link">
                                                        upload
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shared-block position-relative">
                                    <DropDownsFolders />
                                    <h2 className="shared-title">
                                        Shared Albums
                                    </h2>
                                    <p className="shared-txt">
                                        Browse and favorite event photos that
                                        you can use in your Fanbooks.
                                    </p>
                                    <p className="shared-txt mb-2">
                                        Click the
                                        <i className="fas fa-heart c-blue" />
                                        to add an image to your Favorites or
                                        click
                                        <i className="fas fa-shopping-cart c-blue" />
                                        the icon to order a print.
                                    </p>
                                    <div
                                        className="panel-group "
                                        id="accordion"
                                        role="tablist"
                                        aria-multiselectable="true">
                                        <div className="shared-box">
                                            <div
                                                className="d-sm-flex justify-content-between align-items-center"
                                                role="tab"
                                                id="headingOne">
                                                <div className="d-sm-flex mb-sm-0 mb-2">
                                                    <div className="shared-box_img mr-sm-2">
                                                        <i className="far fa-images c-blue fs12" />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h3 className="shared-box_title mb-1">
                                                            Dec 7, 2019 - D2 Jr
                                                            Varsity
                                                            Quarterfinals
                                                        </h3>
                                                        <p className="shared-box_txt mb-0">
                                                            123 images
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link
                                                    data-toggle="collapse"
                                                    data-parent="#accordion"
                                                    to="#collapseOne"
                                                    aria-expanded="false"
                                                    aria-controls="collapseOne"
                                                    className="collapsed arrow">
                                                    <img
                                                        src={
                                                            arrowAltCircleDownFrom
                                                        }
                                                        alt="arrow"
                                                    />
                                                </Link>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className="panel-collapse collapse show"
                                                role="tabpanel"
                                                aria-labelledby="headingOne">
                                                <div className="shared-body ">
                                                    <div className="row my-row">
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box trans"
                                                                style={{
                                                                    backgroundImage: `url(${shared1})`
                                                                }}>
                                                                <div className="img-box_hover trans">
                                                                    <ul className="list-unstyled mb-0">
                                                                        <li className="d-inline-block mr-1">
                                                                            <Link
                                                                                to="#"
                                                                                className="round">
                                                                                <i className="fas fa-shopping-cart c-blue" />
                                                                            </Link>
                                                                        </li>
                                                                        <li className="d-inline-block">
                                                                            <Link
                                                                                href="#"
                                                                                className="round">
                                                                                <i className="fas fa-heart c-blue" />
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared2})`
                                                                }}>
                                                                <div className="img-box_hover trans">
                                                                    <span className="hover-txt trans">
                                                                        +104
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared3})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared4})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box mr-0"
                                                                style={{
                                                                    backgroundImage: `url(${shared5})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared6})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared7})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared8})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box"
                                                                style={{
                                                                    backgroundImage: `url(${shared9})`
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center">
                                                            <div
                                                                className="img-box mr-0"
                                                                style={{
                                                                    backgroundImage: `url(${shared10})`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shared-box">
                                        <div
                                            className="d-sm-flex justify-content-between align-items-center "
                                            role="tab"
                                            id="headingTwo">
                                            <div className="d-sm-flex mb-sm-0 mb-2">
                                                <div className="shared-box_img mr-sm-2">
                                                    <i className="far fa-images c-blue fs12" />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h3 className="shared-box_title mb-1">
                                                        Dec 7, 2019 - D2 Jr
                                                        Varsity Quarterfinals
                                                    </h3>
                                                    <p className="shared-box_txt mb-0">
                                                        123 images
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                data-toggle="collapse"
                                                data-parent="#accordion"
                                                href="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                                className="collapsed arrow">
                                                <img
                                                    src={arrowAltCircleDownFrom}
                                                    alt="arrow"
                                                />
                                            </Link>
                                        </div>
                                        <div
                                            id="collapseTwo"
                                            className="panel-collapse collapse mb-sm-0 mb-2"
                                            role="tabpanel"
                                            aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                Anim pariatur cliche
                                                reprehenderit, enim eiusmod high
                                                life accusamus terry richardson
                                                ad squid. 3 wolf moon officia
                                                aute, non cupidatat skateboard
                                                dolor brunch. Food truck quinoa
                                                nesciunt laborum eiusmod. Brunch
                                                3 wolf moon tempor, sunt aliqua
                                                put a bird on it squid
                                                single-origin coffee nulla
                                                assumenda shoreditch et. Nihil
                                                anim keffiyeh helvetica, craft
                                                beer labore wes anderson cred
                                                nesciunt sapiente ea proident.
                                                Ad vegan excepteur butcher vice
                                                lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim
                                                aesthetic synth nesciunt you
                                                probably havent heard of them
                                                accusamus labore sustainable
                                                VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shared-box">
                                        <div className="d-sm-flex justify-content-between align-items-center ">
                                            <div className="d-sm-flex mb-sm-0 mb-2">
                                                <div className="shared-box_img mr-sm-2">
                                                    <i className="far fa-images c-blue fs12" />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h3 className="shared-box_title mb-1">
                                                        Dec 7, 2019 - D2 Jr
                                                        Varsity Quarterfinals
                                                    </h3>
                                                    <p className="shared-box_txt mb-0">
                                                        123 images
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                data-toggle="collapse"
                                                data-parent="#accordion"
                                                href="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                                className="collapsed arrow">
                                                <img
                                                    src={arrowAltCircleDownFrom}
                                                    alt="arrow"
                                                />
                                            </Link>
                                        </div>
                                        <div
                                            id="collapseTwo"
                                            className="panel-collapse collapse mb-sm-0 mb-2"
                                            role="tabpanel"
                                            aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                Anim pariatur cliche
                                                reprehenderit, enim eiusmod high
                                                life accusamus terry richardson
                                                ad squid. 3 wolf moon officia
                                                aute, non cupidatat skateboard
                                                dolor brunch. Food truck quinoa
                                                nesciunt laborum eiusmod. Brunch
                                                3 wolf moon tempor, sunt aliqua
                                                put a bird on it squid
                                                single-origin coffee nulla
                                                assumenda shoreditch et. Nihil
                                                anim keffiyeh helvetica, craft
                                                beer labore wes anderson cred
                                                nesciunt sapiente ea proident.
                                                Ad vegan excepteur butcher vice
                                                lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim
                                                aesthetic synth nesciunt you
                                                probably havent heard of them
                                                accusamus labore sustainable
                                                VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shared-box">
                                        <div
                                            className="d-sm-flex justify-content-between align-items-center "
                                            role="tab"
                                            id="headingTwo">
                                            <div className="d-sm-flex mb-sm-0 mb-2">
                                                <div className="shared-box_img mr-sm-2">
                                                    <i className="far fa-images c-blue fs12" />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <h3 className="shared-box_title mb-1">
                                                        Dec 7, 2019 - D2 Jr
                                                        Varsity Quarterfinals
                                                    </h3>
                                                    <p className="shared-box_txt mb-0">
                                                        123 images
                                                    </p>
                                                </div>
                                            </div>
                                            <Link
                                                data-toggle="collapse"
                                                data-parent="#accordion"
                                                href="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                                className="collapsed arrow">
                                                <img
                                                    src={arrowAltCircleDownFrom}
                                                    alt="arrow"
                                                />
                                            </Link>
                                        </div>
                                        <div
                                            id="collapseTwo"
                                            className="panel-collapse collapse mb-sm-0 mb-2"
                                            role="tabpanel"
                                            aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                Anim pariatur cliche
                                                reprehenderit, enim eiusmod high
                                                life accusamus terry richardson
                                                ad squid. 3 wolf moon officia
                                                aute, non cupidatat skateboard
                                                dolor brunch. Food truck quinoa
                                                nesciunt laborum eiusmod. Brunch
                                                3 wolf moon tempor, sunt aliqua
                                                put a bird on it squid
                                                single-origin coffee nulla
                                                assumenda shoreditch et. Nihil
                                                anim keffiyeh helvetica, craft
                                                beer labore wes anderson cred
                                                nesciunt sapiente ea proident.
                                                Ad vegan excepteur butcher vice
                                                lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim
                                                aesthetic synth nesciunt you
                                                probably havent heard of them
                                                accusamus labore sustainable
                                                VHS.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="posters-block position-relative">
                                    <DropDownsFolders />
                                    <h3 className="posters-pretitle">
                                        RedBull Enduro 2019
                                    </h3>
                                    <h2 className="posters-title mb-3">
                                        Posters
                                    </h2>
                                    <div className="posters-box ">
                                        <ul className="poster-list d-flex justify-content-md-between justify-content-center list-unstyled mb-0">
                                            <li className="poster-item trans">
                                                <div className="poster-img">
                                                    <img
                                                        src={poster1}
                                                        alt="poster"
                                                    />
                                                    <div className="hover-box d-flex align-items-center justify-content-center">
                                                        <Link
                                                            to="#"
                                                            className="hover-txt trans">
                                                            +14
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="#"
                                                    className="buy-btn text-center trans mw-100">
                                                    Buy $35.00
                                                </Link>
                                            </li>
                                            <li className="poster-item trans">
                                                <div className="poster-img">
                                                    <img
                                                        src={poster2}
                                                        alt="poster"
                                                    />
                                                    <div className="hover-box d-flex align-items-center justify-content-center">
                                                        <Link
                                                            to="#"
                                                            className="hover-txt trans">
                                                            +14
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="#"
                                                    className="buy-btn text-center trans mw-100">
                                                    Buy $35.00
                                                </Link>
                                            </li>
                                            <li className="poster-item trans">
                                                <div className="poster-img">
                                                    <img
                                                        src={poster3}
                                                        alt="poster"
                                                    />
                                                    <div className="hover-box d-flex align-items-center justify-content-center">
                                                        <Link
                                                            to="#"
                                                            className="hover-txt trans">
                                                            +14
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="#"
                                                    className="buy-btn text-center trans mw-100">
                                                    Buy $35.00
                                                </Link>
                                            </li>
                                            <li className="poster-item trans">
                                                <div className="poster-img">
                                                    <img
                                                        src={poster4}
                                                        alt="poster"
                                                    />
                                                    <div className="hover-box d-flex align-items-center justify-content-center">
                                                        <Link
                                                            to="#"
                                                            className="hover-txt trans">
                                                            +14
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="#"
                                                    className="buy-btn text-center trans mw-100">
                                                    Buy $35.00
                                                </Link>
                                            </li>
                                            <li className="poster-item trans">
                                                <div className="poster-img">
                                                    <img
                                                        src={poster4}
                                                        alt="poster"
                                                    />
                                                    <div className="hover-box d-flex align-items-center justify-content-center">
                                                        <Link
                                                            to="#"
                                                            className="hover-txt trans">
                                                            +14
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Link
                                                    to="#"
                                                    className="buy-btn text-center trans mw-100">
                                                    Buy $35.00
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="upload-box">
                                            <p className="upload-txt mb-0">
                                                Attended the Event? Drag &amp;
                                                Drop your photos here or
                                                <Link
                                                    to="#"
                                                    className="upload-link -link">
                                                    upload
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 col-12 pl-xl-5">
                                <div className="red-box position-relative">
                                    <DropDownsFolders />
                                    <h2 className="red-box_title">
                                        About the event
                                    </h2>
                                    <p className="red-box_txt">
                                        Pitch gamification low hanging fruit
                                        value proposition twitter research &amp;
                                        development innovator agile development.
                                        Assets success virality lean startup
                                        value proposition disruptive funding
                                        churn rate metrics.
                                    </p>
                                    <p className="red-box_txt mb-0">
                                        Assets success virality lean startup
                                        value proposition disruptive funding
                                        churn rate metrics.
                                    </p>
                                </div>
                                <div className="explore-box position-relative">
                                    <DropDownsFolders />
                                    <h3 className=" explore-box_pretitle">
                                        Some short title
                                    </h3>
                                    <h2 className="explore-box_title">
                                        Our Books
                                    </h2>
                                    <div className="mb-3">
                                        <img src={explore} alt="" />
                                    </div>
                                    <p className="explore-box_txt">
                                        Pitch gamification low hanging fruit
                                        value proposition twitter research &amp;
                                        development innovator agile development.
                                        Assets success virality lean startup
                                        value proposition.
                                    </p>
                                    <Link to="#" className="explore-btn">
                                        Explore Books
                                    </Link>
                                </div>
                                <div className="explore-box position-relative">
                                    <DropDownsFolders />
                                    <h3 className=" explore-box_pretitle">
                                        Some short title
                                    </h3>
                                    <h2 className="explore-box_title">
                                        Our Posters
                                    </h2>
                                    <div className="img-box mb-3">
                                        <img src={exploreImg} alt="" />
                                    </div>
                                    <p className="explore-box_txt">
                                        Pitch gamification low hanging fruit
                                        value proposition twitter research &amp;
                                        development innovator agile development.
                                        Assets success virality lean startup
                                        value proposition.
                                    </p>
                                    <Link to="#" className="explore-btn">
                                        Explore Books
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="attended-section">
                    <div className="container-fluid wrapper1 position-relative">
                        <DropDownsFolders />
                        <div className="row">
                            <div className="col-12">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <div className="mb-sm-0 mb-3">
                                        <h2 className="attended-section_title f-omnesMedium">
                                            Attended the Event? Upload YOUR
                                            photos!
                                        </h2>
                                        <p className="attended-section_txt mb-0">
                                            Great news! Publisher (RedBull)
                                            allows you to upload your photos and
                                            get started with your Book or Poster
                                        </p>
                                    </div>
                                    <div className="redbull-top">
                                        <div className="d-flex mb-sm-0 mb-2">
                                            <div className="img-box mr-3">
                                                <img
                                                    src={redbullImg}
                                                    alt="redbull"
                                                />
                                            </div>
                                            <div className="d-flex flex-column justify-content-between">
                                                <p className="redbull-title mb-0">
                                                    Publisher
                                                </p>
                                                <h3 className="redbull-txt mb-0">
                                                    RedBull
                                                </h3>
                                                <div className="d-flex">
                                                    <Link
                                                        to="#"
                                                        className="edit-btn">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="8"
                                                            height="8"
                                                            viewBox="0 0 8 8">
                                                            <image
                                                                id="external-link-alt_copy"
                                                                data-name="external-link-alt copy"
                                                                width="8"
                                                                height="8"
                                                                href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAALVBMVEUAAACxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICmxICkAAACFRn4zAAAADXRSTlMA768Q37/Pj2AwgHBQT8GUVQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfkBRwGAQ5pAPSXAAAAMUlEQVQI12NgYOC9yKB70eQuQyhzbhFDqNkNBobQ3M4FDKF7uC4wBIaGXGCYtWrVAQDt2A3WcTDKjQAAAABJRU5ErkJggg=="
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="book-img">
                                    <img
                                        src={addendBookImage}
                                        alt="book"
                                        className="d-sm-block d-none"
                                    />
                                    <ul className="upload-list">
                                        <li>
                                            <Link
                                                to=""
                                                className="upload-btn trans">
                                                Upload Photos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to=""
                                                className="ios-btn trans">
                                                Import from iOS
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to=""
                                                className="android-btn trans">
                                                Import from Android
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default RightBlock;
