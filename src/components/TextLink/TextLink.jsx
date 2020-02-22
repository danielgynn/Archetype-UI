import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colour, space, hexToRgb } from '../../utils';

const StyledLink = styled.p`
    ${ props => colour(props) };
    ${ props => space(props) };
    font-size: ${ props => props.theme.fontSizes.p };
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border-bottom: ${ props => props.active ? `1px solid ${ props.theme.colours[props.color || 'textInverted'] }` : '1px solid transparent' };
    user-select: none;
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        color: ${ props => hexToRgb(props.theme.colours[props.color || 'textInverted'], .85) };
        border-color: ${ props => hexToRgb(props.theme.colours[props.color || 'textInverted'], .85) };
    }

    &:active,
    &:focus {
        color: ${ props => hexToRgb(props.theme.colours[props.color || 'textInverted'], .7) };
        border-color: ${ props => hexToRgb(props.theme.colours[props.color || 'textInverted'], .7) };
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
        const { onClick, href, text, colour, active, disabled, ...rest } = this.props;

        return (
            <StyledLink
                onClick={ onClick }
                href={ href }
                colour={ colour }
                disabled={ disabled }
                active={ active }
                role={ (onClick) ? 'button' : null }
                { ...rest }>
                
                { text }
                
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
    colour: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    disabled: PropTypes.bool
};