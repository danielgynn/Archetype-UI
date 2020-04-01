import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Box } from '../..';
import { space, color } from '../../utils';

const InputWrapper = styled(Box)`
    position: relative;

    ${ props => space(props, 2) };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
    ` }
`;

const StyledLabel = styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const StyledInput = styled.input`
    overflow: visible;
    outline: none;
    color: ${ props => props.theme.colors.text };
    border-radius: 8px;
    display: block;
    width: 100%;
    height: ${ props => props.theme.sizes.inputHeight };
    padding: .85rem 1.15rem;
    font-size: ${ props => props.theme.fontSizes.p };
    line-height: normal;
    background-color: ${ props => props.theme.colors.white };
    background-clip: padding-box;
    box-shadow: none;
    border: 1px solid ${ props => props.error ? props.theme.colors.error : props.success ? props.theme.colors.success : props.theme.colors.accentTwo };
    -webkit-transition: border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    ${ props => color(props) };

    &.active,
    &:active,
    &:focus {
        border-color: ${ props => props.error ? props.theme.colors.error : props.success ? props.theme.colors.success : props.theme.colors.primary };
    }

    &.disabled,
    &[disabled] {
        background-color: ${ props => props.theme.colors.accentTwo };
        pointer-events: none;
        opacity: .4;
        border: 0;
    }  
`;

const StyledHelpText = styled.span`
    font-weight: 300;
    font-size: .85rem;
    padding-top: 7px;
    color: ${ props => props.error ? props.theme.colors.error : props.success ? props.theme.colors.success : '#7b7e8a' };
    display: inline-block;
    text-transform: unset;
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
        const {
            margin, className, id, label, type, placeholder, value, onChange, onKeyUp, onKeyDown, disabled, forceFocus, error,
            errorMessage, success, successMessage, helpMessage, required, bg, readonly, ...rest
        } = this.props;

        return (
            <InputWrapper margin={ margin } className={ className } { ...rest }>
				{ (label) && <StyledLabel htmlFor={ id }>{ label } { required && '*' }</StyledLabel> }

                <StyledInput
					type={ type }
					id={ id }
					ref={ (input) => { this[`inputField${id}`] = input; } } 
					aria-describedby={ id }
					placeholder={ placeholder }
					autoFocus={ forceFocus }
					value={ value }
					onChange={ onChange }
                    onKeyUp={ onKeyUp }
                    onKeyDown={ onKeyDown }
                    disabled={ disabled }
                    readOnly={ readonly }
                    error={ error }
                    success={ success }
                    bg={ bg }
				/>

                { (error && errorMessage) ? (
					<StyledHelpText error={ error }>{ errorMessage }</StyledHelpText>
				) : (success && successMessage) ? (
					<StyledHelpText success={ success }>{ successMessage }</StyledHelpText>
                ) : ((helpMessage) ? (
                    <StyledHelpText>{ helpMessage }</StyledHelpText>
                ) : null ) }

            </InputWrapper>
        )
    }
}

Input.defaultProps = {
    margin: [0,0,0,0],
    type: 'text',
    forceFocus: false,
    required: false,
    readonly: false,
    disabled: false
};

Input.propTypes = {
    value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
    ]).isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    margin: PropTypes.array,
    className: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    forceFocus: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
    bg: PropTypes.string
};