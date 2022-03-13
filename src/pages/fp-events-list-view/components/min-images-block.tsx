import React, { useEffect, useRef } from 'react';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch } from 'react-redux';
import { createImageCanvas } from 'utils/helpers';

interface IThisProps {
    url: string;
}

function EventImagesBlock({ url }: IThisProps) {
    const dispatch = useDispatch();
    function viewPhoto(e: any) {
        dispatch(modalOpenClose(true));
        dispatch(
            setImage({
                name: 'Preview ',
                url
            })
        );
    }

    const imgBlock = useRef<any>(null);

    useEffect(() => {
        createImageCanvas(url, 150, 150, false).then((res: any) => {
            const canvas = res;
            canvas.classList.add('my__event__canvas__album');
            if (imgBlock && imgBlock.current) {
                imgBlock.current.innerHTML = '';
                imgBlock?.current?.append(canvas);
            }
        });
    }, [url]);

    return (
        <li onClick={viewPhoto}>
            <div ref={imgBlock} className="my-event-page-event-images" />
        </li>
    );
}

export default EventImagesBlock;
