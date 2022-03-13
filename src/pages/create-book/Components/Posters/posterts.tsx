import React, { useEffect, useState } from 'react';
import BookBlockPoster from './book-block';
import StepSection from './step-section';
import SelectBookSection from './select-book-section';
import SelectTemplateSection from './select-template-section';
import CropSection from './crop-section';
import SelectEventSection from '../Book/select-event-section';
import { useDispatch, useSelector } from 'react-redux';
import { setPoster } from 'redux/posters';

function Posters() {
    const dispatch = useDispatch();
    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const [startCreating, setStartCreating] = useState(false);
    const [startStepSection, setStartStepSection] = useState(false);
    const [startSelectBookSection, setSelectBookSection] = useState(false);
    const [startSelectTemplateSection, setSelectTemplateSection] =
        useState(false);

    const posterInfo = useSelector(
        (state: IPosters) => state.Posters.posterCreateInfo
    );

    useEffect(() => {
        dispatch(
            setPoster({
                ...posterInfo,
                userEventId: thisEvent.id
            })
        );
    }, [thisEvent]);

    return (
        <div className="poster-block">
            <BookBlockPoster open={(e: boolean) => setStartCreating(e)} />
            <StepSection
                status={startCreating}
                open={(e: boolean) => setStartStepSection(e)}
            />
            <SelectBookSection
                status={startStepSection}
                open={(e: boolean) => setSelectBookSection(e)}
            />
            <SelectTemplateSection
                status={startSelectBookSection}
                open={(e: boolean) => setSelectTemplateSection(e)}
            />
            <CropSection
                status={startSelectTemplateSection}
                eventID={thisEvent.id}
            />
            <SelectEventSection publisherId={thisEvent.user.id} />
        </div>
    );
}

export default Posters;
