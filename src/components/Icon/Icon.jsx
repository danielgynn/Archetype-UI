import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { space, color } from '../../utils';

const IconWrapper = styled.span`
    display: ${ props => props.display ? props.display : 'inline-block' };
    cursor: ${ props => props.cursor ? props.cursor : props.onClick ? 'pointer' : 'auto' };
    ${ props => color(props) };
    ${ props => space(props, 2) };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
    ` }
`;

export default class Icon extends Component {
    render() {
        const { icon, size, color, onClick, cursor, spin, ...rest } = this.props;

        return (
            <IconWrapper color={ color } cursor={ cursor } onClick={ onClick } { ...rest }>
                <FontAwesomeIcon
                    icon={ icon }
                    size={ size }
                    spin={ spin }
                />
            </IconWrapper>
        )
    }
}

Icon.defaultProps = {
    size: '1x',
    spin: false
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.string,
    color: PropTypes.string,
    cursor: PropTypes.string,
    spin: PropTypes.bool
};