import React, { Component } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Box, Flexbox, Text, Icon, TextLink, space, hide } from '../../';

const ContentsWrapper = Styled(Box)`
    ${ props => space(props, 2, 'block') };
    background: ${ props => props.theme.colors.accent };
    border-radius: ${ props => props.open ? '8px' : '50%' };
    width: ${ props => props.open ? props.width : '55px' };
    height: ${ props => props.open ? '' : '55px' };
    display: ${ props => props.open ? '' : 'flex' };
    align-items: ${ props => props.open ? '' : 'center' };
    justify-content: ${ props => props.open ? '' : 'center' };
    margin: 0 3rem 0 0;
    padding: 1.5rem;

    ${ breakpoint('md')`
        ${ props => space(props, 1) };
        ${ props => hide(props, 1, props.open ? 'block' : 'flex') };
    ` }

    ${ breakpoint('xl')`
        ${ props => space(props, 0) };
        ${ props => hide(props, 0, props.open ? 'block' : 'flex') };
    ` }
`;

export default class ContentsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showContents: true
        };
    }

    getInitials(str) {
        const matches = str.match(/\b(\w)/g);
        return matches.join('');
    }

    render() {
        const { title, width, list, itemList, field, idField, active, onClick, showContents, toggleContents, hide } = this.props;

        return (
            <ContentsWrapper
                width={ width }
                open={ showContents }
                hide={ hide }
            >

                <Flexbox
                    alignItems={ 'center' }
                    justifyContent={ 'space-between' }
                    borderBottom={ showContents ? 'accentTwo' : '' }
                    padding={ showContents ? [0,0,1,0] : 0 }
                    margin={ showContents ? [0,0,2,0] : 0 }
                >
                    { showContents && (
                        <TextLink weight={ 700 } text={ showContents ? title : this.getInitials(title) } color={ 'text' } margin={ 0 } onClick={ () => onClick(null) } />
                    ) }
                    <Icon
                        icon={ showContents ? 'chevron-left' : 'chevron-right' }
                        onClick={ () => toggleContents() }
                    />
                </Flexbox>

                { showContents && list.length > 0 && list.map((item, index) => (
                    <Box
                        key={ `item${ index }` }
                        margin={ [0,0,1,0] }
                    >
                        <TextLink
                            color={ active && (active[field] === item[field] || active[idField] === item.id) ? 'text' : 'textSecondary' }
                            weight={ active && (active[field] === item[field] || active[idField] === item.id) ? '700' : '500' }
                            text={ `${ index + 1 }. ${ item[field] }` }
                            onClick={ () => onClick(item) }
                            margin={ 0 }
                        />
                        <Flexbox flexDirection={ 'column' } margin={ [0,0,0,2] }>
                            { item[itemList].map((subItem, subItemIndex) => (
                                <TextLink
                                    key={ `subItem${ subItemIndex }` }
                                    color={ active && active[field] === subItem[field] ? 'text' : 'textSecondary' }
                                    weight={ active && active[field] === subItem[field] ? '700' : '500' }
                                    text={ `${ index + 1 }.${ subItemIndex + 1 }. ${ subItem[field] }` }
                                    onClick={ () => onClick(subItem) }
                                    margin={ 0 }
                                    fontSize={ '.85rem' }
                                >
                                    
                                </TextLink>
                            )) }
                        </Flexbox>
                    </Box>     
                )) }

                { showContents && list.length === 0 && (
                    <Text color={ 'textSecondary' }>No chapters available.</Text>
                ) }

            </ContentsWrapper>
        )
    }
}

ContentsTable.defaultProps = {
    width: 100,
    field: 'title',
    idField: 'id',
    list: [],
    showContents: true
};

ContentsTable.propTypes = {
    onClick: PropTypes.func.isRequired,
    width: PropTypes.number,
    title: PropTypes.string,
    list: PropTypes.array,
    field: PropTypes.string,
    idField: PropTypes.string,
    active: PropTypes.object,
    showContents: PropTypes.bool,
    toggleContents: PropTypes.func
};