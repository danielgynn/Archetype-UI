import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { space, color } from '../../utils';

const GridWrapper = styled.div`
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(${ props => props.colWidth }%, 2fr));
    grid-row-gap: ${ props => props.rowGap }rem;
    grid-column-gap: ${ props => props.colGap }rem;
    ${ props => space(props) };
    ${ props => color(props) };
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