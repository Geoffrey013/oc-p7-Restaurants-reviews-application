import React from 'react';
import PropTypes from 'prop-types';

import rounder from './../helpers/rounder';
import Star from './Star';

class RestaurantAverageStars extends React.Component {
    render() {
        const rate = rounder(this.props.rating);
        const averageArray = [];

        for (let i = 0; i < rate; i++) {
            averageArray.push('');
        }

        const stars = Object.keys(averageArray).map(key => <Star key={key} />);

        return <span className="item-rating">{stars}</span>;
    }
}

RestaurantAverageStars.propTypes = {
    rating: PropTypes.number
};

export default RestaurantAverageStars;
