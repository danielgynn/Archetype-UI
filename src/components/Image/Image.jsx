import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { space } from '../../utils';

const StyledImage = styled.img`
    width: ${ props => props.width };
    height: ${ props => props.height };
    ${ props => space(props) };
`;

export default class Image extends Component {
    render() {
        const { src, alt, width, height, style, ...rest } = this.props;

        return (
            <StyledImage
                src={ src }
                alt={ alt }
                width={ width }
                height={ height }
                style={ style }
                { ...rest }
            />
        )
    }
}

Image.defaultProps = {
    alt: 'Image',
    width: '150px'
};

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    style: PropTypes.object
};