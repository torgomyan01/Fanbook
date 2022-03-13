import React, { ChangeEvent } from 'react';
import { Dropdown } from 'react-bootstrap';

interface IThisProps {
    inputId: string;
    inputChange?: any;
    removeChange?: any;
}

function EditImageDropdown({ inputChange, inputId, removeChange }: IThisProps) {
    function getBase64(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                inputChange(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }
    return (
        <div className="edit-user-images">
            <Dropdown>
                <Dropdown.Toggle variant="danger">
                    <i className="fas fa-pen" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div className="pl-4 mt-2 cursor-pointer">
                        <label htmlFor={inputId} className="cursor-pointer">
                            <i className="fas fa-upload mr-2 c-red" />
                            Upload
                        </label>
                    </div>
                    <div
                        className="pl-4 cursor-pointer font-light"
                        onClick={removeChange}>
                        <label className="cursor-pointer">
                            <i className="fas fa-trash mr-2 c-red" />
                            Remove
                        </label>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            <input
                accept="image/*"
                className="d-none"
                id={inputId}
                onChange={getBase64}
                type="file"
            />
        </div>
    );
}

export default EditImageDropdown;
