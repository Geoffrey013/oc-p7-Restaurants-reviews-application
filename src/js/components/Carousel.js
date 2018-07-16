import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CarouselContainer from './CarouselContainer'
import CarouselWrapper from './CarouselWrapper'
import CarouselSlot from './CarouselSlot'

class Carousel extends Component {
    constructor(props){
        super(props);

        this.state = {
            direction: 'next',
            position: 0,
            isSliding: false
        }
    }

    getOrder(itemIndex) {
        const { position } = this.state;
        const { children } = this.props;
        const numItems = children.length || 1;
        if (itemIndex - position < 0) {
            return numItems - Math.abs(itemIndex - position)
        }
        return itemIndex - position
    }

    nextSlide = () => {
        let { position } = this.state;
        const { children } = this.props;
        const numItems = children.length || 1;

        const newPosition = position === numItems - 1 ? 0 : position + 1;

        this.doSliding(newPosition)
    };

    prevSlide = () => {
        let { position } = this.state;
        const { children } = this.props;
        const numItems = children.length || 1;

        const newPosition = position === 0 ? numItems - 1 : position - 1;

        this.doSliding(newPosition, 'prev');
    };

    doSliding = (position, direction) => {
        this.setState({
            isSliding: true,
            direction,
            position
        });
        setTimeout(() => {
            this.setState({
                isSliding: false
            })
        }, 50)
    };

    render() {
        const { children } = this.props;
        return (
            <div>
                <CarouselWrapper>
                    <CarouselContainer isSliding={this.state.isSliding} direction={this.state.direction}>
                        { children.map((child, index) => (
                            <CarouselSlot
                                key={ index }
                                order={ this.getOrder(index) }
                            >
                                {child}
                            </CarouselSlot>
                        )) }
                    </CarouselContainer>
                    <button className="carousel-prev" onClick={ () => this.prevSlide() }/>
                        <button className="carousel-next" onClick={ () => this.nextSlide() }/>
                </CarouselWrapper>
            </div>
        )
    }
}

Carousel.propTypes = {
    children: PropTypes.node
};

export default Carousel;