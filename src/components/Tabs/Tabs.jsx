import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Box, Icon } from '../../components';
import { hexToRgb, space, hide } from '../../utils';

const TabsWrapper = Styled(Box)`
    ${props => space(props, 2)};
    ${props => props.hide && hide(props, 2)};
    width: 100%;
    border-bottom: 2px solid ${props => props.theme.colors.accentTwo};
    display: flex;
    align-items: center;
    justify-content: flex-start;

    ${breakpoint('md')`
        ${props => space(props, 1)};
        ${props => props.hide && hide(props, 1)};
    ` }

    ${breakpoint('xl')`
        ${props => space(props, 0)};
        ${props => props.hide && hide(props, 0)};
    `}
`;

const Tab = Styled(Box)`
    color: ${props => props.active ? props.theme.colors[props.color] : props.theme.colors.textSecondary};
    padding: 0 1rem 1rem;
    cursor: pointer;
    margin-bottom: -2px;
    border-bottom: 2px solid ${props => props.active ? props.theme.colors[props.color] : 'transparent'};
    transition: ${ props => props.theme.transitions.default };

    &:hover {
        opacity: .75;
        border-bottom-color: ${props => hexToRgb(props.theme.colors[props.color], .75)};
    }
`;

class Tabs extends Component {
    render() {
        const { tabs, onClick, color, ...rest } = this.props;

        return (
            <TabsWrapper {...rest}>
                {tabs.map((tab, tabIndex) => (
                    <Tab
                        key={tabIndex}
                        onClick={() => onClick(tab, tabIndex)}
                        active={tab.selected}
                        color={color}
                    >
                        {tab.icon && <Icon icon={tab.icon} mr={1} />}
                        {tab.text}
                    </Tab>
                ))}
            </TabsWrapper>
        )
    }
}

Tabs.defaultProps = {
    color: 'text',
    mb: 1
};

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        selected: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
        icon: PropTypes.string
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string
};

export default Tabs;