import React from 'react';
import PropTypes from 'prop-types';

const RestaurantReviewsCount = ({ reviews }) => {
    if (reviews) {
        return <span className="reviews-count">{reviews.length} avis</span>;
    } else {
        return <span>Aucun avis</span>
    }

};

RestaurantReviewsCount.propTypes = {
    ratings: PropTypes.array
};

export default RestaurantReviewsCount;
