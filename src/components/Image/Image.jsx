import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { space, borders, hide } from '../../utils';

const StyledImage = styled.img`
    width: ${ props => props.width };
    height: ${ props => props.height };
    ${ props => space(props, 2) };
    ${ props => borders(props) };
    ${ props => props.hide && hide(props, 2) };

    ${ breakpoint('md') `${ props => space(props, 1) }; ${ props => props.hide && hide(props, 1) };` }
    ${ breakpoint('lg') `${ props => space(props, 0) }; ${ props => props.hide && hide(props, 1) };` }
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
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    style: PropTypes.object
};