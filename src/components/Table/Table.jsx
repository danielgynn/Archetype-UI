import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { space, hexToRgb } from '../../utils';
import Cell from './Cell.jsx';
import { Box } from '../..';
import Icon from '../Icon/Icon.jsx';
import OptionsList from '../OptionsList/OptionsList.jsx';

const StyledTable = styled.table`
    border-spacing: 0;
    position: relative;
    border-radius: 8px;
    border-collapse: collapse;
    border: 1px solid ${ props => props.theme.colours.accentTwo };
    ${ props => space(props) };
`;

const StyledTableCaption = styled.caption`
    text-align: left;
    font-size: 1.25rem;
    margin: 1rem 0;
    font-weight: 700;
`;

const StyledTableHead = styled.thead`
    background: #f5f8fa;
    border-bottom: 1px solid ${ props => props.theme.colours.accentTwo };
`;

const StyledTableRow = styled.tr`
    border-bottom: 1px solid ${ props => props.theme.colours.accentTwo };
    transition: ${ props => props.theme.transitions.default };
    cursor: pointer;
    position: relative;
    color: ${ props => props.selected ? props.theme.colours.textInverted : props.theme.colours.text };
    background: ${ props => props.selected ? props.theme.colours.primary : props.theme.colours.white };

    &:nth-of-type(2n) {
        background: ${ props => props.selected ? props.theme.colours.primary : 'rgba(230,234,238,.2)' };
    }

    &:hover {
        background: ${ props => props.selected ? hexToRgb(props.theme.colours.primary, .85) : props.theme.colours.accent };
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

const TableHeadings = styled.tr`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActions: null
        };

        this.toggleShowActions = this.toggleShowActions.bind(this);
    }

    renderHeadings() {
        const { columns, sortColIndex, fixedFirstCol, actions } = this.props;

        return (
            <TableHeadings key={ 'headings' }>
                { columns && columns.map((_column, columnIndex) => (
                    (columns[columnIndex] && columns[columnIndex].length > 0) && (
                        <Cell
                            key={ `heading-${columnIndex}` }
                            content={ columns[columnIndex] }
                            header={ true }
                            fixed={ columnIndex === 0 && fixedFirstCol }
                            sorted={ sortColIndex === columnIndex }
                        />
                    )
                )) }

                { (actions && actions.length > 0) && (
                    <Cell
                        key={ `heading-actions` }
                        content={ '' }
                        header={ true }
                    />
                ) }
            </TableHeadings>
        );
    }

    renderBodyRow(row, rowIndex) {
        const { data, fixedFirstCol, actions, onRowClick, selectedRows, sortColIndex } = this.props;
        const { showActions } = this.state;

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

                { (actions && actions.length > 0) && (
                    <StyledTableAction id={ `actions${ rowIndex }` }>
                        <Icon onClick={ () => this.toggleShowActions(rowIndex) } icon={ 'ellipsis-h' } />
                    </StyledTableAction>
                ) }

                { (showActions !== null && rowIndex === showActions) && (
                    <Box element={ 'td' } position={ 'relative' } id={ '' }>
                        <OptionsList
                            id={ 'tableOptionsList' }
                            list={ actions }
                            selectItem={ (title, id, key) => console.log(title, id, key, row) }
                            top={ '40px' }
                            right={ '10px' }
                            width={ '225px' }
                        />
                    </Box>
                        
                ) }
            </StyledTableRow>
        );
    }

    toggleShowActions(rowIndex) {
        this.setState((prevState) => ({
            showActions: (prevState.showActions !== rowIndex) ? rowIndex : null
        }));
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
    selectedRows: PropTypes.array
};