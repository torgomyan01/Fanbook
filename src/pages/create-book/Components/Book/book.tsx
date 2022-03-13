import React from 'react';
import BookBlock from './book-block';
import StepSection from './ste-section';
import SelectBookSection from './select-book-section';
import SelectTemplateSection from './select-template-section';
import SelectEventSection from './select-event-section';
import { useSelector } from 'react-redux';

function Book() {
    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    return (
        <>
            <BookBlock />
            <StepSection />
            <SelectBookSection />
            <SelectTemplateSection />
            <SelectEventSection publisherId={thisEvent.user.id} />
        </>
    );
}

export default Book;
