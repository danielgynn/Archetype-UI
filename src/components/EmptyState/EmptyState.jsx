import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import Button from '../Button/Button.jsx';
import Flexbox from '../Flexbox/Flexbox.jsx';
import Icon from '../Icon/Icon.jsx';
import Header from '../Header/Header.jsx';
import Text from '../Text/Text.jsx';
import { space } from '../../utils';

const Wrapper = Styled(Flexbox)`
    ${ props => space(props) };
`;

const IconWrapper = Styled(Icon)`
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: ${ props => props.theme.colors.accentTwo };
    color: ${ props => props.theme.colors.text };
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default class EmptyState extends Component {
    render() {
        const { header, text, icon, button, hideIcon, level, ...rest } = this.props;

        return (
            <Wrapper
                alignItems={ 'center' }
                justifyContent={ 'center' }
                flexDirection={ 'column' }
                { ...rest }
            >

                { !hideIcon && <IconWrapper size={ '2x' } margin={ [1,0,0,0] } icon={ icon } /> }
                <Header margin={ [1,0,0,0] } weight={ 700 } level={ level }>{ header }</Header>
                <Text align={ 'center' }>{ text } </Text>

                { button && (
                    <Button margin={ [2,0,0,0] } { ...button } />
                ) }
                
            </Wrapper>
        )
    }
}

EmptyState.defaultProps = {
    width: '100%',
    header: 'No Matching Results',
    text: `Try adjusting your filters to bring back more results`,
    icon: 'search',
    hideIcon: false,
    level: 2
};

EmptyState.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    button: PropTypes.object,
    hideIcon: PropTypes.bool,
    level: PropTypes.number
};