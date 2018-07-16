import styled from 'styled-components';
import PropTypes from 'prop-types';

const CarouselSlot = styled.div`
    flex: 1 0 100%;
    flex-basis: 100%;
  
    order: ${(props) => props.order};
`;

CarouselSlot.propTypes = {
    order: PropTypes.number
};

export default CarouselSlot;

