import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    findStyleParameters,
    INCH_ONE_PIXEL,
    keyGenerator,
    MINIMISE_IMAGE_BLOCK,
    openCloseEditor,
    setMessageUser
} from 'utils/helpers';
import { pagesTypes } from '../components/main-header';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import { UpdatePageBook } from 'api/all-apis';
import { fanbookDefaultName } from '../front-back/front-block';
import addTextIcon from 'assets/images/add-text-icon.png';
import TextBlock from '../front-back/components/text-block';
import CoverEditor from '../front-back/components/editor';
import { Link } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';
import { Spinner } from 'react-bootstrap';
import { setCurrentBook } from 'redux/edit-book';
import { DEF_URL } from 'utils/urls';
import { defaultTextStyle } from '../helper';
import { UM } from 'utils/user-messages';

function BackBlock() {
    const dispatch = useDispatch();
    const draggingEvent = useSelector((state: IOneBook) => state.ThisBook.drag);

    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    const [bookWidth, setBookWidth] = useState<number>(500);
    const [bookHeight, setBookHeight] = useState<number>(500);
    const [texts, setTexts] = useState<IText[]>([]);
    const [thisPage, setThisPage] = useState<IBookPage>();

    function AddText() {
        setTexts((oldText: IText[]) => [...oldText, { ...defaultTextStyle }]);
    }

    useEffect(() => {
        const _thisPage = thisBook?.pages?.find(
            (page: IBookPage) => page.type === pagesTypes.coverBack
        );
        setThisPage(_thisPage);

        const _texts = _thisPage?.params.images.items[0].texts;
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

        const BookSize = thisBook.size.split('x');
        setBookWidth(Number(BookSize[0]));
        setBookHeight(Number(BookSize[1]));
    }, [thisBook]);

    const Block1 = useRef<any>(null);

    function dragEnter(e: any) {
        e.target.classList.add('enter');
    }
    function dragLeave(e: any) {
        e.preventDefault();
        e.target.classList.remove('enter');
    }
    const [openEditing, setOpenEditing] = useState<boolean>(true);
    function dropImages(e: any) {
        e.preventDefault();
        e.target.style.backgroundImage = `url(${draggingEvent.imgUrl})`;
        e.target.style.backgroundPosition = '50% 50%';
        e.target.style.backgroundSize = '100%';
        e.target.style.backgroundRepeat = 'no-repeat';
        e.target.classList.remove('enter');
        setOpenEditing(false);
    }

    function dragOver(e: any) {
        e.preventDefault();
    }

    useEffect(() => {
        if (thisPage?.params?.images.items[0]?.style) {
            Block1.current.setAttribute(
                'style',
                thisPage?.params?.images.items[0]?.style
            );
        }
    }, [thisPage]);

    const [thisEditor, setThisEditor] = useState<boolean>(false);
    const [thisEditorEmptyStyle, setThisEditorEmptyStyle] =
        useState<string>('');

    useEffect(() => {
        if (thisEditor) {
            setThisEditorEmptyStyle(Block1.current.getAttribute('style'));
        }
    }, [thisEditor]);

    function thisBlockEnter() {
        setThisEditor(true);
        openCloseEditor(true);
    }

    function saveEditing() {
        setThisEditor(false);
        openCloseEditor(false);
    }

    function deletePhoto() {
        Block1.current.style.backgroundImage = `url(${FanbookDefault})`;
        Block1.current.style.backgroundSize = 'auto';
    }

    function closeThisEditor() {
        Block1.current.setAttribute('style', thisEditorEmptyStyle);
        setThisEditor(false);
        openCloseEditor(false);
    }

    function EditBackground(e: string) {
        Block1.current.style.backgroundImage = null;
        Block1.current.style.backgroundColor = e;
    }

    function openCloseBackground(e: boolean) {
        if (e) {
            Block1.current.style.backgroundImage = null;
            Block1.current.style.backgroundPosition = null;
            Block1.current.style.backgroundSize = null;
            Block1.current.style.backgroundRepeat = null;
            Block1.current.style.backgroundColor = '#e91e63';
        } else {
            Block1.current.style.backgroundImage = `url(${FanbookDefault})`;
            Block1.current.backgroundPosition = 'center center';
            Block1.current.backgroundSize = 'auto';
            Block1.current.backgroundRepeat = 'no-repeat';
            Block1.current.style.backgroundColor = null;
        }
    }
    function ChangeLeftPosition(event: any, newValue: number | number[]) {
        if (
            !Block1.current.getAttribute('style').includes(fanbookDefaultName)
        ) {
            Block1.current.style.backgroundPositionX = `${newValue}%`;
        }
    }

    function ChangeTopPosition(event: any, newValue: number | number[]) {
        if (
            !Block1.current.getAttribute('style').includes(fanbookDefaultName)
        ) {
            Block1.current.style.backgroundPositionY = `${newValue}%`;
        }
    }
    function ChangeZoomPosition(event: any, newValue: number | number[]) {
        if (
            !Block1.current.getAttribute('style').includes(fanbookDefaultName)
        ) {
            Block1.current.style.backgroundSize = `${newValue}%`;
        }
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

    const BlockWidth = (bookWidth * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK;
    const BlockHeight = (bookHeight * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK;

    const [saveCover, setSaveCover] = useState<boolean>(false);
    async function startSave() {
        const backBlock = thisBook.pages.find(
            (page: IBookPage) => page.type === pagesTypes.coverBack
        );

        const savingTexts: { content: string; style: string }[] = [];
        texts.map((e: IText) => {
            savingTexts.push({
                content: e.text,
                style: e.style
            });
        });
        const data = {
            templateId: backBlock?.templateId,
            params: {
                template: {
                    style: ''
                },
                images: {
                    items: [
                        {
                            style: Block1.current.getAttribute('style'),
                            tag: 'back',
                            texts: savingTexts
                        }
                    ],
                    style: ''
                }
            }
        };

        setSaveCover(true);
        if (backBlock && data) {
            dispatch(setMessageUser(UM.P_W));
            UpdatePageBook(thisBook.id, backBlock.id, data).then((res) => {
                const _thisBook = { ...thisBook };
                const _backBlock = _thisBook.pages.find(
                    (page: IBookPage) => page.type === pagesTypes.coverBack
                );
                if (_backBlock) {
                    const _backIndexOf = _thisBook.pages.indexOf(_backBlock);
                    const newBack: IBookPage = res.data.data.item;

                    const _pages = [..._thisBook.pages];
                    _pages.splice(_backIndexOf, 1);
                    _pages.push(newBack);
                    _thisBook.pages = _pages;
                    dispatch(setCurrentBook(_thisBook));
                    dispatch(setMessageUser(UM.CHANGES_SAVED));
                    setSaveCover(false);
                }
            });
        }
    }

    function removeThisText(id: string) {
        const _texts = [...texts].filter((texts: IText) => texts.id !== id);
        setTexts(_texts);
    }
    return (
        <>
            {BlockWidth ? (
                <>
                    <div
                        className="front-back-book"
                        style={{
                            width: BlockWidth,
                            height: BlockHeight
                        }}>
                        <span className="btn-add-text" onClick={AddText}>
                            <img
                                src={addTextIcon}
                                alt="icon"
                                className="mb-2"
                            />
                            Add text
                        </span>
                        <div
                            className="front-back-book--body"
                            onDragEnter={dragEnter}
                            onDragLeave={dragLeave}
                            onDrop={dropImages}
                            onDragOver={dragOver}
                            onDoubleClick={thisBlockEnter}
                            ref={Block1}
                            style={{
                                backgroundImage: `url(${FanbookDefault})`,
                                width: BlockWidth ? BlockWidth : 500,
                                height: BlockHeight ? BlockHeight : 500
                            }}>
                            {texts.map((text: IText) => {
                                return (
                                    <TextBlock
                                        key={keyGenerator(30)}
                                        text={text}
                                        saveThisText={saveTextChange}
                                        removeText={removeThisText}
                                        parentParam={{
                                            width: BlockWidth,
                                            height: BlockHeight
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <CoverEditor
                        closeModal={closeThisEditor}
                        thisEditor={thisEditor}
                        ChangeLeftPosition={ChangeLeftPosition}
                        ChangeTopPosition={ChangeTopPosition}
                        ChangeZoomPosition={ChangeZoomPosition}
                        saveEditing={saveEditing}
                        deletePhoto={deletePhoto}
                        EditBackground={EditBackground}
                        openCloseBackground={openCloseBackground}
                        getBg={openEditing}
                    />
                    <div className="d-flex justify-content-end align-items-center">
                        <Link
                            to={`${DEF_URL.COVER_PREVIEW}/${thisBook.id}`}
                            className=" btn-bottom mr-3">
                            <span className="d-flex align-items-center mr-3 c-black">
                                <i className="fas fa-eye mr-2" />
                                <span className="btn-text">Preview</span>
                            </span>
                        </Link>
                        <span className="btn btn-save">
                            <span
                                className="d-flex align-items-center"
                                onClick={startSave}>
                                {saveCover ? (
                                    <Spinner
                                        animation="border"
                                        variant="light"
                                        className="mr-2"
                                    />
                                ) : (
                                    <i className="fas fa-print mr-2" />
                                )}
                                Save Back
                            </span>
                        </span>
                    </div>
                </>
            ) : (
                <BlockPlaceholder
                    width={600}
                    height={700}
                    borderRadius={5}
                    status={true}
                    count={1}
                    className="m-0 m-auto d-block mb-3"
                />
            )}
        </>
    );
}

export default BackBlock;
