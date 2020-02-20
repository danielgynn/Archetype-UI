import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLabel = styled.div`
    background-color: ${ props => props.theme.colours[props.colour || 'primary'] };
    color: ${ props => props.theme.colours[props.textColour || 'textInverted'] };
    font-size: ${ props => props.theme.fontSizes.label };
    padding: ${ props => props.theme.labels.padding || '6px' };
    font-weight: ${ props => props.theme.fontWeights.label };
    border-radius: ${ props => props.theme.labels.radius };
    display: inline-block;
    user-select: none;
    text-transform: uppercase;
    cursor: ${ props => props.onClick ? 'pointer' : 'auto' };
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        opacity: ${ props => props.onClick ? '.85' : '1' };
    }

    &:focus,
    &:active {
        opacity: ${ props => props.onClick ? '.7' : '1' };
    }
`;

export default class Label extends Component {
    render() {
        const { text, className, colour, textColour, onClick } = this.props;

        return (
            <StyledLabel
                className={ className }
                colour={ colour }
                textColour={ textColour }
                onClick={ onClick }>

                { text }

            </StyledLabel>
        )
    }
}

Label.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    colour: PropTypes.string,
    textColour: PropTypes.string,
    onClick: PropTypes.func
}