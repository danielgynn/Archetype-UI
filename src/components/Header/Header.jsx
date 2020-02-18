import React, { Component } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h1`
    color: ${ props => props.theme.colours[props.colour || 'text'] };
    font-size: ${ props => props.theme.fontSizes[`h${ props.level }`] };
    margin: ${ props => props.margin || '1rem 0 0'};
    font-weight: ${ props => props.weight || props.theme.fontWeights[`h${ props.level }`] };
`;

export default class Header extends Component {
    render() {
        const {
            level, children, className, colour, margin, weight, theme
        } = this.props;

        return (
            <StyledHeader
                as={ `h${level}` }
                theme={ theme }
                className={ className }
                colour={ colour }
                level={ level }
                margin={ margin }
                weight={ weight }>

                { children }

            </StyledHeader>
            
        );
    }
}

Header.defaultProps = {
    level: 1
};
