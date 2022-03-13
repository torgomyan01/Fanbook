import React, { useEffect, useRef, useState } from 'react';
import DefaultImage from 'assets/images/Page_Default.png';
import { zoomInNumber } from './standart';
import { useDispatch, useSelector } from 'react-redux';
import { openAlert, setMessageAlert } from 'redux/alert-site';
import { TextBlocksIdName } from '../main';
import {
    findStyleParameters,
    posterGetImageUrl,
    removePosterStyles,
    setMessageUser
} from 'utils/helpers';
import { defImage } from 'api/creating-book-default-data';
import { setAddUrlToStartDragImages } from 'redux/posters';
import { UM } from 'utils/user-messages';

interface IThisProps {
    thisPoster: IPoster | undefined;
    posterSizes: {
        width: number;
        height: number;
    };
    openClosePhotoEditor: any;
    changeParamBackground: {
        left: number;
        top: number;
        zoom: number;
        rotate: number;
    };
}

const thisBlockClasses = {
    enter: 'enterBlock'
};

function InsetArea({
    thisPoster,
    posterSizes,
    openClosePhotoEditor,
    changeParamBackground
}: IThisProps) {
    const dispatch = useDispatch();
    const imageURL = useSelector(
        (state: IPosters) => state.Posters.editorPage.imageURL
    );

    const [image, setImage] = useState(DefaultImage);
    const [imageWidthHeight, setImageWidthHeight] = useState({
        width: 500,
        height: 500
    });
    const [imageDefaultWidthHeight, setImageDefaultWidthHeight] = useState({
        width: 300,
        height: 300
    });

    const thisBlock = useRef<any>();
    function opesnA() {
        if (image) {
            openClosePhotoEditor(true);
        } else {
            dispatch(setMessageUser(UM.SELECT_IMAGES));
        }
    }

    useEffect(() => {
        const height =
            (imageDefaultWidthHeight.height * changeParamBackground.zoom) / 100;
        const width =
            (imageDefaultWidthHeight.width * changeParamBackground.zoom) / 100;
        setImageWidthHeight({
            width,
            height
        });
    }, [changeParamBackground]);

    function dragEnter() {
        thisBlock.current?.classList.add(thisBlockClasses.enter);
    }

    function DragLeave(e: any) {
        e.preventDefault();
        thisBlock.current?.classList.remove(thisBlockClasses.enter);
    }

    function drop(e: any) {
        e.preventDefault();
        setImage(imageURL);
        thisBlock.current?.classList.remove(thisBlockClasses.enter);
    }
    function dragOver(e: any) {
        e.preventDefault();
    }
    const thisStyle = thisPoster?.params?.images?.items[0]?.style
        ? thisPoster?.params?.images?.items[0]?.style
        : '';
    const allStyles = findStyleParameters(thisStyle);

    const [thisText, setThisText] = useState<any[]>([]);

    useEffect(() => {
        const imgSizes =
            Number(allStyles.width) > 0 && Number(allStyles.height) > 0;
        if (imgSizes) {
            setImageWidthHeight({
                width: Number(allStyles.width),
                height: Number(allStyles.height)
            });
            setImageDefaultWidthHeight({
                width: Number(allStyles.width),
                height: Number(allStyles.height)
            });
        } else {
            const img = new Image();
            img.src = image;
            img.onload = function () {
                setImageWidthHeight({
                    width: img.width,
                    height: img.height
                });
                setImageDefaultWidthHeight({
                    width: img.width,
                    height: img.height
                });
            };
        }
    }, [image]);

    useEffect(() => {
        thisBlock.current?.setAttribute('style', thisStyle as string);
        removePosterStyles(thisBlock.current);

        const StyleArray = posterGetImageUrl(thisStyle);
        const _img = StyleArray ? (StyleArray as string) : defImage;
        setImage(_img);

        dispatch(setAddUrlToStartDragImages(_img));
        setThisText(thisPoster?.params?.texts || []);
    }, [thisPoster]);

    return (
        <div
            className="inset-area-block"
            style={{
                width: posterSizes.width * zoomInNumber,
                height: posterSizes.height * zoomInNumber
            }}>
            <div
                className="inset-area-img-block"
                ref={thisBlock}
                onDragEnter={dragEnter}
                onDragLeave={DragLeave}
                onDragOver={dragOver}
                onDrop={drop}
                onClick={opesnA}>
                <img
                    src={image}
                    alt="Image Bg"
                    id={TextBlocksIdName.imageID}
                    style={{
                        width: imageWidthHeight.width,
                        height: imageWidthHeight.height,
                        maxWidth: 'unset',
                        transform: `translate(${changeParamBackground.left}%, ${changeParamBackground.top}%) rotate(${changeParamBackground.rotate}deg)`
                    }}
                />
            </div>
            <p
                className="inset-area-text-block"
                id={TextBlocksIdName.block1}
                contentEditable={true}
                suppressContentEditableWarning={true}>
                {thisText[0]?.content}
            </p>
        </div>
    );
}

export default InsetArea;
