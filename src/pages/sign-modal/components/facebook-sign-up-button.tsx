import React from 'react';

interface thisProps {
    onClick?: any;
}

const FacebookSignUpButton = ({ onClick }: thisProps) => {
    return (
        <span onClick={onClick} className="gray-btn-fb mr-2">
            <i className="fab fa-facebook-f fs20" />
        </span>
    );
};

export default FacebookSignUpButton;
