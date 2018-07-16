import React from 'react';
import PropTypes from 'prop-types';

const RestaurantTag = ({ tag }) => {
    return (
        <li>
            <i>{tag}</i>
        </li>
    );
};

RestaurantTag.propTypes = {
    tag: PropTypes.string
};

export default RestaurantTag;
