import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTableHeader = styled.th`
    margin: 0;
    height: 30px;
    line-height: 30px;
    text-transform: uppercase;
    text-align: left;
    padding: 0.5rem;
    font-size: .7rem;
    font-weight: ${ props => props.sorted ? '700' : '600' };
    color: ${ props => props.sorted ? props.theme.colours.text : props.theme.colours.textSecondary };
`;

const StyledTableCell = styled.td`
    margin: 0;
    padding: 1rem;
    height: 65px;
    font-size: .9rem;
    max-width: 350px;
    font-weight: ${ props => props.sorted ? '700' : '500' };
    color: ${ props => props.empty ? props.theme.colours.textSecondary : '' };
`;

export default class Cell extends Component {
    returnContent(content) {
        return content;
    }

    render() {
        const { header, content, className, style, fixed, sorted } = this.props;

        const CellComponent = header ? (
            <StyledTableHeader scope="col" className={ className } style={ style } sorted={ sorted }>
                { this.returnContent(content) }
            </StyledTableHeader>
        ) : (
            fixed ? (
                <StyledTableHeader scope="row" className={ className } style={ style } sorted={ sorted }>
                    { this.returnContent(content) }
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