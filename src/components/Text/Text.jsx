import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { getMarginProperties, getPaddingProperties, hide, space, color } from '../../utils';

const StyledText = styled.p`
    ${ props => props.hide && hide(props, 2) };
    ${ props => space(props, 2) };
    ${ props => color(props) };
    font-size: ${ props => props.fontSize ? props.fontSize : props.small ? props.theme.fontSizesSm.pSmall : props.theme.fontSizesSm.p };
    margin: ${ props => getMarginProperties(props.theme.space, props.margin) };
    padding: ${ props => getPaddingProperties(props.theme.space, props.padding) };
    font-weight: ${ props => props.weight ? props.weight : props.theme.fontWeights.p };
    text-align: ${ props => props.align ? props.align : 'left' };
    ${ props => props.underline && `text-decoration: underline` };
    cursor: ${ props => props.cursor ? props.cursor : props.onClick ? 'pointer' : 'normal' };
    text-transform: ${ props => props.transform ? props.transform : 'none' };
    letter-spacing: ${ props => props.spacing ? props.spacing : 'normal' };
    ${ props => props.fontStyle ? `font-style: ${ props.fontStyle }` : '' };

    ${ ({ clamp }) => clamp && `
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${ clamp };
        -webkit-box-orient: vertical;
    `}

    ${ breakpoint('md')`
        ${ props => props.hide && hide(props, 1) };
        ${ props => space(props, 1) };
        font-size: ${ props => props.small ? props.theme.fontSizesMed.pSmall : props.theme.fontSizesMed.p };
    ` }

    ${ breakpoint('xl')`
        ${ props => props.hide && hide(props, 0) };
        ${ props => space(props, 0) };
        font-size: ${ props => props.small ? props.theme.fontSizes.pSmall : props.theme.fontSizes.p };
    ` }
`;

export default class Text extends Component {
    render() {
        const { children, className, clamp, html, onClick, ...rest } = this.props;

        return (
            <StyledText
                className={ className }
                clamp={ clamp }
                dangerouslySetInnerHTML={ html ? {__html: html} : null }
                onClick={onClick}
                { ...rest }>

                { children }

            </StyledText>
        )
    }
}

Text.defaultProps = {
    fontStyle: 'normal',
    color: 'text'
};

Text.propTypes = {
    clamp: PropTypes.number,
    html: PropTypes.string,
    fontStyle: PropTypes.string
};