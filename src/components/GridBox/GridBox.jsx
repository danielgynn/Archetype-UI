import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getMarginProperties, getPaddingProperties, getWidthProperty, getHeightProperty } from '../../utils';

const GridWrapper = styled.div`
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(${ props => props.colWidth }%, 2fr));
    grid-row-gap: ${ props => props.rowGap }rem;
    grid-column-gap: ${ props => props.colGap }rem;
    width: ${ props => getWidthProperty(props.width) };
    height: ${ props => getHeightProperty(props.height) };
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    color: ${ props => props.theme.colours[props.color || 'inherit'] };
    background: ${ props => props.theme.colours[props.bg || 'inherit'] };
`;

export default class GridBox extends Component {
    render() {
        const { children, element, colWidth, rowGap, colGap, ...rest } = this.props;

        return (
            <GridWrapper
                as={ element }
                colWidth={ colWidth }
                rowGap={ rowGap }
                colGap={ colGap }
                { ...rest }>

                { children }

            </GridWrapper>                  
        )
    }
}

GridBox.defaultProps = {
    colWidth: 100,
    rowGap: 1,
    colGap: 1
}

GridBox.propTypes = {
    element: PropTypes.string,
    colWidth: PropTypes.number,
    rowGap: PropTypes.number,
    colGap: PropTypes.number
};