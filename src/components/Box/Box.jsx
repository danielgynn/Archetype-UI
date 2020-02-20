import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getMarginProperties, getPaddingProperties, getWidthProperty, getHeightProperty } from '../../utils';

const StyledBox = styled.div`
    width: ${ props => getWidthProperty(props.width) }
    height: ${ props => getHeightProperty(props.height) }
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    color: ${ props => props.theme.colours[props.color || 'inherit'] };
    background: ${ props => props.theme.colours[props.bg || 'inherit'] };
`;

export default class Box extends Component {
    render() {
        const { children, element, ...rest } = this.props;

        return (
            <StyledBox
                as={ element }
                { ...rest }>

                { children }

            </StyledBox>                  
        )
    }
}

Box.propTypes = {
    element: PropTypes.string
};