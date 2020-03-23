import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { color, space, hexToRgb } from '../../utils';
import { Icon } from '../..';

const StyledLink = styled.p`
    ${ props => color(props) };
    ${ props => space(props) };
    font-size: ${ props => props.theme.fontSizes.p };
    font-weight: ${ props => props.weight ? props.weight : props.theme.fontWeights.p };
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border-bottom: ${ props => props.active ? `1px solid ${ props.theme.colors[props.color || 'textInverted'] }` : '1px solid transparent' };
    user-select: none;
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        color: ${ props => hexToRgb(props.theme.colors[props.color || 'textInverted'], .85) };
        border-color: ${ props => hexToRgb(props.theme.colors[props.color || 'textInverted'], .85) };
    }

    &:active,
    &:focus {
        color: ${ props => hexToRgb(props.theme.colors[props.color || 'textInverted'], .7) };
        border-color: ${ props => hexToRgb(props.theme.colors[props.color || 'textInverted'], .7) };
    }

    ${ props => props.disabled && `
        &&& {
            border: none;
            opacity: .6;
        }
    ` }
`;

export default class TextLink extends Component {
    render() {
        const { onClick, href, text, color, active, disabled, icon, iconPosition, iconType, ...rest } = this.props;

        return (
            <StyledLink
                onClick={ onClick }
                href={ href }
                color={ color }
                disabled={ disabled }
                active={ active }
                role={ (onClick) ? 'button' : null }
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
    margin: [0,1,0,1]
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
    iconPosition: PropTypes.string
};