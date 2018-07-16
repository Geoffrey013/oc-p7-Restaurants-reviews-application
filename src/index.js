import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import EasyFoodApp from './js/components/EasyFoodApp';
import RestaurantPage from './js/components/RestaurantPage';
import NotFound from './js/components/NotFound';
import slugify from './js/helpers/slugify';
import { makeCancelable } from './js/helpers/promise';
import googlePlacesApi from './js/helpers/googlePlacesApi';
import { INITIAL_LOCATION } from './js/helpers/config';
import getAverageRoundedRate from "./js/helpers/average";

class Root extends React.Component {
    constructor(props) {
        super(props);

        this.googlePlacesService = new googlePlacesApi();

        this.state = {
            staticRestaurants: [],
            selectedRestaurantId: '',
            detailedRestaurant: {},
            userPosition: {},
            isLoading: true,
            mapLoaded: false
        };
    }

    /*
     * Given the Google API request is async, the component might not be mounted when the data arrives.
     * When the arrow function inside your then() is being called,
     * the component had already finished mounting and continued to rendering probably. This the nature of Promise.
     */
    componentDidMount() {
        this.cancelablePromise = makeCancelable(
            this.googlePlacesService.nearbySearch(
                new google.maps.LatLng(
                    INITIAL_LOCATION.position.latitude,
                    INITIAL_LOCATION.position.longitude
                ),
                500,
                ['restaurant']
            )
        );

        this.cancelablePromise.promise
            .then(results => {
                this.setState({
                    staticRestaurants: results,
                    isLoading: false
                });
            })
            .catch(reason => console.log('isCanceled', reason.isCanceled));
    }

    /*
     *  In React v16, componentWillUnmount is called after the next component is created (a new instance has been created)
     */
    componentWillUnmount() {
        // property certifies that the component is unmounted
        this.__unmount = true;

        this.cancelablePromise.cancel();
    }

    fetchRestaurantDetails = placeId => {
        return this.googlePlacesService.getDetails(placeId);
    };

    onUserPositionReady = (userLat, userLng) => {
        // if it's not unmounted, we can update the state
        // unmount: true or undefined
        if (!this.__unmount) {
            this.updateRestaurantList(userLat, userLng)
        }
    };

    // getDetails query in RestaurantPage only when map is ready
    confirmMapHasBeenLoaded = () => {
        this.setState({
            mapLoaded: true,
        });
    };
    updateRestaurantList = (lat, lng) => {
        this.googlePlacesService
            .nearbySearch(
                new google.maps.LatLng(lat, lng),
                500,
                ['restaurant']
            )
            .then(results => {
                const newRestaurants = results;

                this.setState((prevState, props) => {
                    const oldRestaurants = prevState.staticRestaurants;

                    // get custom restaurants
                    const customRestaurants = oldRestaurants.filter((restaurant) => {
                        return restaurant.isCustom;
                    });

                    customRestaurants.forEach((restaurant) => {
                        newRestaurants.push(restaurant);
                    });

                    return {
                        staticRestaurants: newRestaurants
                    };
                });
            });
    };

    addRestaurant = restaurant => {
        const slug = slugify(restaurant.name);
        const id = this.state.staticRestaurants.length + 1;

        axios
            .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
                    restaurant.lat
                    },${restaurant.lng}&key=AIzaSyBOrc8O6T-bC5dRJaDSVEAl-5yeqn1sINU`
            )
            .then(response => {
                const number =
                    response.data.results[0].address_components[0].long_name;
                const road =
                    response.data.results[0].address_components[1].long_name;
                const postalCode =
                    response.data.results[0].address_components[6].long_name;
                const city =
                    response.data.results[0].address_components[2].long_name;
                const address = `${number} ${road}, ${postalCode} ${city}`;

                const newRestaurant = {
                    id: id,
                    isCustom: true,
                    slug: slug,
                    name: restaurant.name,
                    vicinity: address,
                    lat: restaurant.lat,
                    lng: restaurant.lng,
                    rating: 0,
                    reviews: []
                };

                const newRestaurantList = this.state.staticRestaurants;

                newRestaurantList.push(newRestaurant);

                this.setState({ staticRestaurants: newRestaurantList });
            });
    };

    addReviewOnCustomRestaurant = (review, restaurantId) => {
        const { staticRestaurants } = this.state;

        for (let i = 0; i < staticRestaurants.length; i++) {
            const currentRestaurant = staticRestaurants[i];

            if (currentRestaurant.id === restaurantId) {
                currentRestaurant.reviews.push(review);
                currentRestaurant.rating = getAverageRoundedRate(currentRestaurant.reviews);
            }
        }

        this.setState({ staticRestaurants });
    };

    render() {
        return (
            <Router>
                <div className="router">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <EasyFoodApp
                                    {...props}
                                    staticRestaurants={
                                        this.state.staticRestaurants
                                    }
                                    isLoading={this.state.isLoading}
                                    confirmMapHasBeenLoaded={
                                        this.confirmMapHasBeenLoaded
                                    }
                                    onUserPositionReady={this.onUserPositionReady}
                                    updateRestaurantList={
                                        this.updateRestaurantList
                                    }
                                    addRestaurant={this.addRestaurant}

                                    googlePlacesService={
                                        this.googlePlacesService
                                    }
                                />
                            )}
                        />

                        <Route
                            name="restaurant-page"
                            path="/restaurant/:slug"
                            render={props => (
                                <RestaurantPage
                                    {...props}
                                    mapLoaded={this.state.mapLoaded}
                                    staticRestaurants={
                                        this.state.staticRestaurants
                                    }
                                    fetchRestaurantDetails={
                                        this.fetchRestaurantDetails
                                    }
                                    googlePlacesService={
                                        this.googlePlacesService
                                    }
                                    addReviewOnCustomRestaurant={this.addReviewOnCustomRestaurant}
                                />
                            )}
                        />

                        <Route render={() => <NotFound />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));

module.hot.accept();