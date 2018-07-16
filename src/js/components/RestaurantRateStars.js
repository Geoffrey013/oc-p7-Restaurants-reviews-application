import React from 'react';
import Star from './Star';
import PropTypes from 'prop-types';

class RestaurantRateStars extends React.Component {
    render() {
        const rateArray = [];

        for (let i = 0; i < this.props.stars; i++) {
            rateArray.push('');
        }

        const stars = Object.keys(rateArray).map(key => <Star key={key} />);

        return <span>{stars}</span>;
    }
}

RestaurantRateStars.propTypes = {
    stars: PropTypes.number
};

export default RestaurantRateStars;
