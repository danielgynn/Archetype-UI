import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from 'styled-components-breakpoint';

import { Header, Text, Button, Icon, Flexbox } from '../';
import { hexToRgb, space } from '../../utils';

const StyledJumbo = styled(Flexbox)`
    ${ props => space(props, 2) };
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content-space-between;
    background-color: ${ props => hexToRgb(props.theme.colors[props.color], .1) };

    h4 {
        color: ${ props => hexToRgb(props.theme.colors[props.color], 1) };
    }

    ${ breakpoint('md') `${ props => space(props, 1) };` }
    ${ breakpoint('lg') `${ props => space(props, 0) };` }
`;

const JumboSection = styled.div`
    ${ props => space(props, 2) };
    flex-grow: 1;
    width: 100%;

    ${ breakpoint('md') `${ props => space(props, 1) };` }
    ${ breakpoint('lg') `${ props => space(props, 0) };` }
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
            <StyledJumbo flexDirection={ ['row','row','column'] } color={ color } { ...rest }>
                <JumboSection margin={ [[0,1,0,0],[0,1,0,0],[0,1,action ? 2 : 0,0]] }>
                    <Flexbox width={ 100 } alignItems={ 'flex-start' } justifyContent={ 'space-between' }>
                        <Header level={ 4 } weight={ 900 } margin={ [0] }>
                            { icon && <Icon margin={ [0,1,0,0] } icon={ icon } type={ 'solid' } /> }
                            { header }
                        </Header>

                        { close && <JumboIcon size={ '2x' } color={ color } onClick={ close } margin={ [0,1,0,1] } icon={ 'times' } type={ 'solid' } /> }
                    </Flexbox>
                        
                    <Text margin={ [2,0,0,0] } html={ text } />
                </JumboSection>

                { (action) && (
                    <Button
                        { ...action }
                        width={ [action.width || 30,55,75] }
                        color={ color }
                    />
                ) }
            </StyledJumbo>                  
        )
    }
}

Jumbo.defaultProps = {
    color: 'labelThree',
    margin: [2,0,2,0],
    padding: [[3,5,3,5], [2,4,2,4], [2,3,2,3]]
};

Jumbo.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.object,
    color: PropTypes.string,
    icon: PropTypes.string,
    close: PropTypes.func
};