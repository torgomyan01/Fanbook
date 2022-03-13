import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultImage from 'assets/images/Page_Default.png';
import { TextBlocksIdName } from '../main';
import {
    findStyleParameters,
    keyGenerator,
    posterGetImageUrl,
    setMessageUser
} from 'utils/helpers';
import { defImage } from 'api/creating-book-default-data';
import { setAddUrlToStartDragImages } from 'redux/posters';
import { UM } from 'utils/user-messages';
import addTextIcon from 'assets/images/add-text-icon.png';
import TextBlock from 'pages/edit-covers/front-back/components/text-block';

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

export const zoomInNumber = 25;

const DEF_START_PARAM_TEXT = 40;

function Standart({
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
        if (thisStyle) {
            const StyleArray = posterGetImageUrl(thisStyle);
            const _img = StyleArray ? (StyleArray as string) : defImage;
            setImage(_img);
            dispatch(setAddUrlToStartDragImages(_img));
        }

        const _texts = thisPoster?.params.texts;
        const oldTexts: any = [];
        _texts?.map((text: { content: string; style: string }) => {
            const transformPosition = findStyleParameters(
                text.style
            ).transform.split(',');
            oldTexts.push({
                id: keyGenerator(30),
                text: text.content,
                style: text.style,
                param: {
                    x: Number(transformPosition[0]),
                    y: Number(transformPosition[1])
                }
            });
        });
        setTexts(oldTexts);
    }, [thisPoster]);

    const [texts, setTexts] = useState<IText[]>([]);

    function AddText() {
        setTexts((oldText: IText[]) => [
            ...oldText,
            {
                id: keyGenerator(30),
                text: 'Your Text',
                style: `color: #fff; font-size: 20px; transform: translate(${DEF_START_PARAM_TEXT}px, ${DEF_START_PARAM_TEXT}px);`,
                param: {
                    x: DEF_START_PARAM_TEXT,
                    y: DEF_START_PARAM_TEXT
                }
            }
        ]);
    }

    function saveTextChange(param: IText) {
        const _texts = [...texts];
        const _currentText = _texts.find((text: IText) => text.id === param.id);
        if (_currentText) {
            const indexThisText = _texts.indexOf(_currentText);
            _texts.splice(indexThisText, 1);
            _texts.push(param);
            setTexts(_texts);
        }
    }

    function removeThisText(id: string) {
        const _texts = [...texts].filter((texts: IText) => texts.id !== id);
        setTexts(_texts);
    }

    return (
        <div>
            <div
                ref={thisBlock}
                className="body-standard-block-types"
                onDoubleClick={opesnA}
                onDragEnter={dragEnter}
                onDragLeave={DragLeave}
                onDragOver={dragOver}
                onDrop={drop}
                style={{
                    width: posterSizes.width * zoomInNumber,
                    height: posterSizes.height * zoomInNumber
                }}>
                {texts.map((text: IText) => {
                    return (
                        <TextBlock
                            key={keyGenerator(30)}
                            text={text}
                            saveThisText={saveTextChange}
                            removeText={removeThisText}
                            parentParam={{
                                width: posterSizes.width * zoomInNumber,
                                height: posterSizes.height * zoomInNumber
                            }}
                        />
                    );
                })}
                <img
                    src={image}
                    alt="Image Bg"
                    draggable={false}
                    id={TextBlocksIdName.imageID}
                    style={{
                        width: imageWidthHeight.width,
                        height: imageWidthHeight.height,
                        maxWidth: 'unset',
                        transform: `translate(${changeParamBackground.left}%, ${changeParamBackground.top}%) rotate(${changeParamBackground.rotate}deg)`
                    }}
                />
            </div>
            <span
                className="btn-add-text"
                style={{
                    right: 30,
                    top: 150
                }}>
                <img
                    src={addTextIcon}
                    alt="icon"
                    className="mb-2"
                    onClick={AddText}
                />
                Add text
            </span>
        </div>
    );
}

export default Standart;
