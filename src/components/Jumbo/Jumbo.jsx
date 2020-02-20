import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header, Text, Button } from '../';
import { hexToRgb } from '../../utils';

const StyledJumbo = styled.div`
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content-space-between;
    margin: 2rem 0;
    padding: 2rem 4rem;
    background-color: ${ props => hexToRgb(props.theme.colours.labelThree, .1) };

    h4 {
        color: ${ props => hexToRgb(props.theme.colours.labelThree, 1) };
    }
`;

const JumboSection = styled.div`
    flex-grow: 1;
    width: 100%;
`;

export default class Jumbo extends Component {
    render() {
        const { header, text, action } = this.props;

        return (
            <StyledJumbo>
                <JumboSection>
                    <Header level={ 4 } weight={ 900 } margin={ [0] }>{ header }</Header>
                    <Text margin={ [2,0,0,0] }>{ text }</Text>
                </JumboSection>

                { (action) && (
                    <Button
                        { ...action }
                        colour={ 'labelThree' }
                    />
                ) }
            </StyledJumbo>                  
        )
    }
}

Jumbo.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.object
};