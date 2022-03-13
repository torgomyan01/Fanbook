import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Standart from './types/standart';
import InsetArea from './types/inset-area';
import InsetArea2 from './types/inset-area-2';
import BlockPlaceholder from 'features/block-placeholder';
import { textCrop } from 'utils/helpers';

interface IThsProps {
    textMode: boolean;
    thisPoster: IPoster | undefined;
}

export const posterTypeName = {
    Standart: 'Standart',
    'Inset Area': 'Inset Area',
    'Inset Area x2': 'Inset Area x2'
};

export const TextBlocksIdName = {
    block1: 'inset-area-text-block-1',
    block2: 'inset-area-text-block-2',
    block3: 'inset-area-text-block-3',
    imageID: 'inset-area-text-block-image'
};

const defLengthDescription = 20;

function MainBlockPosterPreview({ textMode, thisPoster }: IThsProps) {
    const PosterTypeNames: any = {
        Standart: <Standart thisPoster={thisPoster} />,
        'Inset Area': <InsetArea thisPoster={thisPoster} />,
        'Inset Area x2': <InsetArea2 thisPoster={thisPoster} />,
        default: (
            <BlockPlaceholder
                width={450}
                height={600}
                borderRadius={5}
                status={true}
                count={1}
                className="d-block m-auto"
            />
        )
    };
    const [types, setTypes] = useState<string | undefined>('');

    const middleMainClassName = useCallback(() => {
        return textMode
            ? 'middle-main-textmode poster-preview'
            : 'middle-main poster-preview';
    }, [textMode]);

    const [DescriptionLength, setDescriptionLength] = useState<
        number | undefined
    >(defLengthDescription);
    useEffect(() => {
        setTypes(thisPoster?.template.name);
    }, [thisPoster]);

    function seeMore() {
        setDescriptionLength(thisPoster?.description?.length);
    }

    function closeMore() {
        setDescriptionLength(defLengthDescription);
    }

    return (
        <Fragment>
            <div className={middleMainClassName()}>
                <div className="main-content">
                    <div className="mt-4 mb-4">
                        {PosterTypeNames[types ? types : 'default']}
                    </div>
                </div>
                <div className="poster-information-block">
                    <p className="c-gray">Name</p>
                    <p className="poster-name-view-page font-bold">
                        {thisPoster?.name}
                    </p>
                    <p className="c-gray">Size</p>
                    <p className="poster-name-view-page font-bold">
                        {thisPoster?.size}
                    </p>
                    {thisPoster?.description &&
                        thisPoster?.description?.length > 0 && (
                            <>
                                <p className="c-gray mt-4">Description</p>
                                <p className="poster-name-view-page">
                                    {textCrop(
                                        thisPoster?.description,
                                        DescriptionLength
                                            ? DescriptionLength
                                            : 0
                                    )}
                                    {thisPoster?.description.length >
                                        defLengthDescription && (
                                        <span
                                            onClick={
                                                DescriptionLength ===
                                                defLengthDescription
                                                    ? seeMore
                                                    : closeMore
                                            }
                                            className="cursor-pointer ml-2 c-blue font-bold">
                                            {DescriptionLength ===
                                            defLengthDescription
                                                ? 'See More'
                                                : 'See Less'}
                                        </span>
                                    )}
                                </p>
                            </>
                        )}
                </div>
            </div>
        </Fragment>
    );
}

export default MainBlockPosterPreview;
