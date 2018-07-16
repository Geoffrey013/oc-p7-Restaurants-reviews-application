import React from 'react';
import PropTypes from 'prop-types';

import EasyFoodMap from './EasyFoodMap';
import EasyFoodSidebar from './EasyFoodSidebar';
import rounder from '../helpers/rounder';

class EasyFoodApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            min: 0,
            max: 5,
        };

        this.map = {};
    }

    componentDidMount() {
        this.setState({ restaurants: this.props.staticRestaurants });
    }

    componentWillReceiveProps(nextProps) {
        const { staticRestaurants } = nextProps;

        const visibleRestaurants = this.getVisibleRestaurants(
            staticRestaurants
        );
        this.refreshRestaurants(visibleRestaurants);
    }

    handleMapLoading = GMap => {
        this.map = GMap;
        this.props.googlePlacesService.initService(GMap);

        this.props.confirmMapHasBeenLoaded();
    };

    onZoomChange = () => {
        const mapCenter = this.map.getCenter();
        const lat = mapCenter.lat();
        const lng = mapCenter.lng();
        this.props.updateRestaurantList(lat, lng);
    };

    onDragend = () => {
        const mapCenter = this.map.getCenter();
        const lat = mapCenter.lat();
        const lng = mapCenter.lng();
        this.props.updateRestaurantList(lat, lng);
    };

    onFilterFormSubmit = starsFilter => {
        const min = starsFilter[0];
        const max = starsFilter[1];

        const visibleRestaurants = this.getVisibleRestaurants();

        const filteredRestaurants = visibleRestaurants.filter(restaurant => {
            return (
                rounder(restaurant.rating) >= min &&
                rounder(restaurant.rating) <= max
            );
        });

        this.setState({
            min: min,
            max: max,
            restaurants: filteredRestaurants
        });
    };

    getVisibleRestaurants = (freshRestaurants = []) => {
        const restaurants =
            freshRestaurants.length > 0
                ? freshRestaurants
                : this.props.staticRestaurants;
        const visibleRestaurants = [];

        restaurants.forEach(restaurant => {
            let position = {};
            //CUSTOM RESTAURANTS
            if (restaurant.isCustom) {
                position = {
                    lat: restaurant.lat,
                    lng: restaurant.lng
                };
            } else {
                //GOOGLE RESTAURANTS
                position = {
                    lat: restaurant.geometry.location.lat(),
                    lng: restaurant.geometry.location.lng()
                };
            }

            if (this.map.getBounds().contains(position)) {
                visibleRestaurants.push(restaurant);
            }
        });

        return visibleRestaurants;
    };

    refreshRestaurants = restaurants => {
        const filteredRestaurants = restaurants.filter(restaurant => {
            let rate = rounder(restaurant.rating);

            return rate >= this.state.min && rate <= this.state.max;
        });

        this.setState({ restaurants: filteredRestaurants });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <EasyFoodMap
                        restaurants={this.state.restaurants}
                        googlePlacesService={this.props.googlePlacesService}
                        onDragend={this.onDragend}
                        onZoomChange={this.onZoomChange}
                        addRestaurant={this.props.addRestaurant}
                        handleMapLoading={this.handleMapLoading}
                        onUserPositionReady={this.props.onUserPositionReady}
                    />
                    <EasyFoodSidebar
                        restaurants={this.state.restaurants}
                        isLoading={this.props.isLoading}
                        handleFilterForm={this.onFilterFormSubmit}
                    />
                </div>
            </div>
        );
    }
}

EasyFoodApp.propTypes = {
    addRestaurant: PropTypes.func,
    confirmMapHasBeenLoaded: PropTypes.func,
    googlePlacesService: PropTypes.object,
    isLoading: PropTypes.bool,
    staticRestaurants: PropTypes.array,
    updateRestaurantList: PropTypes.func,
    onUserPositionReady: PropTypes.func
};



export default EasyFoodApp;
