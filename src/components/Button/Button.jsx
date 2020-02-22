import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { hexToRgb, getWidthProperty } from '../../utils';

const StyledButton = styled.button`
    border-radius: 8px;
    display: inline-block;
    text-align: center;
    outline: none;
    vertical-align: middle;
    line-height: normal;
    width: ${ props => getWidthProperty(props.width) };
    font-size: ${ props => props.theme.fontSizes.p };
    touch-action: manipulation;
    cursor: pointer;
    letter-spacing: 1x;
    padding: .5rem 1rem;
    font-weight: 600;
    white-space: nowrap;
    border: none;
    height: ${ props => props.theme.sizes.inputHeight };
    background-color: ${props => (props.inverted ? props.theme.colours.white : props.theme.colours[props.colour || 'primary']) };
    border: 1px solid ${props => props.theme.colours[props.colour || 'primary'] };
    color: ${ props => (props.inverted ? props.theme.colours[props.colour || 'primary'] : props.theme.colours.textInverted) };
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        box-shadow: 0 1px 4px rgba(0,0,0,0.15), 0 3px 8px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.1);
        background-color: ${ props => hexToRgb(props.theme.colours[props.colour || 'primary'], .9) };
        color: ${ props => props.theme.colours.textInverted };
    }

    &.disabled,
    &[disabled] {
        cursor: not-allowed;
        color: ${ props => props.theme.colours.text };
        background-color: ${ props => props.theme.colours.textTertiary };
        border-color: ${ props => props.theme.colours.textTertiary };
        pointer-events: none;
        opacity: .4;
        box-shadow: none;
    }
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
        const { id, className, type, text, colour, disabled, inverted, width } = this.props;

        return (
            <StyledButton
                id={ id }
                type={ type }
                className={ className }
                colour={ colour }
                width={ width }
                disabled={ disabled }
                inverted={ inverted }
                onClick={ this.onClick }>

                { text }

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
    colour: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    inverted: PropTypes.bool
};