import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Icon, Flexbox } from '../..';

import { space, hexToRgb } from '../../utils';

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

const DropdownList = styled.ul`
    cursor: pointer;
    z-index: 10;
    position: absolute;
    top: 80px;
    width: 100%;
    border: 1px solid ${ props => props.theme.colours.accentTwo };
    border-radius: 8px;
    background-color: ${ props => props.theme.colours.white };
    box-shadow: 0 2px 5px -1px #e8e8e8;
    font-weight: 700;
    max-height: 215px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;

const DropdownListItem = styled.li`
    width: 100%;
    font-size: 1.5rem;
    padding: .75rem;
    line-height: normal;
    cursor: default;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${ props => props.theme.fontSizes.p };
    color: ${ props => props.selected ? props.theme.colours.white : props.theme.colours.text };
    background-color: ${ props => props.selected ? props.theme.colours.primary : 'inherit' };

    &:hover {
        color: ${ props => props.theme.colours.white };
        background-color: ${ props => hexToRgb(props.theme.colours.primary, .85) };
    }
`;

const DropdownItemText = styled.p`
    display: block;
`;

const DropdownItemDescription = styled.p`
    color: ${ props => props.selected ? props.theme.colours.accentTwo : 'inherit' };
    font-size: .85rem;
    font-weight: 300;
`;

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            headerTitle: props.title
        };

        this.close = this.close.bind(this);
    }
    
    componentDidUpdate(){
        const { listOpen } = this.state;

        setTimeout(() => {
            if (listOpen) {
                window.addEventListener('click', this.close);
            } else {
                window.removeEventListener('click', this.close);
            }
        }, 0);
    }
    
    componentWillUnmount(){
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

                <DropdownHeader className="dd-header" onClick={ () => this.toggleList() }>
                    <DropdownHeaderTitle className="dd-header-title">
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
                    <DropdownList id={ id } className="dd-list" onClick={ e => e.stopPropagation() }>
                        { list && list.map((item)=> (
                            <DropdownListItem
                                selected={ item.selected }
                                className="dd-list-item"
                                key={ item.id }
                                onClick={ () => this.selectItem(item.title, item.id, item.key) }
                            >
                                <DropdownItemText>
                                    { item.title } { item.selected && <Icon icon="check"/> }
                                </DropdownItemText>
                                <DropdownItemDescription selected={ item.selected }>
                                    { item.description ? item.description : '' }
                                </DropdownItemDescription>
                            </DropdownListItem>
                        )) }
                    </DropdownList>
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