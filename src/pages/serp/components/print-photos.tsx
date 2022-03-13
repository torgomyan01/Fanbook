import React from 'react';
import Materials from './materials';

import { keyGenerator } from 'utils/helpers';

interface IPrintArray {
    photos: [];
}

function PrintPhotos({ photos }: IPrintArray): any {
    return photos.length > 0 ? (
        photos.map((files: any) => (
            <Materials key={keyGenerator(30)} file={files} Bought={false} />
        ))
    ) : (
        <h1 className="no-result-found-serp">No Results Found</h1>
    );
}

export default PrintPhotos;
