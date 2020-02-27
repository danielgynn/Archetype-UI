import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { space } from '../../utils';
import Cell from './Cell.jsx';
import Icon from '../Icon/Icon.jsx';

const StyledTable = styled.table`
    border-spacing: 0;
    position: relative;
    border-collapse: collapse;
    ${ props => space(props) };
`;

const StyledTableCaption = styled.caption`
    text-align: left;
    font-size: 1.25rem;
    margin: 1rem 0;
    font-weight: 700;
`;

const StyledTableHead = styled.thead`
    background: ${ props => props.theme.colours.accentTwo };
`;

const StyledTableRow = styled.tr`
    border-bottom: 2px solid ${ props => props.theme.colours.accentTwo };
    transition: ${ props => props.theme.transitions.default };
    cursor: pointer;

    &:hover {
        background: ${ props => props.theme.colours.accent };
    }
`;

const StyledTableAction = styled.td`
    padding: 0 .5rem;
    align-items: center;
    color: ${ props => props.theme.colours.textSecondary };
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        color: ${ props => props.theme.colours.text };   
    }
`;

export default class Table extends Component {
    renderHeadings() {
        const { columns, sortColIndex, fixedFirstCol, actions } = this.props;

        return (
            <tr key={ 'headings' }>
                { columns && columns.map((_column, columnIndex) => (
                    <Cell
                        key={ `heading-${columnIndex}` }
                        content={ columns[columnIndex] }
                        header={ true }
                        fixed={ columnIndex === 0 && fixedFirstCol }
                        sorted={ sortColIndex === columnIndex }
                    />
                )) }

                { (actions && actions.length > 0) && (
                    <Cell
                        key={ `heading-actions` }
                        content={ '' }
                        header={ true }
                    />
                ) }
            </tr>
        );
    }

    renderBodyRow(_row, rowIndex) {
        const { data, fixedFirstCol, actions } = this.props;

        return (
            <StyledTableRow key={ `row-${rowIndex}` }>
                {data[rowIndex].map((_cell, cellIndex) => {
                    return (
                        <Cell
                            key={ `${rowIndex}-${cellIndex}` }
                            content={ data[rowIndex][cellIndex] }
                            fixed={ cellIndex === 0 && fixedFirstCol }
                        />
                    )
                }) }

                { (actions && actions.length > 0) && (
                    <StyledTableAction>
                        <Icon icon={ 'ellipsis-h' } />
                    </StyledTableAction>
                ) }
            </StyledTableRow>
        );
    };

    render() {
        const { data, title, ...rest } = this.props;

        return (
            <StyledTable { ...rest }>
                <StyledTableCaption>{ title }</StyledTableCaption>
                <StyledTableHead>{ this.renderHeadings() }</StyledTableHead>
                <tbody>{ data && data.map((row, rowIndex) => this.renderBodyRow(row, rowIndex)) }</tbody>
            </StyledTable>
        )
    }
}

Table.defaultProps = {
    margin: [2,0,2,0],
    width: 100
};

Table.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array,
    data: PropTypes.array
};