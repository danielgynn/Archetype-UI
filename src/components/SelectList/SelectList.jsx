import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Box, Flexbox, Icon, Text } from '../..';
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


const StyledLabel = Styled.label`
    color: ${ props => props.theme.colors.textSecondary };
    font-weight: 400;
    font-size: .9rem;
    display: inline-block;
    margin-bottom: .5rem;
`;

export default class SelectList extends Component {
    render() {
        const { list, nameField, id, label, required, onClick, ...rest } = this.props;

        return (
            <SelectListContainer { ...rest }>
                { (label) && <StyledLabel htmlFor={ id }>{ label } { required && '*' }</StyledLabel> }

                { list.map((item, index) => (
                    <ListItem selected={ item.selected } onClick={ () => onClick(item, index) } key={ index } padding={ 1 } ai={ ['center','center','flex-start'] } jc={ 'space-between' } bb={ 'accentTwo' } fd={ ['row','row','column'] }>
                        { item.icon && <Icon icon={ item.icon } color={ item.selected ? 'white' : 'primary' } size={ '1x' } mr={ 2 } /> }
                        <Flexbox width={ 100 } ai={ ['center','center','flex-start'] } jc={ 'space-between' } fd={ ['row','row','column'] }>
                            <Flexbox ai={ 'center' }>
                                <Box>
                                    <Flexbox ai={ ['center','center','flex-start'] } fd={ ['row','row','column'] }>
                                        <Text weight={ 700 } color={ item.selected ? 'white' : 'text' }>{ item[nameField] }</Text>
                                    </Flexbox>
                                    { item.description && <Text small color={ item.selected ? 'white' : 'textSecondary' }>{ item.description }</Text> }
                                </Box>
                            </Flexbox>
                        </Flexbox>
                    </ListItem>
                )) }
            </SelectListContainer>
        )
    }
}

SelectList.defaultProps = {
    nameField: 'name',
    required: false
};

SelectList.propTypes = {
    list: PropTypes.array,
    nameField: PropTypes.string,
    id: PropTypes.string,
    required: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func
};
