import React from 'react';
import { keyGenerator } from 'utils/helpers';
import { setCurrentTemplate } from 'redux/edit-book';
import { useDispatch, useSelector } from 'react-redux';

interface ThisProps {
    template: IBookTemplate;
    index: number;
}

function LayoutBlocks({ template, index }: ThisProps) {
    const dispatch = useDispatch();

    const Layouts = useSelector(
        (state: IOneBook) => state.ThisBook.bookTemplates
    );

    const currentTemplate = useSelector(
        (state: IOneBook) => state.ThisBook.currentTemplate
    );

    function OpenLayout(e: any) {
        const thisId = e.target.getAttribute('data-id');

        const thisTemplate = Layouts.find(
            (template: IBookTemplate) => template.id === thisId
        );
        dispatch(setCurrentTemplate(thisTemplate));
    }

    return (
        <div
            key={keyGenerator(30)}
            className="layout-box cursor-pointer"
            data-id={template.id}>
            <span
                onClick={OpenLayout}
                data-id={template.id}
                className={`layout-box-link ${
                    currentTemplate.id === template.id && 'active'
                }`}>
                <img
                    src={template?.logoURL}
                    data-id={template.id}
                    alt="icon"
                    className="db"
                />
                Layout {index + 1}
            </span>
        </div>
    );
}

export default LayoutBlocks;
