import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Box } from '../..';
import { space } from '../../utils';

const InputWrapper = styled(Box)`
    position: relative;
    ${ props => space(props) };
`;

const StyledLabel = styled.label`
    color: ${ props => props.theme.colours.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const StyledInput = styled.input`
    overflow: visible;
    outline: none;
    color: ${ props => props.theme.colours.text };
    border-radius: 8px;
    display: block;
    width: 100%;
    height: ${ props => props.theme.sizes.inputHeight };
    padding: .85rem 1.15rem;
    font-size: ${ props => props.theme.fontSizes.p };
    line-height: normal;
    background-color: ${ props => props.theme.colours.white };
    background-clip: padding-box;
    border: 1px solid ${ props => props.theme.colours.accentTwo };
    border-color: ${ props => props.theme.colours.accentTwo };
    -webkit-transition: border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;

    &.active,
    &:active,
    &:focus {
        border-color: ${ props => props.theme.colours.primary };
    }

    &.disabled,
    &[disabled] {
        background-color: ${ props => props.theme.colours.accentTwo };
        pointer-events: none;
        opacity: .4;
        border: 0;
      }  
`;

export default class Input extends Component {
    componentDidMount() {
		const { forceFocus, id } = this.props;

		if (forceFocus) {
			this[`inputField${ id }`].focus()
		}
	}

	componentDidUpdate(prevProps) {
		const { forceFocus, id } = this.props;

		if (prevProps.forceFocus !== forceFocus) {
			this[`inputField${ id }`].focus()
		}
	}

    render() {
        const { margin, className, id, label, type, placeholder, value, onChange, onKeyUp, disabled, forceFocus, ...rest } = this.props;

        return (
            <InputWrapper margin={ margin } className={ className } { ...rest }>
				{ (label) && <StyledLabel htmlFor={ id }>{ label }</StyledLabel> }

                <StyledInput
					type={ type }
					// className={'input-control' + (error ? ' error' : '') + (success ? ' success' : '') + (solid ? ' solid' : '')}
					id={ id }
					ref={ (input) => { this[`inputField${id}`] = input; } } 
					aria-describedby={ id }
					placeholder={ placeholder }
					autoFocus={ forceFocus }
					value={ value }
					onChange={ onChange }
					onKeyUp={ onKeyUp }
					disabled={ disabled }
				/>
            </InputWrapper>
        )
    }
}

Input.defaultProps = {
    margin: [0,0,0,0],
    type: 'text',
    forceFocus: false
};

Input.propTypes = {
    value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
    ]).isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    margin: PropTypes.array,
    className: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    forceFocus: PropTypes.bool
};