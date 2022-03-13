import React, { useEffect, useState } from 'react';
import './style.css';
import imgPreloader from './images/fanbook-logo.png';

interface IThisProps {
    openClose: boolean;
}

function PreLoaderComponent({ openClose }: IThisProps) {
    const [cssPreloader, setcssPreloader] = useState('flex');

    useEffect(() => {
        !openClose ? setcssPreloader('none') : setcssPreloader('flex');
    }, [openClose]);

    return (
        <div
            className={
                openClose
                    ? 'preloader-site open'
                    : 'preloader-site closePreloader'
            }
            style={{ display: cssPreloader }}>
            <img
                src={imgPreloader}
                className="fanbook-logo"
                alt="Pre Loader Site"
            />
            <div id="loader" />
        </div>
    );
}

export default PreLoaderComponent;
