import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultImage from 'assets/images/Page_Default.png';
import { zoomInNumber } from './standart';
import { TextBlocksIdName } from '../main';
import {
    findStyleParameters,
    posterGetImageUrl,
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

function InsetArea2({
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
        width: 300,
        height: 300
    });
    const [imageDefaultWidthHeight, setImageDefaultWidthHeight] = useState({
        width: 300,
        height: 300
    });

    const thisBlock = useRef<any>();
    function opesnA() {
        if (imageURL) {
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

    const [thisText, setThisText] = useState<any[]>([]);

    const allStyles = findStyleParameters(thisStyle);
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
        thisBlock.current.style.backgroundImage = null;
        thisBlock.current.style.width = null;
        thisBlock.current.style.height = null;
        thisBlock.current.style.transform = null;
        const StyleArray = posterGetImageUrl(thisStyle);
        const _img = StyleArray ? (StyleArray as string) : defImage;
        setImage(_img);

        dispatch(setAddUrlToStartDragImages(_img));
        setThisText(thisPoster?.params?.texts || []);
    }, [thisPoster]);

    return (
        <div
            className="inset-area-block-2"
            style={{
                width: posterSizes.width * zoomInNumber,
                height: posterSizes.height * zoomInNumber
            }}>
            <div
                className="inset-area-img-block-2"
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
            <div className="inset-area-text-block-body-2">
                <p
                    className="inset-area-text-block-2"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    id={TextBlocksIdName.block2}>
                    {thisText[0]?.content}
                </p>
                <p
                    className="inset-area-text-block-2"
                    id={TextBlocksIdName.block3}
                    contentEditable={true}
                    suppressContentEditableWarning={true}>
                    {thisText[1]?.content}
                </p>
            </div>
        </div>
    );
}

export default InsetArea2;
