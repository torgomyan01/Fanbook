import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetPosters } from 'api/all-apis';
import MainBlockPosterPreview from './componsntes/Main-Panel';
import HeaderPosterPrevPage from './componsntes/header-poster-prev';

function PosterPreview() {
    const { posterID }: { posterID: string } = useParams();
    const [textMode] = useState(false);

    const [loading, setLoading] = useState(true);
    const [thisPoster, setThisPoster] = useState<IPoster>();

    useEffect(() => {
        // GET THIS POSTER
        GetPosters(posterID)
            .then((res) => {
                setThisPoster(res.data.data.item);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="editor-tools-page poster">
            <HeaderPosterPrevPage loading={loading} thisPoster={thisPoster} />
            <main>
                <MainBlockPosterPreview
                    textMode={textMode}
                    thisPoster={thisPoster}
                />
            </main>
        </div>
    );
}

export default PosterPreview;
