import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Icon } from '../..';
import { hexToRgb, space, hide } from '../../utils';

const StyledButton = styled.button`
    ${ props => space(props, 2) };
    ${ props => props.hide && hide(props, 2) };
    border-radius: 8px;
    display: inline-block;
    text-align: center;
    outline: none;
    vertical-align: middle;
    line-height: normal;
    font-size: ${ props => props.theme.fontSizes.p };
    touch-action: manipulation;
    cursor: pointer;
    letter-spacing: 1x;
    padding: .5rem 1rem;
    font-weight: 600;
    white-space: nowrap;
    border: none;
    height: ${ props => props.theme.sizes.inputHeight };
    background-color: ${props => (props.inverted ? props.theme.colors.white : props.theme.colors[props.color || 'primary']) };
    border: 1px solid ${props => props.theme.colors[props.color || 'primary'] };
    color: ${ props => (props.inverted ? props.theme.colors[props.color || 'primary'] : props.theme.colors.textInverted) };
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        box-shadow: 0 1px 4px rgba(0,0,0,0.15), 0 3px 8px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.1);
        background-color: ${ props => hexToRgb(props.theme.colors[props.color || 'primary'], .9) };
        color: ${ props => props.theme.colors.textInverted };
    }

    &.disabled,
    &[disabled] {
        cursor: not-allowed;
        color: ${ props => props.theme.colors.text };
        background-color: ${ props => props.theme.colors.textTertiary };
        border-color: ${ props => props.theme.colors.textTertiary };
        pointer-events: none;
        opacity: .4;
        box-shadow: none;
    }

    ${ breakpoint('md') `
        ${ props => space(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }
    
    ${ breakpoint('lg') `
        ${ props => space(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
`;

export default class Button extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            preventClick: false
        };
    }

    componentWillUnmount() {
        clearTimeout();
    }

    onClick(e) {
        const { onClick } = this.props;
        const { preventClick } = this.state;

        if (!preventClick) {
            this.setState({
                preventClick: true
            }, () => {
                onClick(e);

                setTimeout(() => {
                    this.setState({
                        preventClick: false
                    });
                }, 750);
            });
        }
    }

    render() {
        const { id, className, type, text, color, disabled, inverted, width, margin, icon, iconPosition, iconType, mt, ...rest } = this.props;

        return (
            <StyledButton
                id={ id }
                type={ type }
                className={ className }
                color={ color }
                width={ width }
                margin={ margin }
                disabled={ disabled }
                inverted={ inverted }
                onClick={ this.onClick }
                mt={ mt }
                { ...rest }>

                { (icon && (!iconPosition || iconPosition === 'left')) && <Icon margin={ [0,1,0,0] } icon={ icon } type={ iconType } /> }

                { text }

                { (icon && iconPosition === 'right') && <Icon margin={ [0,0,0,1] } icon={ icon } type={ iconType } /> }

            </StyledButton> 
        )
    }
}

Button.defaultProps = {
    type: 'submit'
};

Button.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    inverted: PropTypes.bool,
    icon: PropTypes.string,
    iconType: PropTypes.string,
    iconPosition: PropTypes.string
};