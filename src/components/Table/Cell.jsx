import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon.jsx';

const StyledTableHeader = styled.th`
    margin: 0;
    height: 30px;
    line-height: 30px;
    text-transform: uppercase;
    text-align: left;
    padding: .5rem 1rem;
    font-size: .7rem;
    cursor: ${ props => props.onClick ? 'pointer' : '' };
    font-weight: ${ props => props.sorted ? '700' : '600' };
    color: ${ props => props.sorted ? props.theme.colors.text : props.theme.colors.textSecondary };
`;

const StyledTableCell = styled.td`
    margin: 0;
    padding: 1rem;
    height: 65px;
    font-size: .9rem;
    max-width: 350px;
    font-weight: ${ props => props.sorted ? '700' : '500' };
    color: ${ props => props.empty ? props.theme.colors.textSecondary : '' };
`;

export default class Cell extends Component {
    returnContent(content) {
        return content;
    }

    render() {
        const { header, content, className, style, fixed, sorted, onClick } = this.props;

        const CellComponent = header ? (
            <StyledTableHeader scope="col" className={ className } style={ style } sorted={ sorted } onClick={ onClick ? onClick : null }>
                { this.returnContent(content) }
                { sorted && <Icon icon={ sorted === 'desc' ? 'sort-down' : 'sort-up' } ml={1} /> }
            </StyledTableHeader>
        ) : (
            fixed ? (
                <StyledTableHeader scope="row" className={ className } style={ style } sorted={ sorted } onClick={ onClick ? onClick : null }>
                    { this.returnContent(content) }
                    { sorted && <Icon icon={ sorted === 'desc' ? 'sort-down' : 'sort-up' } ml={1} cursor={ 'pointer' } /> }
                </StyledTableHeader>
            ) : (
                <StyledTableCell className={ className } style={ style } sorted={ sorted } empty={ content === 'N/A' }>
                    { this.returnContent(content) }
                </StyledTableCell>
            )
        );

        return CellComponent;
    }
}

Cell.propTypes = {
    header: PropTypes.bool
};