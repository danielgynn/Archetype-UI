import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Box, Flexbox, Icon, Text, TextLink } from '../..';
import { space, hide, hexToRgb } from '../../utils';

const SelectListContainer = Styled(Box)`
    ${ props => space(props, 2) };

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
        ${ props => props.hide && hide(props, 1) };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
        ${ props => props.hide && hide(props, 0) };
    ` }
`;

const ListItem = Styled(Flexbox)`
    cursor: pointer;
    transition: ${ props => props.theme.transitions.default };
    background-color: ${ props => props.selected ? props.theme.colors.primary : props.theme.colors.white };

    &:hover {
        background-color: ${ props => props.selected ? hexToRgb(props.theme.colors.primary, .65) : props.theme.colors.accent };
    }
`;

const TickIcon = Styled(Icon)`
    color: ${ props => props.selected ? props.theme.colors.success : hexToRgb(props.theme.colors.primary, .5) };
`;

const StyledLabel = Styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

export default class SelectList extends Component {
    render() {
        const { list, nameField, id, label, required, onClick, selectType, onSelectAll, ...rest } = this.props;

        return (
            <SelectListContainer { ...rest }>
                <Flexbox ai={ 'center' } jc={ 'space-between' }>
                    { (label) && <StyledLabel htmlFor={ id }>{ label } { required && '*' }</StyledLabel> }
                    { onSelectAll && (
                        <TextLink
                            color={ 'primary' }
                            margin={ 0 }
                            text={ list.filter(i => i.selected).length !== list.length ? 'Select All' : 'Deselect All' }
                            onClick={ onSelectAll }
                        />
                    ) }
                </Flexbox>

                { list.map((item, index) => (
                    <ListItem selected={ item.selected && selectType === 'bg' ? true : false } onClick={ () => onClick(item, index) } key={ index } padding={ 1 } ai={ ['center','center','flex-start'] } jc={ 'space-between' } bb={ 'accentTwo' } fd={ ['row','row','row'] }>
                        { item.icon && <Icon icon={ item.icon } color={ item.selected && selectType === 'bg' ? 'white' : 'primary' } size={ '1x' } mr={ 2 } /> }
                        <Flexbox width={ 100 } ai={ ['center','center','flex-start'] } jc={ 'space-between' } fd={ ['row','row','column'] }>
                            <Flexbox ai={ 'center' }>
                                <Box>
                                    <Flexbox ai={ ['center','center','flex-start'] } fd={ ['row','row','column'] }>
                                        <Text weight={ 700 } color={ item.selected && selectType === 'bg' ? 'white' : 'text' }>{ item[nameField] }</Text>
                                    </Flexbox>
                                    { item.description && <Text small color={ item.selected && selectType === 'bg' ? 'white' : 'textSecondary' }>{ item.description }</Text> }
                                </Box>
                            </Flexbox>
                        </Flexbox>
                        { selectType === 'tick' && <TickIcon selected={ item.selected } icon={ item.selected ? 'check-square' : 'square' } size={ '1x' } ml={ 1 } /> }
                    </ListItem>
                )) }
            </SelectListContainer>
        )
    }
}

SelectList.defaultProps = {
    nameField: 'name',
    required: false,
    selectType: 'bg'
};

SelectList.propTypes = {
    list: PropTypes.array,
    nameField: PropTypes.string,
    id: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
};
