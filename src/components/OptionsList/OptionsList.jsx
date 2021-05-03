import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Icon } from '../..';
import { hexToRgb } from '../../utils';
import { Input } from '..';

const DropdownList = styled.ul`
    cursor: pointer;
    z-index: 10;
    position: absolute;
    top: ${ props => props.top ? props.top : props.hasLabel ? '80px' : '50px' };
    right: ${ props => props.right ? props.right : '0' };
    width: ${ props => props.width ? props.width : '100%' };
    border: 1px solid ${ props => props.theme.colors.accentTwo };
    border-radius: 8px;
    background-color: ${ props => props.theme.colors.white };
    font-weight: 700;
    max-height: ${ props => props.height ? props.height : '215px' };
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;

const DropdownListItem = styled.li`
    width: 100%;
    font-size: 1.5rem;
    padding: ${ props => props.small ? '0 .75rem' : '.75rem' };
    line-height: ${ props => props.small ? props.theme.sizes.inputHeightSmall : 'normal' };
    ${ props => props.small ? `height: ${ props.theme.sizes.inputHeightSmall }` : '' };
    cursor: pointer;
    display: inline-block;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    font-size: ${ props => props.theme.fontSizes.p };
    color: ${ props => props.selected ? props.theme.colors.white : props.theme.colors.text };
    background-color: ${ props => props.selected ? props.theme.colors.primary : 'inherit' };

    &:hover {
      ${props => !props.isSearch && `
        color: ${props.theme.colors.white};
        background-color: ${hexToRgb(props.theme.colors.primary, .85)};
      `};
    }
`;

const DropdownEmptyItem = styled.li`
    width: 100%;
    font-size: 1.5rem;
    padding: .75rem;
    line-height: normal;
    cursor: pointer;
    display: inline-block;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    font-weight: 400;
    font-size: ${ props => props.theme.fontSizes.p };
    color: ${ props => props.theme.colors.textSecondary };
    background-color: ${ props => props.theme.colors.white };
`;

const DropdownInput = styled(Input)`
  input {
    height: 35px;
  }
`;

const DropdownItemText = styled.p`
    display: block;
`;

const DropdownItemDescription = styled.p`
    color: ${ props => props.selected ? props.theme.colors.accentTwo : 'inherit' };
    font-size: .85rem;
    font-weight: 300;
`;

const OptionsList = ({
  id,
  list,
  selectItem,
  small = false,
  onSearch,
  searchValue,
  searchOptions = {},
  ...rest
}) => {
  return (
    <DropdownList id={ id } onClick={ e => e.stopPropagation() } { ...rest }>
      {onSearch && (
        <DropdownListItem small={small} isSearch>
          <DropdownInput
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            forceFocus
            {...searchOptions}
          />
        </DropdownListItem>
      )}
      { list && list.map((item)=> (
          <DropdownListItem
              selected={ item.selected }
              small={ small }
              key={ item.id }
              onClick={ () => selectItem(item.title, item.id, item.key) }
          >
              <DropdownItemText>
                  { item.icon && <Icon icon={ item.icon } mr={ 1 } /> }
                  { item.title } { item.selected && <Icon icon="check"/> }
              </DropdownItemText>
              <DropdownItemDescription selected={ item.selected }>
                  { item.description ? item.description : '' }
              </DropdownItemDescription>
          </DropdownListItem>
      )) }

      { !list || list.length === 0 && (
          <DropdownEmptyItem>
              No items available
          </DropdownEmptyItem>
      ) }
    </DropdownList>
  );
};

OptionsList.propTypes = {
  id: PropTypes.string,
  list: PropTypes.array.isRequired,
  selectItem: PropTypes.func.isRequired,
  small: PropTypes.bool,
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
  searchOptions: PropTypes.object
};

export default OptionsList;