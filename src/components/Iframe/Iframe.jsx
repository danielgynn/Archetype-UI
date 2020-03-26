import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { space } from '../../utils';
import Box from '../Box/Box.jsx';

const IframeWrapper = Styled(Box)`
    ${ props => space(props) };
`;

const IframeComponent = Styled.iframe`
    width: ${ props => props.width };
    ${ props => space(props, 2) };
    border: none;
    padding: 2px;

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
    ` }
`;

class Iframe extends Component {
    render() {
        const { title, src, id, width, height, ...rest } = this.props;

        return (
            <IframeWrapper
                { ...rest }
            >
                <IframeComponent
                    title={ title }
                    id={ id }
                    src={ src }
                    width={ width }
                    height={ height }
                />
            </IframeWrapper>
        )
    }
}

Iframe.defaultProps = {
    width: '100%',
    height: '100%',
    margin: [0,0,0,0],
    id: 'frame'
};

Iframe.propTypes = {
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default Iframe;