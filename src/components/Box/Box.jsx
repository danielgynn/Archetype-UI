import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { space, color, borders } from '../../utils';

const StyledBox = styled.div`
    ${ props => space(props) };
    ${ props => color(props) };
    ${ props => borders(props) };
    ${ props => props.borderBottom ? `border-bottom: 1px solid ${ props.theme.colors[props.borderBottom] }` : '' };
    ${ props => props.borderRight ? `border-right: 1px solid ${ props.theme.colors[props.borderRight] }` : '' };
    ${ props => props.position && `position: ${ props.position }` };
    ${ props => props.cursor && `cursor: ${ props.cursor }` };
`;

export default class Box extends Component {
    render() {
        const { children, id, element, ...rest } = this.props;

        return (
            <StyledBox
                as={ element }
                id={ id }
                { ...rest }>

                { children }

            </StyledBox>                  
        )
    }
}

Box.propTypes = {
    element: PropTypes.string,
    id: PropTypes.string
};