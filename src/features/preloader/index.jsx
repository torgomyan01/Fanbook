import React, { useEffect, useState } from 'react';
import './style.css';
import imgPreloader from './images/fanbook-logo.png';

function PreLoader(props) {
    const [preloader, setPreloader] = useState(props.openClose);
    const [cssPreloader, setcssPreloader] = useState('flex');
    window.addEventListener('load', function () {
        setTimeout(() => {
            setPreloader(false);
        }, 1000);
    });

    useEffect(() => {
        !preloader
            ? setTimeout(() => {
                  setcssPreloader('none');
              }, 1000)
            : setTimeout(() => {
                  setcssPreloader('flex');
              }, 1000);
    }, [preloader]);

    setTimeout(() => {
        if (preloader) {
            setPreloader(false);
        }
    }, 3000);

    return (
        <div
            className={
                preloader
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

export default PreLoader;
