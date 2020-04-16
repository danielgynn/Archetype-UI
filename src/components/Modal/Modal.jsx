import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Box, Flexbox, Button, Header, Text } from '../..';

const ModalWrapper = Styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100%;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.6);
`;

const ModalMain = Styled(Box)`
    background: ${ props => props.theme.colors[props.bg] };
    width: ${ props => props.width };
    height: auto;
    padding: 1.5rem;
    border-radius: ${ props => props.radius };

    ${ breakpoint('md')`
        width: 65%;
    ` }

    ${ breakpoint('xl')`
        width: 45%;
    ` }
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
        const { handleClose, header, text, action, secondaryAction, children, ...rest } = this.props;

        return (
            <ModalWrapper>
                <ModalMain { ...rest }>
                    <Flexbox flexDirection={ 'column' } alignItems={ 'center' } justifyContent={ 'center' }>
                        { (header) && (
                            <Header align={ 'center' } level={ 2 }>{ header }</Header> 
                        ) }

                        { (text) && (
                            <Text align={ 'center' } color={ 'textSecondary' }>{ text }</Text>
                        ) }
                    </Flexbox>

                    { children }

                    <Flexbox margin={ [3,0,0,0] } alignItems={ 'center' } justifyContent={ 'space-between' } flexDirection={ ['row','row','column'] }>
                        { (action && action.handleAction) && (
                            <Button color={ action.type } width={ secondaryAction ? [32,32,100] : [48,48,100] } mb={ [0,0,1] } onClick={ action.handleAction } text={ action.text } />
                        ) }
                        { (secondaryAction && secondaryAction.handleAction) && (
                            <Button color={ secondaryAction.type } width={ [32,32,100] } mb={ [0,0,1] } onClick={ secondaryAction.handleAction } text={ secondaryAction.text } />
                        ) }
                        <Button color={ 'primary' } width={ secondaryAction ? [32,32,100] : [48,48,100] } mb={ [0,0,1] } inverted onClick={ handleClose } text={ 'Cancel' } />
                    </Flexbox>
                </ModalMain>
            </ModalWrapper>
        )
    }
}

Modal.defaultProps = {
    bg: 'white',
    width: '85%',
    radius: '8px'
};

Modal.propTypes = {
    handleClose: PropTypes.func,
    action: PropTypes.object,
    secondaryAction: PropTypes.object,
    header: PropTypes.string,
    text: PropTypes.string
};