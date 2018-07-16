import React from 'react';

const Avatar = ({ author, pictureSrc }) => {
    return (
        <figure className="avatar">
            <img src={pictureSrc} alt="" />
            <figcaption className="pseudo">
                <strong>{author}</strong>
            </figcaption>
        </figure>
    );
};

export default Avatar;
