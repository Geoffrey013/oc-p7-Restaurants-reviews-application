import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import RestaurantAddress from './RestaurantAddress';
import RestaurantAverageStars from './RestaurantAverageStars';
import RestaurantThumbnail from './RestaurantThumbnail';
import RestaurantTag from './RestaurantTag';
import slugify from '../helpers/slugify';
import googleTagsTranslator from '../helpers/googleTagsTranslator';
import unusedTags from '../helpers/unusedTags';

class RestaurantItem extends React.Component {

    render() {
        const { name, vicinity, types, rating } = this.props.details;

        let lat = null;
        let lng = null;
        let place_id = '';
        let tags = null;

        if (this.props.details.isCustom) {
            lat = this.props.details.lat;
            lng = this.props.details.lng;
        } else {
            lat = this.props.details.geometry.location.lat();
            lng = this.props.details.geometry.location.lng();
            place_id = this.props.details.place_id;

            const filteredTags = [];
            types.forEach(tag => {
                if (unusedTags.indexOf(tag) === -1) {
                    filteredTags.push(tag);
                }
            });
            
            tags = Object.keys(filteredTags).map(key => (
                <RestaurantTag
                    key={key}
                    tag={googleTagsTranslator(filteredTags[key])}
                />
            ));
        }

        return (
            <div className="restaurant-list-item row">
                <div className="details-wrapper col-md-6">
                    <div className="item-name-with-rate">
                        <h3>{name}</h3>
                        <RestaurantAverageStars rating={rating} />
                    </div>



                    <p className="item-location">
                        <RestaurantAddress vicinity={vicinity} />
                    </p>

                    <ul className="item-tags justify-content-between">
                        {tags}
                    </ul>
                </div>

                <div className="thumbnail-wrapper col-md-6">
                    <RestaurantThumbnail lat={lat} lng={lng} name={name} />

                    <Link
                        className="btn btn-custom float-right"
                        to={{
                            pathname: `/restaurant/${slugify(name)}`,
                            state: {
                                placeId: place_id,
                                restaurant: JSON.stringify(this.props.details)
                            }
                        }}
                    >
                        Voir le restaurant
                    </Link>
                </div>
            </div>
        );
    }
}

RestaurantItem.propTypes = {
    details: PropTypes.object
};

export default RestaurantItem;
