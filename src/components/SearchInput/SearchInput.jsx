import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { Input, Box, Icon } from '../..';

const Container = Styled(Box)`
    position: relative;
`;

const StyledInput = Styled(Input)`
    input {
        padding-left: 3rem;
    }
`;

const SearchIcon = Styled(Icon)`
    position: absolute;
    left: 15px;
    z-index: 100;
    top: 12px;
`;


class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: props.value || ''
        };

        this.updateSearch = this.updateSearch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { value } = this.props;

        if (typeof nextProps.value !== 'undefined' && nextProps.value !== value) {
            const e = {
                target: {
                    value: nextProps.value
                }
            };

            this.updateSearch(e);
        }
    }

    updateSearch (e) {
        const { throttle, onChange } = this.props;
        const searchTerm = e.target.value;
        
        this.setState({
            searchTerm: searchTerm
        }, () => {
            if (this._throttleTimeout) {
                clearTimeout(this._throttleTimeout)
            }

            this._throttleTimeout = setTimeout(() => {
                onChange(searchTerm)
            }, throttle);
        });
    }

    render() {
        const { searchTerm } = this.state;
    
        const {
            className,
            onChange,
            caseSensitive,
            sortResults,
            throttle,
            filterKeys,
            value,
            fuzzy,
            inputClassName,
            ...inputProps
        } = this.props;

        inputProps.type = inputProps.type || 'search';
        inputProps.value = searchTerm;
        inputProps.onChange = this.updateSearch;
        inputProps.className = inputClassName;
        inputProps.placeholder = inputProps.placeholder || 'Search...';

        return (
            <Container>
                <SearchIcon icon={ 'search' } color={ 'textSecondary' } />
                <StyledInput { ...inputProps } bg={ 'accent' } />
            </Container>
        )
    }
}

SearchInput.defaultProps = {
    className: '',
    onChange () {},
    caseSensitive: false,
    fuzzy: false,
    throttle: 750
};

SearchInput.propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    onChange: PropTypes.func,
    caseSensitive: PropTypes.bool,
    sortResults: PropTypes.bool,
    fuzzy: PropTypes.bool,
    throttle: PropTypes.number,
    filterKeys: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    value: PropTypes.string
}

export default SearchInput;