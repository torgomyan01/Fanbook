import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    findStyleParameters,
    INCH_ONE_PIXEL,
    keyGenerator,
    MINIMISE_IMAGE_BLOCK
} from 'utils/helpers';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import BlockPlaceholder from 'features/block-placeholder';
import { pagesTypes } from 'pages/edit-covers/components/main-header';
import TextBlockPages from 'pages/edit-covers/layouts-components/text-block';

function BackBlockPreview() {
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    const [bookWidth, setBookWidth] = useState<number>(500);
    const [bookHeight, setBookHeight] = useState<number>(500);
    const [texts, setTexts] = useState<IText[]>([]);
    const [thisPage, setThisPage] = useState<IBookPage>();

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

    useEffect(() => {
        if (thisPage?.params?.images.items[0]?.style) {
            Block1.current.setAttribute(
                'style',
                thisPage?.params?.images.items[0]?.style
            );
        }
    }, [thisPage]);

    const BlockWidth = (bookWidth * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK;
    const BlockHeight = (bookHeight * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK;
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
                        <div
                            className="front-back-book--body"
                            ref={Block1}
                            style={{
                                backgroundImage: `url(${FanbookDefault})`,
                                width: BlockWidth ? BlockWidth : 500,
                                height: BlockHeight ? BlockHeight : 500
                            }}>
                            {texts.map((text: IText) => {
                                return (
                                    <TextBlockPages
                                        key={keyGenerator(30)}
                                        text={text}
                                    />
                                );
                            })}
                        </div>
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

export default BackBlockPreview;
