import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import { pagesTypes } from './main-header';
import { setFrontSpineCover } from 'redux/edit-cover';
import { keyGenerator } from 'utils/helpers';
import HeaderTextBlock from './header-text-block';

function FrontBack() {
    const dispatch = useDispatch();
    const activeBlock = useSelector(
        (state: IEditCover) => state.editCover.frontSpineCover
    );
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    const frontBlock = useRef<any>(null);
    const backBlock = useRef<any>(null);
    const [back, setBack] = useState<IBookPage | undefined>(undefined);
    const [front, setFront] = useState<IBookPage | undefined>(undefined);
    useEffect(() => {
        // FOR FRONT
        const _front = thisBook?.pages?.find(
            (page: IBookPage) => page.type === pagesTypes.coverFront
        );
        setFront(_front);
        if (_front?.params.images.items[0].style) {
            frontBlock?.current?.setAttribute(
                'style',
                _front?.params.images.items[0].style
            );
            frontBlock.current.style.width = null;
            frontBlock.current.style.height = null;
        } else {
            frontBlock.current.style.backgroundImage = `url(${FanbookDefault})`;
            frontBlock.current.style.backgroundPosition = '50% 50%';
            frontBlock.current.style.backgroundSize = 'cover';
        }

        // FOR BACK
        const _back = thisBook?.pages?.find(
            (page: IBookPage) => page.type === pagesTypes.coverBack
        );
        setBack(_back);
        if (_back?.params.images.items[0].style) {
            backBlock?.current?.setAttribute(
                'style',
                _back?.params.images.items[0].style
            );

            backBlock.current.style.width = null;
            backBlock.current.style.height = null;
        } else {
            backBlock.current.style.backgroundImage = `url(${FanbookDefault})`;
            backBlock.current.style.backgroundPosition = '50% 50%';
            backBlock.current.style.backgroundSize = 'cover';
        }
    }, [thisBook]);

    function changeActiveBlock(type: string) {
        dispatch(setFrontSpineCover(type));
    }
    return (
        <ul className="list-pages scroll-list cover-preview-page-header-front-back">
            <li className="list-pages-li">
                <div
                    ref={frontBlock}
                    className={`cursor-pointer list-pages-link ${
                        activeBlock === pagesTypes.coverFront && 'active'
                    }`}
                    onClick={() => {
                        changeActiveBlock(pagesTypes.coverFront);
                    }}>
                    {front?.params?.images?.items[0]?.texts?.map((_b: any) => {
                        return (
                            <HeaderTextBlock key={keyGenerator(30)} text={_b} />
                        );
                    })}
                </div>
                Front Cover
            </li>
            <li className="list-pages-li">
                <div
                    ref={backBlock}
                    className={`cursor-pointer list-pages-link ${
                        activeBlock === pagesTypes.coverBack && 'active'
                    }`}
                    onClick={() => {
                        changeActiveBlock(pagesTypes.coverBack);
                    }}>
                    {back?.params?.images?.items[0]?.texts?.map((_b: any) => {
                        return (
                            <HeaderTextBlock key={keyGenerator(30)} text={_b} />
                        );
                    })}
                </div>
                Back Cover
            </li>
        </ul>
    );
}

export default FrontBack;
