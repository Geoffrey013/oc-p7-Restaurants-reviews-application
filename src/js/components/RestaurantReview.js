import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';
import RestaurantRateStars from './RestaurantRateStars';

class RestaurantReview extends React.Component {
    render() {
        const { review } = this.props;
        let authorPhotoUrl = '/img/avatar.png';
        let publicationDate = 'aucune info';

        if (!review.isCustom) {
            authorPhotoUrl = review.profile_photo_url;
            publicationDate = review.relative_time_description;
        }

        return (
            <div className="review row">
                <div className="post-id col-sm-2">
                    <Avatar
                        author={review.author_name}
                        pictureSrc={authorPhotoUrl}
                    />
                </div>

                <div className="post-content col-sm-9">
                    <div className="rate">
                        <span className="stars">
                            <RestaurantRateStars stars={review.rating} />
                        </span>
                        <span className="publication-date">
                            Avis publié: {publicationDate}
                        </span>
                    </div>

                    <p className="comment">{review.text}</p>
                </div>
            </div>
        );
    }
}

RestaurantReview.propTypes = {
    ratings: PropTypes.object
};

export default RestaurantReview;
