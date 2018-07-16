import React from 'react';
import PropTypes from 'prop-types';

class AddReviewForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 5,
            title: '',
            text: '',
            author_name: '',
            isCustom: true
        };
    }

    handleRatingChange = event => {
        this.setState({ rating: Number(event.target.value) });
    };

    handleTitleChange = event => {
        this.setState({ title: event.target.value });
    };

    handleCommentChange = event => {
        this.setState({ text: event.target.value });
    };

    handleAuthorChange = event => {
        this.setState({ author_name: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        if (this.props.isCustomRestaurant) {
            this.props.addReviewOnCustomRestaurant(this.state, this.props.restaurantId);
        } else {
            this.props.addReviewOnGoogleRestaurant(this.state);
        }

        this.setState({
            rating: 5,
            title: '',
            text: '',
            author_name: '',
            isCustom: true
        });
    };

    render() {
        return (
            <div className="add-review-wrapper">
                <form
                    action=""
                    className="add-review-form"
                    onSubmit={event => this.handleSubmit(event)}
                >
                    <div className="form-group">
                        <label htmlFor="rating-select">
                            Notez le restaurant
                        </label>
                        <select
                            value={this.state.rating}
                            onChange={this.handleRatingChange}
                            id="rating-select"
                            className="form-control"
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={this.state.author_name}
                            onChange={this.handleAuthorChange}
                            className="form-control"
                            required
                            placeholder="Pseudo"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                            className="form-control"
                            required
                            placeholder="Titre"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            value={this.state.text}
                            onChange={this.handleCommentChange}
                            rows="5"
                            className="form-control"
                            required
                            placeholder="Commentaire"
                        />
                    </div>

                    <button type="submit" className="btn btn-custom">
                        Valider
                    </button>
                </form>
            </div>
        );
    }
}

AddReviewForm.propTypes = {
    addReviewOnCustomRestaurant: PropTypes.func,
    addReviewOnGoogleRestaurant: PropTypes.func,
    restaurantId: PropTypes.string,
    isCustomRestaurant: PropTypes.bool
};


export default AddReviewForm;
