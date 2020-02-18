import React, { Component } from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
    color: ${ props => props.theme.colours[props.colour || 'text'] };
    font-size: ${ props => props.small ? props.theme.fontSizes.pSmall : 'inherit' };
    margin: ${ props => props.margin || '.5rem 0 0'};
    font-weight: ${ props => props.theme.fontWeights.p };
`;

export default class Text extends Component {
    render() {
        const { children, className, colour, margin, small } = this.props;

        return (
            <StyledText
                className={ className }
                colour={ colour }
                margin={ margin }
                small={ small }>

                { children }

            </StyledText>
        )
    }
}