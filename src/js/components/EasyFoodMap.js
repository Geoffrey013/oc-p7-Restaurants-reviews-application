import React from 'react';
import PropTypes from 'prop-types';

import AddRestaurantPopin from './AddRestaurantPopin';
import { INITIAL_LOCATION } from '../helpers/config';

class EasyFoodMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 14,
            visiblePopin: false,
            clickLat: null,
            clickLng: null
        };
    }

    componentDidMount() {
        this.map = this.createMap();
        this.markers = [];

        let userPosition = {};

        navigator.geolocation.getCurrentPosition((position) => {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            new google.maps.Marker({
                position: userPosition,
                map: this.map,
                icon: "./img/icon1.png",
                description: "utilisateur"
            });

            this.map.setCenter(userPosition);
            this.updateMarkers();

            this.props.onUserPositionReady(userPosition.lat, userPosition.lng);
        }, () => {
            console.log('geoloc refused');
        });

        this.props.handleMapLoading(this.map);

        this.map.addListener('dragend', () => {
            this.props.onDragend();
        });

        this.map.addListener('zoom_changed', () => {
            this.props.onZoomChange();
        });

        this.map.addListener('click', event => {
            this.onMapClick(event);
        });
    }

    componentDidUpdate() {
        this.updateMarkers();
    }

    createMap() {
        let mapOptions = {
            zoom: this.state.zoom,
            center: this.mapCenter()
        };

        return new google.maps.Map(this.mapCanvas, mapOptions);
    }

    mapCenter() {
        return new google.maps.LatLng(
            INITIAL_LOCATION.position.latitude,
            INITIAL_LOCATION.position.longitude
        );
    }

    updateMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null);
        });

        if (this.props.restaurants.length > 0) {
            this.props.restaurants.forEach(restaurant => {
                this.createMarker(restaurant);
            });
        }
    }

    createMarker(restaurant) {
        let lat = null;
        let lng = null;

        if (restaurant.isCustom) {
            lat = restaurant.lat;
            lng = restaurant.lng;
        } else {
            lat = restaurant.geometry.location.lat();
            lng = restaurant.geometry.location.lng();
        }

        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: this.map,
            description: restaurant.name
        });

        const contentString = `<div class='info-window'>
                <h4><strong> ${restaurant.name}</strong></h4>
                <p class="info-window-text">${restaurant.vicinity}</p>.
            </div>`;

        const infoWindow = new google.maps.InfoWindow({
            map: this.map,
            content: contentString
        });

        marker.addListener('click', function() {
            infoWindow.open(this.map, marker);
        });

        this.markers.push(marker);
    }

    onMapClick = event => {
        this.setState({
            visiblePopin: true,
            clickedLat: event.latLng.lat(),
            clickedLng: event.latLng.lng()
        });
    };

    closePopin = () => {
        this.setState({ visiblePopin: false });
    };

    render() {
        return (
            <div className="col-lg-8">
                <div className="GMap">
                    <AddRestaurantPopin
                        visiblePopin={this.state.visiblePopin}
                        onMapClick={this.onMapClick}
                        closePopin={this.closePopin}
                        addRestaurant={this.props.addRestaurant}
                        lat={this.state.clickedLat}
                        lng={this.state.clickedLng}
                    />

                    <div
                        className="GMap-canvas"
                        ref={div => (this.mapCanvas = div)}
                    />
                </div>
            </div>
        );
    }
}

EasyFoodMap.propTypes = {
    handleMapLoading: PropTypes.func,
    onDragend: PropTypes.func,
    onZoomChange: PropTypes.func,
    restaurants: PropTypes.array,
    addRestaurant: PropTypes.func,
    googlePlacesService: PropTypes.object,
    onUserPositionReady: PropTypes.func

};

export default EasyFoodMap;
