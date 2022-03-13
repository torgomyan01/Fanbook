import React, { useEffect, useState } from 'react';
import EditorPosterPageHeader from 'pages/create-book/Components/Posters/components/components/header';
import EditorPosterPageMainPanel from 'pages/create-book/Components/Posters/components/components/main';
import EditorPosterPageRightPanel from 'pages/create-book/Components/Posters/components/components/right-panel';
import EditorPosterPageSideBar from 'pages/create-book/Components/Posters/components/components/sidebar';
import 'assets/css/editor-poster-page.css';
import { useParams } from 'react-router-dom';
import { getGoogleFont, GetPosters, GetPosterTemplate } from 'api/all-apis';
import { GetEventPublicPrivate } from 'utils/helpers';
import { setAllFonts } from 'redux/google-fonts';
import { addAllFontsBody } from 'pages/edit-covers/helper';
import { useDispatch } from 'react-redux';

export const defaultPositionImageEditor = {
    left: 0,
    top: 0,
    zoom: 100,
    rotate: 0
};

let thisDefaultStyle = `
    body{
        min-width: 992px;
        width: 100%;
   }`;

function EditorPosterPage() {
    const dispatch = useDispatch();
    const { eventID }: { eventID: string } = useParams();
    const { posterID }: { posterID: string } = useParams();
    const { eventStatus }: { eventStatus: string } = useParams();
    const [textMode, setTextMode] = useState(false);
    const [posterTemplates, setPosterTemplates] = useState<PosterTemplate[]>(
        []
    );

    const [loading, setLoading] = useState(true);
    const [thisPoster, setThisPoster] = useState<IPoster>();

    const [thisEvent, setThisEvent] = useState<IEvent>();

    useEffect(() => {
        // GET POSTER TEMPLATES
        GetPosterTemplate().then((res) => {
            setPosterTemplates(res.data.data.items);
        });

        // GET THIS POSTER
        GetPosters(posterID)
            .then((res) => {
                setThisPoster(res.data.data.item);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

        // GET THIS POSTER EVENT
        GetEventPublicPrivate(
            eventID,
            eventStatus,
            {
                'append[1]': 'albums'
            },
            function (res: any) {
                setThisEvent(res.data.data.item);
            }
        );
        // GET ALL GOOGLE FONTS
        getGoogleFont().then((res) => {
            const items: IGoogleFontsItem[] = res.data.items.slice(0, 30);
            dispatch(setAllFonts(items));
            thisDefaultStyle += addAllFontsBody(items);
        });
    }, []);

    const _onChangeTextMode = (mode: boolean) => {
        setTextMode(mode);
    };

    const [posterSizes, setPosterSizes] = useState<{
        width: number;
        height: number;
    }>({
        width: 18,
        height: 24
    });

    function ChangePosterSizes(width: number, height: number) {
        setPosterSizes({
            width,
            height
        });
    }

    const [editToLeft, setEditToLeft] = useState(
        defaultPositionImageEditor.left
    );
    const [editToTop, setEditToTop] = useState(defaultPositionImageEditor.top);
    const [editToZoom, setEditToZoom] = useState(
        defaultPositionImageEditor.zoom
    );

    const [editToRotate, setEditToRotate] = useState(
        defaultPositionImageEditor.rotate
    );
    const [openCloseLibraryBlock, setOpenCloseLibraryBlock] = useState(true);

    function changeLibraryBlock() {
        setOpenCloseLibraryBlock(!openCloseLibraryBlock);
    }

    function startEditTop(e: number) {
        setEditToTop(e);
    }

    function startEditLeft(e: number) {
        setEditToLeft(e);
    }
    function startEditZoom(e: number) {
        setEditToZoom(e);
    }

    function startEditRotate(e: number) {
        setEditToRotate(e);
    }

    return (
        <div className="editor-tools-page poster">
            <EditorPosterPageHeader loading={loading} thisPoster={thisPoster} />
            <main>
                <EditorPosterPageSideBar
                    changeSizes={ChangePosterSizes}
                    posterSizes={posterSizes}
                    changeLibraryBlock={changeLibraryBlock}
                    openCloseLibraryBlock={openCloseLibraryBlock}
                />
                <EditorPosterPageMainPanel
                    textMode={textMode}
                    posterTypes={posterTemplates}
                    thisPoster={thisPoster}
                    thisEvent={thisEvent}
                    posterSizes={posterSizes}
                    changeParamBackground={{
                        top: editToTop,
                        left: editToLeft,
                        zoom: editToZoom,
                        rotate: editToRotate
                    }}
                    onChangeTextMode={_onChangeTextMode}
                    openCloseLibraryBlock={openCloseLibraryBlock}
                />
                <EditorPosterPageRightPanel
                    textMode={textMode}
                    onChangeTextMode={_onChangeTextMode}
                    startEditTop={startEditTop}
                    startEditLeft={startEditLeft}
                    startEditZoom={startEditZoom}
                    startEditRotate={startEditRotate}
                />
            </main>
            <style>{thisDefaultStyle}</style>
        </div>
    );
}

export default EditorPosterPage;
