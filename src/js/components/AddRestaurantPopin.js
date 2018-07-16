import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios/index';

class AddRestaurantPopin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const restaurant = {
            name: this.state.name,
            lat: this.props.lat,
            lng: this.props.lng
        };
        this.props.addRestaurant(restaurant);

        this.props.closePopin();
    };

    render() {
        if (!this.props.visiblePopin) {
            return null;
        }

        return (
            <div className="add-restaurant-wrapper">
                <h4>Ajouter un restaurant</h4>
                <form
                    action=""
                    className="add-restaurant-form"
                >
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Nom du restaurant"
                            onChange={this.handleNameChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-custom"
                        onClick={this.handleSubmit}
                    >
                        Valider
                    </button>
                </form>
                <button
                    className="btn exit-form"
                    onClick={this.props.closePopin}
                >
                    <i className="fas fa-times" />
                </button>
            </div>
        );
    }
}

AddRestaurantPopin.propTypes = {
    visiblePopin: PropTypes.bool,
    onMapClick: PropTypes.func,
    closePopin: PropTypes.func,
    addRestaurant: PropTypes.func,
    lat: PropTypes.number,
    lng: PropTypes.number
};

export default AddRestaurantPopin;
