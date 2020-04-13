import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { space, borders, hide } from '../../utils';

const ImageContainer = styled.div`
    ${ props => space(props, 2) };
    ${ props => borders(props) };
    ${ props => props.hide && hide(props, 2) };

    ${ breakpoint('md') `${ props => space(props, 1) }; ${ props => props.hide && hide(props, 1) };` }
    ${ breakpoint('lg') `${ props => space(props, 0) }; ${ props => props.hide && hide(props, 1) };` }
`;

const StyledImage = styled.img`
    width: ${ props => props.width };
    height: ${ props => props.height };
    max-width: 100%;
`;

const Caption = styled.figcaption`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .75rem;
    display: block;
    margin-top: 5px;
`;

export default class Image extends Component {
    render() {
        const { src, alt, width, height, style, caption, ...rest } = this.props;

        return (
            <ImageContainer
                { ...rest }
            >
                <StyledImage
                    src={ src }
                    alt={ alt }
                    width={ width }
                    height={ height }
                    style={ style }
                />
                { (caption) && <Caption>{ caption } </Caption> }
            </ImageContainer>
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