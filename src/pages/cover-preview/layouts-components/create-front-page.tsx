import React from 'react';
import { useSelector } from 'react-redux';
import noImage from 'assets/images/edit-book/no-photo-blue.png';

const noImageStyle = {
    backgroundImage: `url(${noImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: ' 40px',
    backgroundPosition: 'center center'
};

const draggingEventClasses = {
    draggingEventLeftActive: 'create-front-back__left-block blocks yes',
    draggingEventLeft: 'create-front-back__left-block blocks'
};

const blockNames = {
    block1: 'block-1',
    block2: 'block-2',
    block3: 'block-3',
    block4: 'block-4'
};

function CreateFront() {
    const draggingEvent = useSelector((state: IOneBook) => state.ThisBook.drag);

    function dragEnter(e: any) {
        e.target.classList.add('enter');
    }

    function dragLeave(e: any) {
        e.preventDefault();
        e.target.classList.remove('enter');
    }

    function dropImages(e: any) {
        e.preventDefault();
        e.target.style.backgroundImage = `url(${draggingEvent.imgUrl})`;
        e.target.style.backgroundPosition = '50% 50%';
        e.target.style.backgroundSize = 'auto 100%';
        e.target.style.backgroundRepeat = 'no-repeat';
    }

    function dragOver(e: any) {
        e.preventDefault();
    }

    return (
        <div className="carousel-item-bg">
            <div className="slider-item">
                <div className="create-front-back">
                    <div
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={dropImages}
                        onDragOver={dragOver}
                        data-block-name={blockNames.block1}
                        className={
                            draggingEvent.start
                                ? draggingEventClasses.draggingEventLeftActive
                                : draggingEventClasses.draggingEventLeft
                        }
                        style={noImageStyle}
                    />
                </div>
                {/*New York Fashion Week*/}
            </div>
        </div>
    );
}

export default CreateFront;
