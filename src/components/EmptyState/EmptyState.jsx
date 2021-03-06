import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import Button from '../Button/Button.jsx';
import Flexbox from '../Flexbox/Flexbox.jsx';
import Icon from '../Icon/Icon.jsx';
import Image from '../Image/Image.jsx';
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
    returnImage(image) {
        return (
            <Image
                src={ image.src }
                alt={ image.alt }
                width={ [image.width || 50, 65, 75] }
                margin={ [2,0,2,0] }
            />
        );
    }

    render() {
        const { header, text, icon, button, hideIcon, level, image, imagePosition, ...rest } = this.props;

        return (
            <Wrapper
                alignItems={ 'center' }
                justifyContent={ 'center' }
                flexDirection={ 'column' }
                { ...rest }
            >

                { !hideIcon && <IconWrapper size={ '2x' } margin={ [1,0,0,0] } icon={ icon } /> }

                { !!(image && image.src && imagePosition === 'top') && this.returnImage(image) }

                <Header align={ 'center' } margin={ [1,0,0,0] } weight={ 700 } level={ level }>{ header }</Header>
                <Text align={ 'center' }>{ text }</Text>

                { !!(image && image.src && imagePosition === 'bottom') && this.returnImage(image) }

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
    level: 2,
    image: null,
    imagePosition: 'top'
};

EmptyState.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    button: PropTypes.object,
    hideIcon: PropTypes.bool,
    level: PropTypes.number,
    image: PropTypes.object,
    imagePosition: PropTypes.oneOf(['top', 'bottom'])
};