import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { Icon } from '../..';

const ICON_TYPES = Object.freeze({
    success: 'check-circle',
    error: 'times-circle',
    warning: 'exclamation-circle',
    primary: 'info-circle'
});

const ToastPosition = styled.div`
    position: fixed;
    bottom: 35px;
    right: 35px;
    background: ${ props => props.theme.colors.white };
`;

const ToastWrapper = styled.div`
    position: relative;
    padding: 1rem 1rem 1rem 1.75rem;
    border-radius: 8px;
    background: ${ props => props.theme.colors.white };
    border-left: 10px solid transparent;
    min-height: 95px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0px 8px 18px 8px rgba(69,65,78,.08);
    max-width: 500px;
    z-index: 1000000;

    &:hover {
        box-shadow: 0px 8px 18px 8px rgba(69, 65, 78, .15);
    }
`;

const ToastBorder = styled.div`
    position: absolute;
    left: 5px;
    width: 5px;
    height: 100%;
    border-radius: 8px;
    height: 80%;
    background-color: ${ props => props.theme.colors[props.type] };
`;

const ToastMessage = styled.div`
    margin: 0 3rem 0 1rem;
`;

const ToastMessageType = styled.p`
    font-size: 1rem;
    font-weight: 700;
    color: ${ props => props.theme.colors.text };
`;

const ToastMessageText = styled.p`
    font-size: .95rem;
    color: ${ props => props.theme.colors.textSecondary };
`;

const ToastTime = styled.p`
    font-size: .85rem;
    color: ${ props => props.theme.colors.textTertiary };
`;

export default class Toast extends Component {
    componentDidMount() {
        const { onClick, timeout } = this.props;

        this.timeoutHandle = setTimeout(() => {
            onClick();
        }, timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    componentDidUpdate(prevProps) {
        const { type, message, onClick, timeout } = this.props;

        if (type !== prevProps.type || message !== prevProps.message) {
            clearTimeout(this.timeoutHandle);

            this.timeoutHandle = setTimeout(() => {
                onClick();
            }, timeout);
        }
    }

    render() {
        const {
            type, title, message, onClick, createdAt
        } = this.props;

        return (
            <ToastPosition>
                <ToastWrapper
                    onClick={ onClick }>

                    <ToastBorder type={ type } />
                    <Icon color={ type } icon={ (type && ICON_TYPES[type]) ? ICON_TYPES[type] : ICON_TYPES['warning'] } size={ '2x' } />

                    <ToastMessage>
                        <ToastMessageType>{ title || type.charAt(0).toUpperCase() + type.slice(1) }</ToastMessageType>
                        <ToastMessageText>{ message }</ToastMessageText>

                        { (createdAt) && (
                            <ToastTime>
                                <Icon icon='clock' size='xs' /> 
                                { moment(createdAt).format('DD/MM/YYYY - HH:mm') }
                            </ToastTime>
                        ) } 
                    </ToastMessage>

                    <Icon color={ 'textSecondary' } icon={ 'times' } size={ '1x' } />

                </ToastWrapper>
            </ToastPosition>
        )
    }
}

Toast.defaultProps = {
    timeout: 5000
};

Toast.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    timeout: PropTypes.number,
};
