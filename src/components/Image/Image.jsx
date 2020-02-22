import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
    width: ${ props => props.width };
`;

export default class Image extends Component {
    render() {
        const { src, alt, width, style } = this.props;

        return (
            <StyledImage
                src={ src }
                alt={ alt }
                width={ width }
                style={ style }
            />
        )
    }
}

Image.defaultProps = {
    alt: 'Image',
    width: '150px'
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    width: PropTypes.string,
    style: PropTypes.object
};