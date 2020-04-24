import React, { Component } from 'react';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';
import Styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/dist/rc-slider.css';

import { Box, InputLabel } from '../..';
import { space, hide } from '../../utils';

const SliderContainer = Styled(Box)`
    ${ props => space(props, 2) };
    ${ props => props.hide && hide(props, 2) };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
`;

const StyledSlider = Styled(Slider)`
    .rc-slider-track {
        background-color: ${ props => props.theme.colors[props.color] };
    }

    .rc-slider-handle,
    .rc-slider-dot-active {
        border-color: ${ props => props.theme.colors[props.color] } !important;
    }
`;

export default class RangeSlider extends Component {
    render() {
        const { value, min, max, onChange, step, dots, label, steps, color, ...rest } = this.props;
        
        let marks = [];

        steps.forEach((markedStep) => {
            marks[markedStep] = markedStep;
        });
    

        return (
            <SliderContainer { ...rest }>
                { label && <InputLabel label={ label } /> }
                <StyledSlider
                    max={ max }
                    min={ min }
                    value={ value }
                    step={ step }
                    dots={ dots }
                    color={ color }
                    marks={ steps && marks }
                    onChange={ value => onChange(value) }
                />
            </SliderContainer>
        )
    }
}

RangeSlider.defaultProps = {
    step: null,
    color: 'primary',
    dots: true
};

RangeSlider.propTypes = {
    onChange: PropTypes.func,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number
    ]),
    dots: PropTypes.bool,
    steps: PropTypes.array,
    color: PropTypes.string
};