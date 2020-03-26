import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { space, color, borders, hide } from '../../utils';

const StyledBox = styled.div`
    ${ props => space(props, 2) };
    ${ props => props.hide && hide(props, 2) };
    ${ props => color(props) };
    ${ props => borders(props) };
    ${ props => props.borderBottom ? `border-bottom: 1px solid ${ props.theme.colors[props.borderBottom] }` : '' };
    ${ props => props.borderRight ? `border-right: 1px solid ${ props.theme.colors[props.borderRight] }` : '' };
    ${ props => props.position && `position: ${ props.position }` };
    ${ props => props.cursor && `cursor: ${ props.cursor }` };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
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