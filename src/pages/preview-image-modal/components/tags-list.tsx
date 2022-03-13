import React from 'react';
import { keyGenerator } from 'utils/helpers';

interface PropTypes {
    tags: tagsType[];
    removeTagFromImage: (id: number) => void;
}
export const TagsList = ({ tags, removeTagFromImage }: PropTypes) => {
    return (
        <div className="form-group">
            <label>Tags</label>
            <ul className="d-flex flex-wrap">
                {tags.map((tag) => {
                    return (
                        <li className="mr-1 mb-2" key={keyGenerator(30)}>
                            <div className="tag-btn">
                                {tag.title}
                                <i
                                    className="fas fa-times fs12 ml-2 tag-close cursor-pointer"
                                    onClick={() => {
                                        removeTagFromImage(tag.id);
                                    }}
                                />
                            </div>
                        </li>
                    );
                })}

                <li className="mr-1 mb-2 cursor-pointer">
                    <div className="tag-btn">Add a tag…</div>
                </li>
            </ul>
        </div>
    );
};
