import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import StarsFilterForm from './StarsFilterForm';
import RestaurantList from './RestaurantList';

class EasyFoodSidebar extends React.Component {
    render() {
        const { restaurants, handleFilterForm } = this.props;

        return (
            <aside className="col-lg-4">
                <Header />
                <div className="padding-wrapper">
                    <div className="sidebar-header">
                        <h2>Restaurants à proximité</h2>

                        <StarsFilterForm handleFilterForm={handleFilterForm} />
                    </div>

                    <RestaurantList
                        restaurants={restaurants}
                        isLoading={this.props.isLoading}
                    />
                </div>
            </aside>
        );
    }
}

EasyFoodSidebar.propTypes = {
    handleFilterForm: PropTypes.func,
    restaurants: PropTypes.array
};

export default EasyFoodSidebar;
