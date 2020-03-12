import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { space, color } from '../../utils';

const IconWrapper = styled.span`
    display: ${ props => props.display ? props.display : 'inline-block' };
    cursor: ${ props => props.cursor ? props.cursor : props.onClick ? 'pointer' : 'auto' };
    ${ props => color(props) };
    ${ props => space(props) };
`;

export default class Icon extends Component {
    render() {
        const { icon, size, color, onClick, cursor, ...rest } = this.props;

        return (
            <IconWrapper color={ color } cursor={ cursor } onClick={ onClick } { ...rest }>
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
    onClick: PropTypes.func,
    size: PropTypes.string,
    color: PropTypes.string,
    cursor: PropTypes.string
};