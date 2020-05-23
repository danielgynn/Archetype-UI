import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { Button, Input, Flexbox, Box } from '../..';

const PaginationWrapper = Styled(Box)`
    padding: 1rem 0;
    text-align: center;
`;

const PaginationButton = Styled(Button)`
    height: 35px !important;
    padding: 0 1rem;
    display: inline-block;
`;

const PaginationInput = Styled(Input)`
    width: 55px !important;
    margin: 0 .5rem !important;

    & > input {
        padding: .85rem 10px !important;
        height: 35px !important;
    }
`;

const PaginationLabel = Styled.span`
    font-weight: 700;
    margin: 0 .5rem;
`;

export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preventChange: false
        };
    }

    componentWillMount() {
        clearTimeout();
    }

    setPage(newPage) {
        const { onChange, currentPage } = this.props;
    
        if (currentPage !== newPage) {
            onChange(newPage);
        }
    }

    setPageInput(newPageInput) {
        const { onChange, totalPages, currentPage } = this.props;
        const { preventChange } = this.state;

        const newPage = parseInt(newPageInput);

        if (!preventChange) {
            this.setState({
                preventChange: true
            }, () => {
                if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
                    onChange(newPage);
                }

                setTimeout(() => {
                    this.setState({
                        preventChange: false
                    });
                }, 750);
            });
        }
    }

    render() {
        const {
            currentPage, totalPages, allowLastPage, allowFirstPage, allowPageInput, allowEndPages
        } = this.props;

        return (
            <PaginationWrapper>
                <Box
                    hide={ [true,true,false] }
                    bt={ 'accentTwo' }
                    pt={ 1 }
                    mb={ 1 }
                >
                    <PaginationLabel>Page { currentPage } of { totalPages }</PaginationLabel>
                </Box>
                <Flexbox
                    alignItems={ 'center' }
                    justifyContent={ ['space-between', 'space-between', 'space-between'] }
                >
                    <Flexbox alignItems={ 'center' } justifyContent={ 'flex-start' } width={ [30,30,49] }>
                        { (allowFirstPage || allowEndPages) && (
                            <PaginationButton
                                mr={ [1,1,0] }
                                color={ 'primary' }
                                hide={ [false, true, true] }
                                disabled={ currentPage === 1 }
                                onClick={ () => this.setPage(1) }
                                icon={ 'angle-double-left' }
                                iconPosition={ 'left' }
                                text={ 'First Page' }
                            />
                        ) }

                        <PaginationButton
                            color={ 'primary' }
                            mr={ [2,2,0] }
                            inverted
                            disabled={ currentPage === 1 }
                            onClick={ () => this.setPage(currentPage - 1) }
                            icon={ 'angle-left' }
                            iconPosition={ 'left' }
                            text={ 'Prev Page' }
                        />
                    </Flexbox>

                    <Flexbox alignItems={ 'center' } justifyContent={ 'space-between' } hide={ [false,false,true] }>
                        Page 
                    
                        { (allowPageInput) ? (
                            <PaginationInput
                                value={ currentPage.toString() }
                                inputId={ `currentPageInput` }
                                type={ 'number' }
                                onChange={ (e) => this.setPageInput(e.target.value) }
                            />
                        ) : (
                            <PaginationLabel>{ currentPage }</PaginationLabel>
                        ) }

                        of <PaginationLabel>{ totalPages }</PaginationLabel>
                    </Flexbox>

                    <Flexbox alignItems={ 'center' } justifyContent={ 'flex-end' } width={ [30,30,49] }>
                        <PaginationButton
                            color={ 'primary' }
                            ml={ [2,2,0] }
                            inverted
                            disabled={ currentPage === totalPages }
                            onClick={ () => this.setPage(currentPage + 1) }
                            icon={ 'angle-right' }
                            iconPosition={ 'right' }
                            text={ 'Next Page' }
                        />

                        { (allowLastPage || allowEndPages) && (
                            <PaginationButton
                                ml={ [1,1,0] }
                                color={ 'primary' }
                                disabled={ currentPage === totalPages }
                                onClick={ () => this.setPage(totalPages) }
                                icon={ 'angle-double-right' }
                                iconPosition={ 'right' }
                                hide={ [false, true, true] }
                                text={ 'Last Page' }
                            />
                        ) }
                    </Flexbox>
                </Flexbox>
            </PaginationWrapper>
        )
    }
}

Pagination.defaultProps = {
    currentPage: 1,
    totalPages: 1
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    allowFirstPage: PropTypes.bool,
    allowEndPages: PropTypes.bool,
    allowLastPage: PropTypes.bool,
    allowPageInput: PropTypes.bool
};