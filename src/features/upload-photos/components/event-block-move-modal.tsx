import React, { useRef } from 'react';
import { textCrop } from 'utils/helpers';
import CardBodyAlbumMoveModal from './card-body-album-move-modal';
import { removeClassActiveEventsMenus } from '../helper-modal-move';
import { useDispatch, useSelector } from 'react-redux';
import { setActivateCodeModalMove } from 'redux/modals';
import { Accordion, Card } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

interface IThisProps {
    event: IEvent;
}

function EventBlockMoveModal({ event }: IThisProps) {
    const dispatch = useDispatch();
    const thisKey = `event__${event.id}`;
    const thisEventTable = useRef<any>();

    const ActivateCode = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.activateCodeModalMove
    );

    function dragEnter() {
        removeClassActiveEventsMenus();
        thisEventTable.current?.classList.add('active');
        dispatch(setActivateCodeModalMove(thisKey));
    }

    const decoratedOnClick = useAccordionToggle(thisKey, () => {
        dragEnter();
    });

    const activeBlock = ActivateCode === thisKey;

    return (
        <Card className="border-0">
            <Card.Header className="bg-white border-0 pb-1">
                <button
                    className={`btn btn-outline-primary button-to-move-modal ${
                        activeBlock && 'active'
                    }`}
                    onClick={decoratedOnClick}
                    onDragEnter={decoratedOnClick}>
                    <span>
                        <i className="far fa-images mr-2" />
                        {textCrop(event.name, 15)}
                    </span>
                    <i className="fas fa-chevron-down c-blue" />
                </button>
            </Card.Header>
            <Accordion.Collapse eventKey={thisKey} className="mt-0 pt-0">
                <Card.Body className="mt-0 pt-0">
                    <CardBodyAlbumMoveModal albums={event.albums} />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default EventBlockMoveModal;
