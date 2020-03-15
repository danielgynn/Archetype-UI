import React, { Component } from 'react';
import styled from 'styled-components';

import { getMarginProperties, getPaddingProperties } from '../../utils';

const StyledText = styled.p`
    color: ${ props => props.theme.colors[props.color || 'text'] };
    font-size: ${ props => props.fontSize ? props.fontSize : props.small ? props.theme.fontSizes.pSmall : 'inherit' };
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    font-weight: ${ props => props.weight ? props.weight : props.theme.fontWeights.p };
    text-align: ${ props => props.align ? props.align : 'left' };

    ${ ({ clamp }) => clamp && `
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${ clamp };
        -webkit-box-orient: vertical;
    `}
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