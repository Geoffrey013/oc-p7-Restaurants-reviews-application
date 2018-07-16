import React from 'react';
import PropTypes from 'prop-types';

const RestaurantThumbnail = props => {
    const { lat, lng, name } = props;
    return (
        <figure>
            <img
                src={`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&pitch=-0.76&key=AIzaSyBOrc8O6T-bC5dRJaDSVEAl-5yeqn1sINU`}
                alt={name}
            />
        </figure>
    );
};

RestaurantThumbnail.propTypes = {
    lat: PropTypes.number,
    long: PropTypes.number,
    restaurantName: PropTypes.string
};

export default RestaurantThumbnail;
