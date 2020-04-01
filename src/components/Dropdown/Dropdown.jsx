import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Box, Icon, Flexbox, OptionsList } from '../..';
import { space } from '../../utils';

const DropdownWrapper = styled(Box)`
    user-select: none;
    position: relative;
    width: 222px;
    ${ props => space(props, 2) };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
    ` }
`;

const DropdownLabel = styled.label`
    color: ${ props => props.theme.colors.textSecondary };
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
    border: 1px solid ${ props => props.theme.colors.accentTwo };;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    background-color: #fff;

    &.disabled,
    &[disabled] {
        background-color: ${ props => props.theme.colors.accentTwo };
        pointer-events: none;
        opacity: .4;
        border: 0;
    }
`;

const DropdownHeaderTitle = styled.div`
    margin: 2px 30px 2px 20px;
    color: ${ props => props.theme.colors.text };
    font-size: ${ props => props.theme.fontSizes.p };
`;

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOpen: false,
            headerTitle: (props.list && props.list.find((item) => item.selected)) ? props.list.find((item) => item.selected).title : props.title
        };

        this.close = this.close.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }
    
    componentDidUpdate(prevProps) {
        const { listOpen } = this.state;
        const { list, title } = this.props;

        setTimeout(() => {
            if (listOpen) {
                window.addEventListener('click', this.close);
            } else {
                window.removeEventListener('click', this.close);
            }
        }, 0);

        if (list && prevProps.list !== list && (list.length === 0 || !list.find(item => item.selected) || (list.find(item => item.selected) && prevProps.list.find(item => item.selected) !== list.find(item => item.selected)))) {
            this.setState({
                headerTitle: (list.length === 0 || !list.find(item => item.selected)) ? title : list.find((item) => item.selected).title
            });
        }
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
        const { disabled } = this.props;

        if (!disabled) {
            this.setState(prevState => ({
                listOpen: !prevState.listOpen
            }));
        }
    }

    render() {
        const { id, list, label, required, disabled, ...rest } = this.props;
        const { listOpen, headerTitle } = this.state;

        return (
            <DropdownWrapper { ...rest }>
                { (label) && (
                    <DropdownLabel htmlFor={ id }>{ label } { required && '*' }</DropdownLabel>
                 ) }

                <DropdownHeader 
                    disabled={ disabled }
                    onClick={ () => this.toggleList() }
                >
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
                        hasLabel={ label }
                        selectItem={ this.selectItem }
                    />
                ) }
            </DropdownWrapper>
        )
    }
}

Dropdown.defaultProps = {
    required: false,
    disabled: false
};

Dropdown.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    list: PropTypes.array.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool
};