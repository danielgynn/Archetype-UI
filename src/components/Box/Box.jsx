import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { space, colour, borders } from '../../utils';

const StyledBox = styled.div`
    ${ props => space(props) };
    ${ props => colour(props) };
    ${ props => borders(props) }
`;

export default class Box extends Component {
    render() {
        const { children, element, ...rest } = this.props;

        return (
            <StyledBox
                as={ element }
                { ...rest }>

                { children }

            </StyledBox>                  
        )
    }
}

Box.propTypes = {
    element: PropTypes.string
};