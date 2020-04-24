import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLabel = Styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

export default class InputLabel extends Component {
    render() {
        const { htmlFor, label, id, required, ...rest } = this.props;

        return (
            <StyledLabel
                htmlFor={ htmlFor }
                { ...rest }
            >
                    { label } { required && '*' }
            </StyledLabel>
        )
    }
}

InputLabel.defaultProps = {
    required: false
};

InputLabel.propTypes = {
    required: PropTypes.bool,
    label: PropTypes.string,
    htmlFor: PropTypes.string
};