import React, { useEffect, useRef } from 'react';
import noImage from 'assets/images/edit-book/no-photo-blue.png';
import { TemplateStatus } from '../helper';

interface IThisProps {
    dataBlockName: string;
    className: any;
    pageItem: IBookPageItems;
    status: string;
}

const noImageStyle = {
    backgroundImage: `url(${noImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: ' 40px',
    backgroundPosition: 'center center'
};

function TemplateBloc({
    dataBlockName,
    className,
    pageItem,
    status
}: IThisProps) {
    const Block1 = useRef<any | HTMLElement>(null);

    useEffect(() => {
        Block1.current.setAttribute('style', pageItem?.style);
    }, [pageItem]);

    return (
        <>
            {status === TemplateStatus.min ? (
                <div
                    ref={Block1}
                    data-block-name={dataBlockName}
                    className={className}
                    style={noImageStyle}
                />
            ) : (
                <div
                    ref={Block1}
                    data-block-name={dataBlockName}
                    className={className}
                    style={noImageStyle}
                />
            )}
        </>
    );
}

export default TemplateBloc;
