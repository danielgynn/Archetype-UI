import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Icon, Box, Text } from '../..';
import { hexToRgb, space, hide } from '../../utils';

const StyledCallout = styled(Box)`
    ${ props => space(props, 2) };
    ${ props => props.hide && hide(props, 2) };
    background-color: ${ props => hexToRgb(props.theme.colors[props.color], .15) };
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${ breakpoint('md') `
        ${ props => space(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }
    
    ${ breakpoint('lg') `
        ${ props => space(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
`;

export default class Callout extends Component {
    render() {
        const { color, icon, text, ...rest } = this.props;

        return (
            <StyledCallout color={ color } { ...rest }>

                <Icon
                    size={ '2x' }
                    color={ color }
                    mr={ 2 }
                    icon={ icon }
                />

                <Text>
                    { text }
                </Text>

            </StyledCallout>
        )
    }
}

Callout.defaultProps = {
    color: 'labelOne',
    margin: [0,0,2,0],
    width: 100
};

Callout.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.string
};