import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import { space } from '../../utils';
import Box from '../Box/Box.jsx';

const ROUND_PRECISION = 1000;

const ProgressWrapper = Styled(Box)`
    height: 1rem;
    font-size: .75rem;
    background-color: ${ props => props.theme.colors[props.background] };
    border-radius: 8px;
    ${ props => space(props) };
`;

const Progress = Styled(Box)`
    flex-direction: column;
    justify-content: center;
    color: #fff;
    border-radius: 8px;
    text-align: center;
    white-space: nowrap;
    background-color: ${ props => props.theme.colors[props.color] };
    -webkit-transition: width .6s ease;
    transition: width .6s ease;
    font-weight: 700;
    background-image: ${ props => props.striped ? `linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)` : '' };
    background-size: ${ props => props.striped ? `1rem 1rem` : '' };
`;

const ProgressLabel = Styled.label`
    font-weight: 700;
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
            label,
            srOnly,
            striped,
            animated,
            className,
            style,
            bsPrefix,
            color,
            background,
            ...props
        }
    ) {
        return (
            <Progress
                {...props}
                role="progressbar"
                color={ color }
                background={ background }
                striped={ striped }
                style={{ width: `${this.getPercentage(now, min, max)}%`, ...style }}
                aria-valuenow={now}
                aria-valuemin={min}
                aria-valuemax={max}
            >
                {srOnly ? <ProgressLabel className="sr-only">{label}</ProgressLabel> : label}
            </Progress>
        );
    }
    
    render() {
        const {
            min,
            now,
            max,
            label,
            srOnly,
            striped,
            animated,
            bsPrefix,
            className,
            color,
            background,
            ...wrapperProps
        } = this.props;
        
        return (
            <ProgressWrapper
                { ...wrapperProps }
            >
            { this.renderProgressBar(
                {
                    min,
                    now,
                    max,
                    label,
                    srOnly,
                    striped,
                    animated,
                    bsPrefix,
                    color,
                    background
                }
            ) }
            </ProgressWrapper>
        )
    }
}

ProgressBar.defaultProps = {
    min: 0,
    max: 100,
    animated: false,
    srOnly: false,
    striped: false,
    margin: [1,0,0,0],
    color: 'primary',
    background: 'accent'
};

ProgressBar.propTypes = {
    min: PropTypes.number,
    now: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.node,
    srOnly: PropTypes.bool,
    background: PropTypes.string,
    color: PropTypes.string,
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    bsPrefix: PropTypes.string
};