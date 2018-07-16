import React from 'react';
import PropTypes from 'prop-types';
import RestaurantItem from './RestaurantItem';

class RestaurantList extends React.Component {
    render() {
        if (this.props.isLoading) {
            return <p>Loading ...</p>;
        }

        const restaurantsList = Object.keys(this.props.restaurants).map(key => (
            <RestaurantItem key={key} details={this.props.restaurants[key]} />
        ));

        return <div className="restaurants-list">{restaurantsList}</div>;
    }
}

RestaurantList.propTypes = {
    restaurants: PropTypes.array,
    isLoading: PropTypes.bool
};

export default RestaurantList;
