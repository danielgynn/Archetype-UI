import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { space, color, getBreakpointValue } from '../../utils';

const GridWrapper = styled.div`
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(${ props => getBreakpointValue(props.colWidth, 2) }%, 2fr));
    grid-row-gap: ${ props => props.rowGap }rem;
    grid-column-gap: ${ props => props.colGap }rem;
    ${ props => space(props) };
    ${ props => color(props) };

    ${ breakpoint('md')`
        grid-template-columns: repeat(auto-fill, minmax(${ props => getBreakpointValue(props.colWidth, 1) }%, 2fr));
    ` }
 
    ${ breakpoint('xl')`
        grid-template-columns: repeat(auto-fill, minmax(${ props => getBreakpointValue(props.colWidth, 0) }%, 2fr));
    ` }
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
    colWidth: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    rowGap: PropTypes.number,
    colGap: PropTypes.number
};