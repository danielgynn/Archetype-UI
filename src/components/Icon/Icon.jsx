import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { space, colour } from '../../utils';

const IconWrapper = styled.span`
    display: ${ props => props.display ? props.display : 'inline-block' };
    ${ props => colour(props) };
    ${ props => space(props) };
`;

export default class Icon extends Component {
    render() {
        const { icon, size, color, ...rest } = this.props;

        return (
            <IconWrapper color={ color } { ...rest }>
                <FontAwesomeIcon
                    icon={ icon }
                    size={ size }
                />
            </IconWrapper>
        )
    }
}

Icon.defaultProps = {
    size: '1x'
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
};