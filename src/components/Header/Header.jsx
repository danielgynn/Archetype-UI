import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getMarginProperties, getPaddingProperties } from '../../utils';

const StyledHeader = styled.h1`
    color: ${ props => props.theme.colors[props.color || 'text'] };
    font-size: ${ props => props.fontSize ? props.fontSize : props.theme.fontSizes[`h${ props.level }`] };
    ${props => (props.textAlign ? `text-align: ${props.textAlign};` : '')}
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    font-weight: ${ props => props.weight || props.theme.fontWeights[`h${ props.level }`] };
    display: flex;
    align-items: center;
`;

export default class Header extends Component {
    render() {
        const {
            level, children, className, color, weight, ...rest
        } = this.props;

        return (
            <StyledHeader
                as={ `h${level}` }
                className={ className }
                color={ color }
                level={ level }
                weight={ weight }
                { ...rest }>

                { children }

            </StyledHeader>
            
        );
    }
}

Header.defaultProps = {
    level: 1
};

Header.propTypes = {
    level: PropTypes.number,
    className: PropTypes.string,
    color: PropTypes.string,
    weight: PropTypes.number
}