import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Carousel from './Carousel'

export default class CarouselMain extends Component {
    render() {
        const { photos } = this.props;

        let photoItems = {};

        if (typeof(photos) !== 'string') {

            if (photos.length === 1) {
                photoItems = photos[0];

                return (
                    <figure className="restaurant-single-img">
                        <img src={photoItems.getUrl({ maxWidth: 1040 })} alt=""/>
                    </figure>
                )
            }

            photoItems = Object
                .keys(photos)
                .map(key => (
                    <img key={key} src={photos[key].getUrl({ maxWidth: 1040 })}/>
                ));

            return (
                <div className="carousel">
                    <Carousel>
                        {photoItems}
                    </Carousel>
                </div>
            );
        } else {
            return (
                <figure className="restaurant-single-img">
                    <img src={photos} alt=""/>
                </figure>
            )
        }
    }
}

CarouselMain.propTypes = {
    photos: PropTypes.array
};