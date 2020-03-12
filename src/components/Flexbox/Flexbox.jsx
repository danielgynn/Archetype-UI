import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { space, color, borders } from '../../utils';

const isTruthyOrZero = value => value || value === 0;

const Flexbox = styled(({
    alignContent, alignItems, alignSelf, children, display, element, flex, flexBasis,
    flexDirection, flexGrow, flexShrink, flexWrap, justifyContent, ...props
}) => React.createElement(element, props, children))`
    ${props => (props.alignContent ? `align-content: ${props.alignContent};` : '')}
    ${props => (props.alignSelf ? `align-self: ${props.alignSelf};` : '')}
    ${props => (props.alignItems ? `align-items: ${props.alignItems};` : '')}
    ${props => (props.display ? `display: ${props.display};` : '')}
    ${props => (isTruthyOrZero(props.flex) ? `flex: ${props.flex};` : '')}
    ${props => (isTruthyOrZero(props.flexBasis) ? `flex-basis: ${props.flexBasis};` : '')}
    ${props => (props.flexDirection ? `flex-direction: ${props.flexDirection};` : '')}
    ${props => (isTruthyOrZero(props.flexGrow) ? `flex-grow: ${props.flexGrow};` : '')}
    ${props => (isTruthyOrZero(props.flexShrink) ? `flex-shrink: ${props.flexShrink};` : '')}
    ${props => (props.flexWrap ? `flex-wrap: ${props.flexWrap};` : '')}
    ${props => (props.justifyContent ? `justify-content: ${props.justifyContent};` : '')}
    ${ props => space(props) };
    ${ props => color(props) };
    ${ props => borders(props) };
    ${ props => props.borderBottom ? `border-bottom: 1px solid ${ props.theme.colors[props.borderBottom] }` : '' };
`;

Flexbox.propTypes = {
    alignContent: PropTypes.oneOf([
        'center',
        'flex-end',
        'flex-start',
        'space-around',
        'space-between',
        'stretch',
    ]),
    alignItems: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    alignSelf: PropTypes.oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
    children: PropTypes.node,
    display: PropTypes.oneOf(['flex', 'inline-flex']),
    element: PropTypes.oneOf([
        'article',
        'aside',
        'div',
        'figure',
        'footer',
        'header',
        'main',
        'nav',
        'section',
        'form'
    ]),
    flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flexBasis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flexDirection: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    flexGrow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flexShrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flexWrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    justifyContent: PropTypes.oneOf([
        'center',
        'flex-end',
        'flex-start',
        'space-around',
        'space-between',
    ])
};

Flexbox.defaultProps = {
    display: 'flex',
    element: 'div',
};

export default Flexbox;