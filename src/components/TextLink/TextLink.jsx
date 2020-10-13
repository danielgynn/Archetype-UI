import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { color, space, hexToRgb } from '../../utils';
import { Icon } from '../..';

const StyledLink = styled.p`
    ${ props => color(props) };
    ${ props => space(props) };
    opacity: ${props => props.opacity};
    font-size: ${ props => props.fontSize ? props.fontSize : props.theme.fontSizes.p };
    font-weight: ${ props => props.weight ? props.weight : props.theme.fontWeights.p };
    text-decoration: none;
    text-align: ${ props => props.align ? props.align : 'left' };
    display: ${ props => props.display ? props.display : 'inline-block' };
    cursor: ${props => props.onClick ? 'pointer' : 'normal'};
    border-bottom: ${ props => props.active ? `1px solid ${ props.theme.colors[props.color || 'textInverted'] }` : '1px solid transparent' };
    user-select: none;
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        color: ${ props => hexToRgb(props.theme.colors[props.color || 'textInverted'], .85) };
        border-color: ${ props => props.onClick ? hexToRgb(props.theme.colors[props.color || 'textInverted'], .85) : 'transparent' };
    }

    &:active,
    &:focus {
        color: ${ props => hexToRgb(props.theme.colors[props.color || 'textInverted'], .7) };
        border-color: ${ props => props.onClick ? hexToRgb(props.theme.colors[props.color || 'textInverted'], .7) : 'transparent' };
    }

    ${ ({ clamp }) => clamp && `
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${ clamp };
        -webkit-box-orient: vertical;
    `}

    ${ props => props.disabled && `
        &&& {
            border: none;
            opacity: .6;
        }
    ` }
`;

export default class TextLink extends Component {
    render() {
        const { onClick, href, text, color, active, disabled, icon, iconPosition, iconType, opacity, clamp, ...rest } = this.props;

        return (
            <StyledLink
                onClick={ onClick }
                href={ href }
                color={ color }
                disabled={ disabled }
                opacity={opacity}
                active={ active }
                role={ (onClick) ? 'button' : null }
                clamp={clamp}
                { ...rest }>

                { (icon && (!iconPosition || iconPosition === 'left')) && <Icon margin={ [0,1,0,0] } icon={ icon } type={ iconType } /> }
                
                { text }

                { (icon && iconPosition === 'right') && <Icon margin={ [0,0,0,1] } icon={ icon } type={ iconType } /> }
                
            </StyledLink>
        )
    }
}

TextLink.defaultProps = {
    href: '/',
    active: false,
    margin: [0,1,0,1],
    opacity: 1
};

TextLink.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconType: PropTypes.string,
    opacity: PropTypes.number,
    iconPosition: PropTypes.string,
    clamp: PropTypes.number
};