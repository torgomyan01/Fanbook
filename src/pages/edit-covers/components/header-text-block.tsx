import React, { useEffect, useRef } from 'react';
import {
    findStyleParameters,
    INCH_ONE_PIXEL,
    MINIMISE_IMAGE_BLOCK
} from 'utils/helpers';
import { useSelector } from 'react-redux';
import { perecentCalc } from '../helper';

interface IThisProps {
    text: {
        content: string;
        style: string;
    };
}

function HeaderTextBlock({ text }: IThisProps) {
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );
    const thisTextBlock = useRef<any>();
    const style = findStyleParameters(text.style);
    const styleTransform = style.transform.split(',');
    const BookSize = thisBook?.size?.split('x');

    const paramsPerecent = {
        left: Number(styleTransform[0]),
        top: Number(styleTransform[1]),
        BlockWidth:
            (Number(BookSize[0]) * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK,
        BlockHeight:
            (Number(BookSize[1]) * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK
    };

    /**
     * one 100 min block width
     * two 100 = 100% perecent
     */
    const widthPercent = (100 * 100) / paramsPerecent.BlockWidth;
    const heightPercent = (100 * 100) / paramsPerecent.BlockHeight;

    // GET STYLE TRANSLATE
    const transformX = perecentCalc(paramsPerecent.left, widthPercent);
    const transformY = perecentCalc(paramsPerecent.top, heightPercent);
    const translate = `translate(${transformX}px, ${transformY}px)`;

    // GET FONT SIZE
    const fontSize = perecentCalc(Number(style.fontSize), widthPercent);
    const fontSizePx = `${fontSize}px`;

    const lineHeight = perecentCalc(Number(style.lineHeight), widthPercent);
    const lineHeightPx = `${lineHeight}px`;

    const latterSpacing = perecentCalc(
        Number(style.letterSpacing),
        widthPercent
    );
    const latterSpacingPx = `${latterSpacing}px`;

    useEffect(() => {
        thisTextBlock?.current?.setAttribute('style', text.style);
        thisTextBlock.current.style.transform = translate;
        thisTextBlock.current.style.fontSize = fontSizePx;
        thisTextBlock.current.style.lineHeight = lineHeightPx;
        thisTextBlock.current.style.letterSpacing = latterSpacingPx;
    }, [thisTextBlock]);

    return (
        <span ref={thisTextBlock} className="list-pages-link-text">
            {text.content}
        </span>
    );
}

export default HeaderTextBlock;
