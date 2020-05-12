import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { space, color, borders, hide } from '../../utils';

const StyledBox = styled.div`
    ${ props => space(props, 2) };
    ${ props => props.hide && hide(props, 2) };
    ${ props => color(props) };
    ${ props => borders(props, 2) };
    ${ props => props.position && `position: ${ props.position }` };
    ${ props => props.cursor && `cursor: ${ props.cursor }` };
    ${ props => props.display && `display: ${ props.display }` };
    ${ props => props.bgImage ? (`
        background-image: url(${ props.bgImage });
        height: 100%; 
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    `) : '' };
    ${ props => props.scrollHeight ? (`
        max-height: ${props.scrollHeight};
        overflow-y: scroll;
    `) : '' };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
        ${ props => borders(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
        ${ props => borders(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
`;

export default class Box extends Component {
    render() {
        const { children, id, element, bgImage, scrollHeight, ...rest } = this.props;

        return (
            <StyledBox
                as={ element }
                id={ id }
                bgImage={ bgImage }
                scrollHeight={ scrollHeight }
                { ...rest }>

                { children }

            </StyledBox>                  
        )
    }
}

Box.propTypes = {
    element: PropTypes.string,
    id: PropTypes.string,
    bgImage: PropTypes.string,
    scrollHeight: PropTypes.string
};