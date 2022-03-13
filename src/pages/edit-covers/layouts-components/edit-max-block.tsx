import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { keyGenerator } from 'utils/helpers';

const colors = [
    { color: [66, 73, 74], id: 1 },
    { color: [95, 96, 96], id: 2 },
    { color: [224, 224, 225], id: 3 },
    { color: [255, 255, 255], id: 4 },
    { color: [177, 32, 41], id: 5 },
    { color: [0, 46, 109], id: 6 },
    { color: [2, 29, 73], id: 7 },
    { color: [0, 121, 255], id: 8 }
];

interface IThisProps {
    thisBlock: any;
    openClose: boolean;
    handleClose: any;
}

function EditMaxBlock({ thisBlock, openClose, handleClose }: IThisProps) {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(openClose);
    }, [openClose]);

    function closeEditing() {
        handleClose(false);
    }

    function editBorderColor(e: any) {
        const ThisID = e.target.getAttribute('data-border-color');

        const thisColor: any = colors.find(
            (color) => color.id === Number(ThisID)
        );
        thisBlock.current.children[1].style.borderColor = `rgb(${thisColor.color[0]}, ${thisColor.color[1]}, ${thisColor.color[2]})`;
        thisBlock.current.children[1].style.borderWidth = '0.1875rem';
        thisBlock.current.children[1].style.borderStyle = 'solid';
    }

    return (
        <>
            <div
                className="edit-right-panel pt-5"
                style={{ right: status ? '0' : '-350px' }}>
                <div className="slider-opacity">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="text c-black">BORDER COLOR</h4>
                    </div>
                    <div className="slidecontainer d-flex">
                        {colors.map((color: any) => {
                            return (
                                <div
                                    key={keyGenerator(30)}
                                    className="colors"
                                    data-border-color={color.id}
                                    onClick={editBorderColor}
                                    style={{
                                        background: `rgb(${color.color[0]} ${color.color[1]} ${color.color[2]})`
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mt-2 d-flex justify-content-between">
                    <Link
                        className="btn btn-save w-100 right-block-toll-bar"
                        to="#"
                        onClick={closeEditing}>
                        <span className="d-flex align-items-center justify-content-center">
                            <i className="fas fa-print mr-2" />
                            Save
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default EditMaxBlock;
