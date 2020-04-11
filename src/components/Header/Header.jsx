import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { getMarginProperties, getPaddingProperties, space } from '../../utils';

const StyledHeader = styled.h1`
    ${ props => space(props, 2) };
    color: ${ props => props.theme.colors[props.color || 'text'] };
    font-size: ${ props => props.theme.fontSizesSm[`h${ props.level }`] };
    line-height: ${ props => props.theme.fontSizesSm.lineHeight };
    ${props => (props.textAlign ? `text-align: ${props.textAlign};` : '') };
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    font-weight: ${ props => props.weight || props.theme.fontWeights[`h${ props.level }`] };
    display: flex;
    align-items: center;
    text-align: ${ props => props.align ? props.align : 'left' };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
        ${ props => `line-height: ${ props.theme.fontSizesMed.lineHeight };` };
        ${ props => `font-size: ${ props.fontSize ? props.fontSize : props.theme.fontSizesMed[`h${ props.level }`] };` };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
        ${ props => `line-height: ${ props.theme.fontSizes.lineHeight };` };
        ${ props => `font-size: ${ props.fontSize ? props.fontSize : props.theme.fontSizes[`h${ props.level }`] };` };
    ` }
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