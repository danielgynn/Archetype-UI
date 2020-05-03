import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Flexbox, Box, Text, Icon, hexToRgb } from '../../';

const Wrapper = Styled(Flexbox)`
    transition: ${ props => props.theme.transitions.default };
    border-radius: 8px;
    padding: .5rem 0;
    border: 2px solid ${ props => props.theme.colors[props.color] };

    ${ breakpoint('md') `
        padding: .5rem 0;
    ` }

    ${ breakpoint('lg') `
        padding: 1rem 0;
    ` }
`;

const IconWrapper = Styled(Box)`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    padding: .5rem;
    background-color: ${ props => hexToRgb(props.theme.colors[props.color], .25) };

    ${ breakpoint('md') `
        padding: .5rem;
        width: 60px;
        margin-left: 1rem;
        height: 60px;
    ` }

    ${ breakpoint('lg') `
        padding: 1rem;
        margin-left: 1.5rem;
        width: 70px;
        height: 70px;
    ` }
`;

const StatText = Styled(Text)`
    font-size: 16px;

    ${ breakpoint('md') `
        font-size: 16px;
    ` }

    ${ breakpoint('lg') `
        font-size: 18px;
    ` }
`;

export default class StatHighlight extends Component {
    render() {
        const { title, value, color, icon, sub } = this.props;

        return (
            <Wrapper
                ai={ 'center' }
                jc={ 'space-between' }
                color={ color }
            >
                <IconWrapper color={ color }>
                    <Icon icon={ icon } size={ '2x' } />
                </IconWrapper>

                <Box padding={ 1 }>
                    <Text
                        align={ 'right' }
                        margin={ 0 }
                        html={ title }
                        color={ 'textSecondary' }
                        weight={ 700 }
                    />
                    <StatText
                        align={ 'right' }
                        margin={ [0,0,0,0] }
                        html={ value }
                        weight={ 900 }
                    />
                    { !!sub && (
                        <Text
                            align={ 'right' }
                            margin={ 0 }
                            html={ sub }
                            small
                            color={ 'text' }
                            weight={ 700 }
                        />
                    ) }
                </Box>
                    
                    
            </Wrapper>
        )
    }
}

StatHighlight.defaultProps = {
    color: 'primary'
};

StatHighlight.propTypes = {
    color: PropTypes.string,
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub: PropTypes.string
};