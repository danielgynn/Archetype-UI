import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { getMarginProperties, getPaddingProperties, hide } from '../../utils';

const StyledText = styled.p`
    ${ props => props.hide && hide(props, 2) };
    color: ${ props => props.theme.colors[props.color || 'text'] };
    font-size: ${ props => props.fontSize ? props.fontSize : props.small ? props.theme.fontSizesSm.pSmall : props.theme.fontSizesSm.p };
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    font-weight: ${ props => props.weight ? props.weight : props.theme.fontWeights.p };
    text-align: ${ props => props.align ? props.align : 'left' };
    ${ props => props.fontStyle ? `font-style: ${ props.fontStyle }` : '' };

    ${ ({ clamp }) => clamp && `
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${ clamp };
        -webkit-box-orient: vertical;
    `}

    ${ breakpoint('md')`
        ${ props => props.hide && hide(props, 1) };
        font-size: ${ props => props.small ? props.theme.fontSizesMed.pSmall : props.theme.fontSizesMed.p };
    ` }

    ${ breakpoint('xl')`
        ${ props => props.hide && hide(props, 0) };
        font-size: ${ props => props.small ? props.theme.fontSizes.pSmall : props.theme.fontSizes.p };
    ` }
`;

export default class Text extends Component {
    render() {
        const { children, className, clamp, html, ...rest } = this.props;

        return (
            <StyledText
                className={ className }
                clamp={ clamp }
                dangerouslySetInnerHTML={ html ? {__html: html} : null }
                { ...rest }>

                { children }

            </StyledText>
        )
    }
}

Text.defaultProps = {
    fontStyle: 'normal'
};

Text.propTypes = {
    clamp: PropTypes.bool,
    html: PropTypes.string,
    fontStyle: PropTypes.string
};