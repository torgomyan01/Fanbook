import React, { useEffect, useRef, useState } from 'react';
import DefaultImage from 'assets/images/Page_Default.png';
import { zoomInNumber } from './standart';
import { TextBlocksIdName } from '../Main-Panel';
import {
    findStyleParameters,
    posterGetImageUrl,
    removePosterStyles
} from 'utils/helpers';
import { defImage } from 'api/creating-book-default-data';

interface IThisProps {
    thisPoster: IPoster | undefined;
}

function InsetArea2({ thisPoster }: IThisProps) {
    const [image, setImage] = useState(DefaultImage);

    const thisBlock = useRef<any>();
    const thisStyle = thisPoster?.params?.images?.items[0]?.style
        ? thisPoster?.params?.images?.items[0]?.style
        : '';

    const [thisText, setThisText] = useState<any[]>([]);
    const [PSizes, setPSizes] = useState<{
        width: number;
        height: number;
    }>({
        width: 0,
        height: 0
    });
    const [imageWidthHeight, setImageWidthHeight] = useState({
        width: 300,
        height: 300
    });
    const [transform, steTransform] = useState<string>('0%, 0%');
    useEffect(() => {
        thisBlock.current.setAttribute('style', thisStyle as string);
        removePosterStyles(thisBlock.current);

        const _style = findStyleParameters(thisStyle);
        setImageWidthHeight({
            width: Number(_style.width),
            height: Number(_style.height)
        });
        steTransform(_style.transform);
        const StyleArray = posterGetImageUrl(thisStyle);
        const _img = StyleArray ? (StyleArray as string) : defImage;
        setImage(_img);
        const size = thisPoster?.size?.split('x');
        const width = size ? size[0] : 0;
        const height = size ? size[1] : 0;
        setPSizes({
            width: Number(width),
            height: Number(height)
        });
        setThisText(thisPoster?.params?.texts || []);
    }, [thisPoster]);
    return (
        <div
            className="inset-area-block-2"
            style={{
                width: PSizes.width * zoomInNumber,
                height: PSizes.height * zoomInNumber
            }}>
            <div className="inset-area-img-block-2" ref={thisBlock}>
                <img
                    src={image}
                    style={{
                        width: imageWidthHeight.width,
                        height: imageWidthHeight.height,
                        maxWidth: 'unset',
                        transform: `translate(${transform})`
                    }}
                    alt="Image Bg"
                    id={TextBlocksIdName.imageID}
                />
            </div>
            <div className="inset-area-text-block-body-2">
                <p
                    className="inset-area-text-block-2"
                    id={TextBlocksIdName.block2}>
                    {thisText[0]?.content}
                </p>
                <p
                    className="inset-area-text-block-2"
                    id={TextBlocksIdName.block3}>
                    {thisText[1]?.content}
                </p>
            </div>
        </div>
    );
}

export default InsetArea2;
