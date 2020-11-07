import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import { hexToRgb, space } from '../../utils';
import Box from '../Box/Box.jsx';

const ROUND_PRECISION = 1000;

const ProgressWrapper = Styled(Box)`
    height: ${ props => props.height };
    font-size: .75rem;
    background-color: ${ props => props.customColor ? hexToRgb(props.customColor, .15) : props.theme.colors[props.background] };
    border-radius: ${ props => props.radius };
    position: relative;
    ${ props => space(props) };
`;

const Progress = Styled(Box)`
    flex-direction: column;
    height: ${ props => props.height };
    justify-content: center;
    border-bottom-left-radius: ${ props => props.radius };
    border-top-left-radius: ${ props => props.radius };
    ${ props => props.now >= 90 ? `border-radius: ${ props.radius }` : '' };
    text-align: center;
    white-space: nowrap;
    background-color: ${ props => props.customColor ? hexToRgb(props.customColor, 1) : props.theme.colors[props.color] };
    -webkit-transition: width .6s ease;
    transition: width .6s ease;
    font-weight: 700;
    background-image: ${ props => props.striped ? `linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)` : '' };
    background-size: ${ props => props.striped ? `1rem 1rem` : '' };
`;

const ProgressLabel = Styled.label`
    font-weight: 700;
    position: absolute;
    top: 2px;
    left: 45%;
    right: 45%;
    color: ${ props => props.now < 48 ? props.theme.colors.text : props.theme.colors.white };
`;

export default class ProgressBar extends Component {
    getPercentage(now, min, max) {
        const percentage = ((now - min) / (max - min)) * 100;

        return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
    }

    renderProgressBar(
        {
            min,
            now,
            max,
            striped,
            animated,
            className,
            style,
            bsPrefix,
            color,
            background,
            height,
            radius,
            customColor,
            ...props
        }
    ) {
        return (
            <Progress
                {...props}
                role="progressbar"
                color={ color }
                background={ background }
                customColor={customColor}
                striped={ striped }
                height={ height }
                now={ now }
                radius={ radius }
                style={{ width: `${this.getPercentage(now, min, max)}%`, ...style }}
                aria-valuenow={now}
                aria-valuemin={min}
                aria-valuemax={max}
            />
        );
    }
    
    render() {
        const {
            min,
            now,
            max,
            label,
            striped,
            animated,
            bsPrefix,
            className,
            color,
            background,
            height,
            radius,
            customColor,
            ...wrapperProps
        } = this.props;
        
        return (
            <ProgressWrapper
                background={ background }
                customColor={customColor}
                radius={ radius }
                now={ now }
                { ...wrapperProps }
            >
                { this.renderProgressBar(
                    {
                        min,
                        now,
                        max,
                        striped,
                        animated,
                        bsPrefix,
                        color,
                        customColor,
                        background,
                        height,
                        radius
                    }
                ) }
                <ProgressLabel now={ now }>{label}</ProgressLabel>
            </ProgressWrapper>
        )
    }
}

ProgressBar.defaultProps = {
    min: 0,
    max: 100,
    animated: false,
    striped: false,
    margin: [1,0,0,0],
    color: 'primary',
    height: '1.25rem',
    background: 'accentTwo',
    radius: '8px'
};

ProgressBar.propTypes = {
    min: PropTypes.number,
    now: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.node,
    background: PropTypes.string,
    color: PropTypes.string,
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    bsPrefix: PropTypes.string,
    customColor: PropTypes.string
};