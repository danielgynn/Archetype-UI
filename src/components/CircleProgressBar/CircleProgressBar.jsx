import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { space, hide } from '../../utils';
import Box from '../Box/Box.jsx';
import Flexbox from '../Flexbox/Flexbox.jsx';
import Header from '../Header/Header.jsx';

const ProgressWrapper = Styled(Box)`
    ${ props => space(props, 2) };
    ${ props => props.hide && hide(props, 2) };

    ${ breakpoint('md') `
        ${ props => space(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }
    
    ${ breakpoint('lg') `
        ${ props => space(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
`;

const StyledCircularProgressbar = Styled(CircularProgressbarWithChildren)`
    width: 100%;
    vertical-align: middle;

    > path:first-child {
        stroke: ${ props => props.theme.colors.accentTwo };
        stroke-linecap: round;
    }

    > path:nth-child(2) {
        stroke: ${ props => props.theme.colors[props.color] };
        stroke-linecap: round;
        -webkit-transition: stroke-dashoffset 0.5s ease 0s;
        transition: stroke-dashoffset 0.5s ease 0s;
    }

    > text {
        fill: ${ props => props.theme.colors[props.color] };
        font-size: 20px;
        dominant-baseline: middle;
        text-anchor: middle;
    }
`;

const PercentageWrapper = Styled(Flexbox)`
    position: relative;
`;

const circleRatioStyles = {
    rotation: 1 / 2 + 1 / 8,
    strokeLinecap: "butt",
    strokeWidth: 20
};

export default class CircleProgressBar extends Component {
    render() {
        const { percentage, color, circleRatio, fontSize, strokeWidth, hide } = this.props;
    
        return (
            <ProgressWrapper
                hide={ hide }
            >
                <StyledCircularProgressbar
                    value={ percentage }
                    color={ color }
                    styles={ buildStyles(circleRatio ? circleRatioStyles : {}) }
                    circleRatio={ circleRatio }
                    strokeWidth={ strokeWidth }
                >
                    <Box>
                        <PercentageWrapper alignItems={ 'center' } justifyContent={ 'center' }>
                            <Header level={ 4 } fontSize={ fontSize } weight={ 700 }>{ percentage }%</Header>
                        </PercentageWrapper>
                    </Box>
                </StyledCircularProgressbar>
            </ProgressWrapper>
        )
    }
}

CircleProgressBar.defaultProps = {
    margin: [1,0,1,0],
    percentage: 0,
    width: '120px',
    strokeWidth: 10,
    fontSize: '18px',
    color: 'primary'
};

CircleProgressBar.propTypes = {
    percentage: PropTypes.number,
    strokeWidth: PropTypes.number,
    width: PropTypes.string,
    color: PropTypes.string
};