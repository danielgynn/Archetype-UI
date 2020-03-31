import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { space, hexToRgb } from '../../utils';
import Cell from './Cell.jsx';

const StyledTable = styled.table`
    border-spacing: 0;
    position: relative;
    border-radius: 8px;
    border-collapse: collapse;
    display: block;
    overflow-x: scroll;
    max-width: 100%;
    border: 1px solid ${ props => props.theme.colors.accentTwo };
    ${ props => space(props) };

    ${ breakpoint('md')`
        display: block;
    ` }

    ${ breakpoint('xl')`
        display: table;
    ` }
`;

const StyledTableCaption = styled.caption`
    text-align: left;
    font-size: 1.25rem;
    margin: 1rem 0;
    font-weight: 700;
`;

const StyledTableHead = styled.thead`
    background: #f5f8fa;
    border-bottom: 1px solid ${ props => props.theme.colors.accentTwo };
`;

const StyledTableRow = styled.tr`
    border-bottom: 1px solid ${ props => props.theme.colors.accentTwo };
    transition: ${ props => props.theme.transitions.default };
    cursor: pointer;
    position: relative;
    color: ${ props => props.selected ? props.theme.colors.textInverted : props.theme.colors.text };
    background: ${ props => props.selected ? props.theme.colors.primary : props.theme.colors.white };

    &:nth-of-type(2n) {
        background: ${ props => props.selected ? props.theme.colors.primary : 'rgba(230,234,238,.2)' };
    }

    &:hover {
        background: ${ props => props.selected ? hexToRgb(props.theme.colors.primary, .85) : props.theme.colors.accent };
    }
`;

const TableHeadings = styled.tr`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.runSort = this.runSort.bind(this);
    }

    runSort(columnIndex) {
        const { sortCallback, sorts } = this.props;

        if (sorts && sorts[columnIndex] && sortCallback) {
            sortCallback(columnIndex, 'desc');
        }
    }

    renderHeadings() {
        const { columns, sortColIndex, fixedFirstCol, sorts, sortDirection } = this.props;

        return (
            <TableHeadings key={ 'headings' }>
                { columns && columns.map((_column, columnIndex) => (
                    (columns[columnIndex] && columns[columnIndex].length > 0) && (
                        <Cell
                            key={ `heading-${columnIndex}` }
                            content={ columns[columnIndex] }
                            header={ true }
                            fixed={ columnIndex === 0 && fixedFirstCol }
                            sorted={ sortColIndex === columnIndex && sortDirection ? sortDirection : null }
                            onClick={ sorts && sorts[columnIndex] ? () => this.runSort(columnIndex) : null }
                        />
                    )
                )) }
            </TableHeadings>
        );
    }

    renderBodyRow(row, rowIndex) {
        const { data, fixedFirstCol, onRowClick, selectedRows, sortColIndex } = this.props;

        const objRow = row.find(col => typeof col === 'object');
        const selected = ((objRow && objRow.selected) || (selectedRows && selectedRows.includes(rowIndex))) ? true : false;

        return (
            <StyledTableRow key={ `row-${rowIndex}` } onClick={ onRowClick ? () => onRowClick(row, rowIndex) : null } selected={ selected }>
                {data[rowIndex].map((cell, cellIndex) => {
                    if (cell && (typeof cell !== 'object' || (typeof cell === 'object' && !cell.hide))) {
                        return (
                            <Cell
                                key={ `${rowIndex}-${cellIndex}` }
                                content={ data[rowIndex][cellIndex] }
                                fixed={ cellIndex === 0 && fixedFirstCol }
                                sorted={ sortColIndex === cellIndex }
                            />
                        )
                    }
                }) }
            </StyledTableRow>
        );
    }

    render() {
        const { data, title, ...rest } = this.props;

        return (
            <StyledTable { ...rest }>
                { title && <StyledTableCaption>{ title }</StyledTableCaption> }
                <StyledTableHead>{ this.renderHeadings() }</StyledTableHead>
                <tbody>{ data && data.map((row, rowIndex) => this.renderBodyRow(row, rowIndex)) }</tbody>
            </StyledTable>
        )
    }
}

Table.defaultProps = {
    margin: [2,0,2,0],
    width: 100,
    selectedRows: []
};

Table.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array,
    data: PropTypes.array,
    onRowClick: PropTypes.func,
    selectedRows: PropTypes.array,
    sortCallback: PropTypes.func
};