import React, { Component } from 'react';
import styled from 'styled-components';

import { getMarginProperties, getPaddingProperties } from '../../utils';

const StyledText = styled.p`
    color: ${ props => props.theme.colours[props.colour || 'text'] };
    font-size: ${ props => props.small ? props.theme.fontSizes.pSmall : 'inherit' };
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    font-weight: ${ props => props.theme.fontWeights.p };
`;

export default class Text extends Component {
    render() {
        const { children, className, ...rest } = this.props;

        return (
            <StyledText
                className={ className }
                { ...rest }>

                { children }

            </StyledText>
        )
    }
}