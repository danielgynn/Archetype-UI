import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Box, Icon, Flexbox, OptionsList } from '../..';
import { space } from '../../utils';

const DropdownWrapper = styled(Box)`
    user-select: none;
    position: relative;
    width: 222px;
    ${ props => space(props) };
`;

const DropdownLabel = styled.label`
    color: ${ props => props.theme.colours.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${ props => props.theme.sizes.inputHeight };
    line-height: normal;
    border: 1px solid ${ props => props.theme.colours.accentTwo };;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    background-color: #fff;
`;

const DropdownHeaderTitle = styled.div`
    margin: 2px 30px 2px 20px;
    color: ${ props => props.theme.colours.text };
    font-size: ${ props => props.theme.fontSizes.p };
`;

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            headerTitle: props.title
        };

        this.close = this.close.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }
    
    componentDidUpdate() {
        const { listOpen } = this.state;

        setTimeout(() => {
            if (listOpen) {
                window.addEventListener('click', this.close);
            } else {
                window.removeEventListener('click', this.close);
            }
        }, 0);
    }
    
    componentWillUnmount() {
        window.removeEventListener('click', this.close);
    }
    
    close() {
        this.setState({
            listOpen: false
        });
    }

    selectItem(title, id, stateKey) {
        const { selectListValue } = this.props;

        this.setState({
            headerTitle: title,
            listOpen: false
        }, () => {
            selectListValue(id, stateKey);
        });
    }
    
    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    render() {
        const { id, list, label, ...rest } = this.props;
        const { listOpen, headerTitle } = this.state;

        return (
            <DropdownWrapper { ...rest }>
                { (label) && (
                    <DropdownLabel htmlFor={ id }>{ label }</DropdownLabel>
                 ) }

                <DropdownHeader onClick={ () => this.toggleList() }>
                    <DropdownHeaderTitle>
                        { headerTitle }
                    </DropdownHeaderTitle>
                    <Flexbox alignItems={ 'center' } margin={ [0,1,0,0] }>
                        <Icon
                            display={ 'flex' }
                            color={ 'text' }
                            icon={ (listOpen) ? 'angle-up' : 'angle-down' }
                            size={ '2x' }
                        />
                    </Flexbox>
                </DropdownHeader>

                { listOpen && (
                    <OptionsList
                        id={ id }
                        list={ list }
                        selectItem={ this.selectItem }
                    />
                ) }
            </DropdownWrapper>
        )
    }
}

Dropdown.defaultProps = {

};

Dropdown.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    list: PropTypes.array.isRequired
};