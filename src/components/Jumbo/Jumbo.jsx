import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header, Text, Button, Icon, Flexbox } from '../';
import { hexToRgb, space } from '../../utils';

const StyledJumbo = styled.div`
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content-space-between;
    padding: ${ props => props.padding ? props.padding : '2rem 4rem' };
    background-color: ${ props => hexToRgb(props.theme.colors[props.color], .1) };
    ${ props => space(props) };

    h4 {
        color: ${ props => hexToRgb(props.theme.colors[props.color], 1) };
    }
`;

const JumboSection = styled.div`
    flex-grow: 1;
    width: 100%;
`;

const JumboIcon = styled(Icon)`
    &:hover {
        color: ${ props => hexToRgb(props.theme.colors[props.color], .7) };
    }
`;

export default class Jumbo extends Component {
    render() {
        const { header, text, action, color, icon, close, ...rest } = this.props;

        return (
            <StyledJumbo color={ color } { ...rest }>
                <JumboSection>
                    <Flexbox width={ 100 } alignItems={ 'flex-start' } justifyContent={ 'space-between' }>
                        <Header level={ 4 } weight={ 900 } margin={ [0] }>
                            { icon && <Icon margin={ [0,1,0,0] } icon={ icon } type={ 'solid' } /> }
                            { header }
                        </Header>

                        { close && <JumboIcon size={ '2x' } color={ color } onClick={ close } margin={ [0,1,0,1] } icon={ 'times' } type={ 'solid' } /> }
                    </Flexbox>
                        
                    <Text margin={ [2,0,0,0] }>{ text }</Text>
                </JumboSection>

                { (action) && (
                    <Button
                        { ...action }
                        color={ color }
                    />
                ) }
            </StyledJumbo>                  
        )
    }
}

Jumbo.defaultProps = {
    color: 'labelThree',
    margin: [2,0,2,0]
};

Jumbo.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.object,
    color: PropTypes.string,
    icon: PropTypes.string,
    close: PropTypes.func
};