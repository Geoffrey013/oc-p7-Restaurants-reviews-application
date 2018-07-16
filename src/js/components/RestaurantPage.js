import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RestaurantAddress from './RestaurantAddress';
import RestaurantReviewsCount from './RestaurantReviewsCount';
import RestaurantReview from './RestaurantReview';
import AddReviewForm from './AddReviewForm';
import CarrouselMain from './CarrouselMain';

class RestaurantPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurant: {},
            id: "",
            isLoading: true
        };
    }

    componentDidMount() {
        if (!this.props.mapLoaded) {
            return;
        }
        const { restaurant } = this.props.location.state;
        const parsedRestaurant = JSON.parse(restaurant);

        if (JSON.parse(restaurant).isCustom) {
            this.setState({
                restaurant: parsedRestaurant,
                id: parsedRestaurant.id,
                isLoading: false
            });
        } else {
            const { placeId } = this.props.location.state;
            this.props
                .fetchRestaurantDetails(placeId)
                .then(restaurantDetails => {
                    //sometimes restaurantDetails doesn't have review property
                    if (!restaurantDetails.reviews) {
                        Object.defineProperty(restaurant, 'reviews', {
                            value: [],
                            writable: true
                        });
                    }

                    this.setState({
                        restaurant: restaurantDetails,
                        isLoading: false
                    });
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { staticRestaurants } = nextProps;

        const restaurantMatchedById = staticRestaurants.filter(restaurant => {
            return restaurant.id === this.state.id;
        });

        this.setState({ restaurant: restaurantMatchedById[0] });
    }

    addReviewOnGoogleRestaurant = review => {
        this.setState(() => {
            const restaurantToAddComment = this.state.restaurant;
            restaurantToAddComment.reviews.push(review);

            return { restaurant: restaurantToAddComment };
        });
    };

    render() {
        const { restaurant, isLoading } = this.state;

        if (isLoading) {
            return <p>Chargement</p>;
        }

        let reviews = <div>Pas de commentaires</div>;
        let address = restaurant.vicinity;
        let phoneNumber = <span>Numéro indisponible</span>;
        let openingHours = <span>Non disponibles</span>;
        let imgSrc = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${
            restaurant.lat
            },${
            restaurant.lng
            }&pitch=-0.76&key=AIzaSyBOrc8O6T-bC5dRJaDSVEAl-5yeqn1sINU`;

        if (!restaurant.isCustom) {
            address = `${restaurant.address_components[0].short_name}, ${
                restaurant.address_components[1].short_name
                } ${restaurant.address_components[2].short_name}`;
            phoneNumber = restaurant.formatted_phone_number;

            if (restaurant.photos) {
                imgSrc = restaurant.photos;
            } else {
                imgSrc = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${
                    restaurant.geometry.location.lat()
                    },${
                    restaurant.geometry.location.lng()
                    }&pitch=-0.76&key=AIzaSyBOrc8O6T-bC5dRJaDSVEAl-5yeqn1sINU`;
            }

            if (restaurant.opening_hours) {
                openingHours = Object.keys(
                    restaurant.opening_hours.weekday_text
                ).map(key => (
                    <li className="opening-day" key={key}>
                        {restaurant.opening_hours.weekday_text[key]}
                    </li>
                ));
            }

            if (restaurant.reviews) {
                reviews = Object.keys(restaurant.reviews).map(key => (
                    <RestaurantReview
                        key={key}
                        review={restaurant.reviews[key]}
                    />
                ));
            }
        } else {
            if (restaurant.reviews.length > 0) {
                reviews = Object.keys(restaurant.reviews).map(key => (
                    <RestaurantReview
                        key={key}
                        review={restaurant.reviews[key]}
                    />
                ));
            }
        }

        return (
            <div className="container restaurant-interface">
                <header className="restaurant-header">
                    <h2>{restaurant.name}</h2>

                    <div className="address-wrapper">
                        <span className="icon">
                            <i className="fas fa-map-marker" />
                        </span>
                        <RestaurantAddress vicinity={address} />

                        <span className="phone-wrapper">
                            <span className="icon phone-icon">
                            <i className="fas fa-phone" />
                        </span>
                        <span className="phone-number">
                            {phoneNumber}
                        </span>
                        </span>
                    </div>
                </header>

                <CarrouselMain photos={imgSrc}/>

                <div className="row opening-form-wrapper">
                    <ul className="opening-hours col-md-4">
                        <h3>Horaires</h3>
                        {openingHours}
                    </ul>

                    <div className="add-reviews col-md-8">
                        <header className="reviews-header">
                            <h3>
                                <RestaurantReviewsCount
                                    reviews={restaurant.reviews}
                                />
                            </h3>
                        </header>

                        <AddReviewForm
                            addReviewOnCustomRestaurant={this.props.addReviewOnCustomRestaurant}
                            addReviewOnGoogleRestaurant={this.addReviewOnGoogleRestaurant}
                            restaurantId={this.state.restaurant.id}
                            isCustomRestaurant={this.state.restaurant.isCustom}
                        />
                    </div>
                </div>

                <div className="published-reviews">{reviews}</div>

                <div className="map-return">
                    <Link
                        className="btn btn-custom"
                        to={{
                            pathname: "/"
                        }}
                    >
                        Retour à la carte
                    </Link>
                </div>

            </div>
        );
    }
}

RestaurantPage.propTypes = {
    mapLoaded: PropTypes.bool,
    staticRestaurants: PropTypes.array,
    fetchRestaurantDetails: PropTypes.func,
    googlePlacesService: PropTypes.object,
    addReviewOnCustomRestaurant: PropTypes.func
};

export default RestaurantPage;
