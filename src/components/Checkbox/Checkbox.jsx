import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { hexToRgb, space } from '../../utils';

const CheckboxWrapper = styled.label`
    ${ props => space(props) };
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const CheckboxLabel = styled.span`
    color: ${ props => props.theme.colors.textSecondary };
    margin-left: .5rem;
    font-size: .85rem;
`;

const CheckboxContainer = styled.div`
    display: flex;
    vertical-align: middle;
`;

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div`
    display: inline-block;
    width: 22px;
    height: 22px;
    background: ${props => (props.checked ? props.theme.colors.primary : hexToRgb(props.theme.colors.primary, .7)) };
    border-radius: 3px;
    transition: all 150ms;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${ props => hexToRgb(props.theme.colors.primary, .45) };
    }

    ${Icon} {
        visibility: ${props => (props.checked ? 'visible' : 'hidden')}
    }
`;

export default class Checkbox extends Component {
    render() {
        const { className, checked, label, margin, ...props } = this.props;

        return (
            <CheckboxWrapper margin={ margin }>
                <CheckboxContainer>
                    <HiddenCheckbox checked={ checked } { ...props } />
                    <StyledCheckbox checked={ checked }>

                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>

                    </StyledCheckbox>
                </CheckboxContainer>

                { label && <CheckboxLabel>{ label }</CheckboxLabel> }
            </CheckboxWrapper>
        )
    }
}

Checkbox.defaultProps = {
    checked: false,
    margin: [0,0,0,0]
};

Checkbox.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    label: PropTypes.string,
    margin: PropTypes.array
}