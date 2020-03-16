import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';

import { Box, Flexbox, Button, Header, Text } from '../..';

const ModalWrapper = Styled(Box)`
    position: fixed;
    top: 0;
    display: block;
    left: 0;
    width:100%;
    height: 100%;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.6);
`;

const ModalMain = Styled(Box)`
    position:fixed;
    background: white;
    width: 45%;
    height: auto;
    top:50%;
    left:50%;
    padding: 1.5rem;
    border-radius: 8px;
    transform: translate(-50%,-50%);
`;

export default class Modal extends Component {
    constructor(props){
        super(props);

        this.escFunction = this.escFunction.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        const { handleClose } = this.props;

        if (event && event.keyCode === 27) {
            handleClose();
        }
    }
    render() {
        const { handleClose, header, text, action, secondaryAction, children } = this.props;

        return (
            <ModalWrapper>
                <ModalMain>
                    <Flexbox flexDirection={ 'column' } alignItems={ 'center' } justifyContent={ 'center' }>
                        { (header) && (
                            <Header level={ 2 }>{ header }</Header> 
                        ) }

                        { (text) && (
                            <Text align={ 'center' } color={ 'textSecondary' }>{ text }</Text>
                        ) }
                    </Flexbox>

                    { children }

                    <Flexbox margin={ [3,0,0,0] } alignItems={ 'center' } justifyContent={ 'space-between' }>
                        { (action && action.handleAction) && (
                            <Button color={ action.type } width={ secondaryAction ? 32 : 48 } onClick={ action.handleAction } text={ action.text } />
                        ) }
                        { (secondaryAction && secondaryAction.handleAction) && (
                            <Button color={ secondaryAction.type } width={ 32 } onClick={ secondaryAction.handleAction } text={ secondaryAction.text } />
                        ) }
                        <Button color={ 'primary' } width={ secondaryAction ? 32 : 48 } inverted onClick={ handleClose } text={ 'Cancel' } />
                    </Flexbox>
                </ModalMain>
            </ModalWrapper>
        )
    }
}

Modal.defaultProps = {

};

Modal.propTypes = {
    handleClose: PropTypes.func,
    action: PropTypes.object,
    secondaryAction: PropTypes.object,
    header: PropTypes.string,
    text: PropTypes.string
};