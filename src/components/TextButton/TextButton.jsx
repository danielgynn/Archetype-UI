import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text, Icon } from '../..';
import { space } from '../../utils';

const TextButtonWrapper = Styled.div`
    padding: .5rem .75rem;
    cursor: pointer;
    border-radius: 8px;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    ${ props => space(props) };

    &:hover {
        opacity: 1;
        background: ${ props => props.theme.colors.accent };
    }

    &:active,
    &:focus {
        background: ${ props => props.theme.colors.accentTwo };
        opacity: .9;
    }

    ${ ({ disabled }) => disabled && `
        background: ${ props => props.theme.colors.accent };
        cursor: unset;
        opacity: .7;
    `}
`;

export default class TextButton extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            preventClick: false
        };
    }

    componentWillUnmount() {
        clearTimeout();
    }

    onClick(e) {
        const { onClick } = this.props;
        const { preventClick } = this.state;

        if (!preventClick) {
            this.setState({
                preventClick: true
            }, () => {
                onClick(e);

                setTimeout(() => {
                    this.setState({
                        preventClick: false
                    });
                }, 750);
            });
        }
    }

    render() {
        const {
            className, style, name, id, disabled, icon, iconPosition, iconType, ...rest
        } = this.props;

        return (
            <TextButtonWrapper
                id={ id }
                className={ className }
                disabled={ disabled }
                style={ style }
                onClick={ this.onClick }
                { ...rest }
            >
                
                { (icon && (!iconPosition || iconPosition === 'left')) && <Icon margin={ [0,1,0,0] } icon={ icon } type={ iconType } /> }

                <Text>{ name }</Text>

                { (icon && iconPosition === 'right') && <Icon margin={ [0,0,0,1] } icon={ icon } type={ iconType } /> }

            </TextButtonWrapper>
        )
    }
}

TextButton.defaultProps = {
    name: 'Click Me',
    disabled: false
};

TextButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    iconType: PropTypes.string,
    iconPosition: PropTypes.string
};