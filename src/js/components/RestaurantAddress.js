import React from 'react';
import PropTypes from 'prop-types';

const RestaurantAddress = ({ vicinity }) => {
    return <span className="address">{vicinity}</span>;
};

RestaurantAddress.propTypes = {
    vicinity: PropTypes.string
};

export default RestaurantAddress;
