import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { space, borders, hide } from '../../utils';

const ImageContainer = styled.div`
    width: ${ props => props.width };
    ${ props => space(props, 2) };
    ${ props => borders(props) };
    ${ props => props.hide && hide(props, 2) };

    ${ breakpoint('md') `${ props => space(props, 1) }; ${ props => props.hide && hide(props, 1) };` }
    ${ breakpoint('lg') `${ props => space(props, 0) }; ${ props => props.hide && hide(props, 1) };` }
`;

const StyledImage = styled.img`
    width: ${ props => props.width };
    height: ${ props => props.height };
    ${ props => borders(props) };
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
    constructor(props) {
        super(props);
        this.state = {dimensions: {}};
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    addFallbackImage(e) {
        const { fallback } = this.props;

        e.target.src = fallback;
    }

    onImgLoad({target: img}) {
        this.setState({
            dimensions:{
                height: img.naturalHeight || img.offsetHeight,
                width: img.naturalWidth || img.offsetWidth
            }
        });
    }

    render() {
        const { src, alt, width, height, style, caption, useExactSize, imageWidth, radius, fallback, onError, ...rest } = this.props;
        const { dimensions } = this.state;

        return (
            <ImageContainer
                width={ width }
                { ...rest }
            >
                <StyledImage
                    src={ src }
                    alt={ alt }
                    width={ useExactSize ? `${dimensions.width}px` : imageWidth }
                    height={ useExactSize ? `${dimensions.height}px` : height }
                    style={ style }
                    radius={ radius }
                    onLoad={this.onImgLoad}
                    onError={ onError ? (e) => onError(e) : fallback ? (e) => this.addFallbackImage(e) : null }
                />
                { (caption) && <Caption>{ caption } </Caption> }
            </ImageContainer>
        )
    }
}

Image.defaultProps = {
    alt: 'Image',
    width: '150px',
    imageWidth: '100%',
    height: 'auto',
    useExactSize: false
};

Image.propTypes = {
    src: PropTypes.string,
    fallback: PropTypes.string,
    alt: PropTypes.string.isRequired,
    onError: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    style: PropTypes.object,
    useExactSize: PropTypes.bool
};