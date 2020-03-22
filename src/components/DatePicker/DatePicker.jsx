import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import DatePickerComponent from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { space } from '../../utils';
import { Box } from '../..';

const Wrapper = Styled(Box)`
    position: relative;
    ${ props => space(props) };

    & > div,
    & > div:first-child div {
        width: 100%;
    }
`;

const StyledLabel = Styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const StyledDatePicker = Styled(DatePickerComponent)`
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
`;

export default class DatePicker extends Component {
    render() {
        const { id, label, required, onChange, currentDate, excludeWeekends, excludePast, ...rest } = this.props;

        const isWeekday = date => {
            const day = date.getDay();
            return day !== 0 && day !== 6;
        };

        return (
            <Wrapper { ...rest }>
                { (label) && <StyledLabel htmlFor={ id }>{ label } { required && '*' }</StyledLabel> }

                <StyledDatePicker
                    selected={ currentDate }
                    dateFormat="dd/MM/yyyy"
                    onChange={ onChange }
                    minDate={ excludePast ? new Date() : null }
                    filterDate={ excludeWeekends ? isWeekday : null }
                />
            </Wrapper>
        )
    }
}

DatePicker.defaultProps = {
    id: 'datePicker',
    currentDate: new Date(),
    width: 100,
    excludeWeekends: false,
    excludePast: false
};

DatePicker.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    currentDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    excludeWeekends: PropTypes.bool,
    excludePast: PropTypes.bool
};