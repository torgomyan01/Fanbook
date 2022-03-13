import React, { useEffect, useRef } from 'react';

import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    text: {
        text: string;
        style: string;
        id: string;
        param: {
            x: number;
            y: number;
        };
    };
}

function TextBlockPages({ text }: IThisProps) {
    const thisText = useRef<any>(null);

    useEffect(() => {
        thisText.current.setAttribute('style', text.style);
    }, [text]);

    return (
        <>
            <div
                ref={thisText}
                key={keyGenerator(30)}
                className="book-page-text">
                {text.text}
            </div>
        </>
    );
}

export default TextBlockPages;
