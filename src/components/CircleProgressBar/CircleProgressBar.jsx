import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { space } from '../../utils';
import Box from '../Box/Box.jsx';
import Flexbox from '../Flexbox/Flexbox.jsx';
import Text from '../Text/Text.jsx';
import Header from '../Header/Header.jsx';

const ProgressWrapper = Styled(Box)`
    min-width: 110px;
    max-width: 110px;
    ${ props => space(props) };
`;

const StyledCircularProgressbar = Styled(CircularProgressbarWithChildren)`
    width: 100%;
    vertical-align: middle;

    > path:first-child {
        stroke: #d6d6d6;
        stroke-linecap: round;
    }

    > path:nth-child(2) {
        stroke: ${ props => props.theme.colors.primary };
        stroke-linecap: round;
        -webkit-transition: stroke-dashoffset 0.5s ease 0s;
        transition: stroke-dashoffset 0.5s ease 0s;
    }

    > text {
        fill: ${ props => props.theme.colors.primary };
        font-size: 20px;
        dominant-baseline: middle;
        text-anchor: middle;
    }
`;

const PercentageWrapper = Styled(Flexbox)`
    position: relative;
`;

const Percentage = Styled(Text)`
    top: 0;
    position: absolute;
    right: -15px;
    font-size: 16px;
`;

export default class CircleProgressBar extends Component {
    render() {
        const { percentage, width } = this.props;
    
        return (
            <ProgressWrapper
            >
                <StyledCircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        textColor: '#f88',
                        strokeWidth: 15
                    }) }
                >
                    <Box>
                        <PercentageWrapper alignItems={ 'center' } justifyContent={ 'center' }>
                            <Header level={ 3 } weight={ 900 }>{ percentage }</Header>
                            <Percentage small color={ 'textSecondary' }>%</Percentage>
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
    width: 12
};

CircleProgressBar.propTypes = {
    percentage: PropTypes.number
};