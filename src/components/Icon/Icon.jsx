import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { space } from '../../utils';

const StyledBox = styled.span`
    display: inline-block;
    ${ props => space(props) };
`;

export default class Icon extends Component {
    render() {
        const { icon, size, ...rest } = this.props;

        return (
            <StyledBox { ...rest }>
                <FontAwesomeIcon
                    icon={ icon }
                    size={ size }
                />
            </StyledBox>
        )
    }
}

Icon.defaultProps = {
    size: '1x'
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string
};