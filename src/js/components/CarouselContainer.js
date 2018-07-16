import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  
  transition: ${(props) => props.isSliding ? 'none' : 'transform 1s ease'};
  transform: ${(props) => {
    if (!props.isSliding) return 'translateX(calc(-100%))'
    if (props.direction === 'prev') return 'translateX(calc(2 * (-100%)))'
    return 'translateX(0%)'
}};
`;

export default CarouselContainer;
