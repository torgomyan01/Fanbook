import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/black-logo.png';
import videoBg from '../images/video-bg.png';
import playIcon from '../images/play-icon.png';

function LeftBlock() {
    return (
        <div className="col-md-4 col-12 my-col">
            <div className="change-block">
                <ul className="btn-list d-flex">
                    <li className="w-48per mr-4per">
                        <Link to="#" className="btn save-btn ">
                            Save Changes
                        </Link>
                    </li>
                    <li className="w-48per">
                        <Link to="#" className="btn cancel-btn">
                            Cancel
                        </Link>
                    </li>
                </ul>
                <div className="d-flex align-items-center justify-content-between mb-md-3 mb-2">
                    <h2 className="fs22">Custom Logo</h2>
                    <Link to="" className="c-red fs17 f-myriadproreg">
                        Change
                        <i className="fas fa-edit ml-2" />
                    </Link>
                </div>
                <div className="mb-md-4 mb-3">
                    <Link to="#" className=" d-inline-block" title="fanbook">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-md-3 mb-2">
                    <h2 className="fs22">Header Photo / Video</h2>
                    <Link to="" className="c-red fs17 f-myriadproreg">
                        Change
                        <i className="fas fa-edit ml-2" />
                    </Link>
                </div>
                <div>
                    <div
                        className="video-box"
                        style={{ backgroundImage: `url(${videoBg})` }}>
                        <span className="play-icon">
                            <img src={playIcon} alt="play" />
                        </span>
                    </div>
                </div>
                <h3 className="fs22 mb-md-4 mb-2">Color Scheme</h3>
                <ul className="color-list">
                    <li className="fs16 f-myriadproreg d-flex align-items-center mb-2">
                        <span className="color-box main-color" />
                        Main Color
                    </li>
                    <li className="fs16 f-myriadproreg d-flex align-items-center mb-2">
                        <span className="color-box sec-color" />
                        Secondary Color
                    </li>
                    <li className="fs16 f-myriadproreg d-flex align-items-center mb-2">
                        <span className="color-box terc-color" />
                        Terciary Color
                    </li>
                    <li className="fs16 f-myriadproreg d-flex align-items-center">
                        <span className="color-box backg-color" />
                        Background
                    </li>
                </ul>
                <h3 className="fs22 mb-md-4 mb-2 f-omnesMedium">
                    Add a Widget
                </h3>
                <ul className="book-list">
                    <li className="">
                        <Link to="">
                            Books
                            <i className="fas fa-plus c-red" />
                        </Link>
                    </li>
                    <li className=" ">
                        <Link to="">
                            Shared Albums
                            <i className="fas fa-plus c-red" />
                        </Link>
                    </li>
                    <li className="">
                        <Link to="">
                            Posters
                            <i className="fas fa-plus ml-2 c-red" />
                        </Link>
                    </li>
                    <li className="">
                        <Link to="">
                            Upload Your Photos
                            <i className="fas fa-plus c-red" />
                        </Link>
                    </li>
                    <li className="">
                        <Link to="">
                            Custom Sidebar
                            <i className="fas fa-plus c-red" />
                        </Link>
                    </li>
                    <li className="">
                        <Link to="">
                            Custom Text
                            <i className="fas fa-plus c-red" />
                        </Link>
                    </li>
                </ul>
                <form action="" method="post" className="code-box">
                    <label
                        htmlFor="code"
                        className="d-block fs22 mb-3 f-omnesMedium d-flex align-items-end justify-content-between">
                        <span>Add a Widget</span>
                        <Link to="#" className="c-red fs17 f-myriadproreg">
                            Copy
                            <i className="fas fa-edit ml-3" />
                        </Link>
                    </label>
                    <div className="textarea-box">
                        <textarea
                            className="h-100 w-100"
                            id="code"
                            placeholder="Text between angle brackets is an HTML tag and is not displayed. Most tags, such as the HTML and /HTML tags that surround the contents of a page, come in pairs; some tags, like HR, for a horizontal rule, stand alone. Comments, such as the text you’re reading,like HR, for a horizontal rule, stand alone. Comments, such as the text you’re reading,like HR, for a horizontal rule, stand alone. Comments, such as the text you’re reading"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LeftBlock;
