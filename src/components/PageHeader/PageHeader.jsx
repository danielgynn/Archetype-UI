import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flexbox, Box, Header, Text, Button, TextLink, Label, Breadcrumbs, Icon } from '../..';

const SectionIcon = styled(Box)`
    margin-right: .75rem;
    padding: 10px;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${ props => props.theme.colors.accentTwo };

    svg {
        width: 1.2rem !important;
    }
`;

export default class PageHeader extends Component {
    render() {
        const { title, subtitle, margin, button, buttons, textLink, label, breadcrumbs, icon, titleLevel, ...rest } = this.props;

        return (
            <Box margin={ margin } {...rest}>
                { breadcrumbs && <Breadcrumbs breadcrumbs={ breadcrumbs } /> }

                <Flexbox
                    alignItems={ 'flex-start' }
                    justifyContent={ 'space-between' }
                    element={ 'section' }
                    flexDirection={ ['row','row','column'] }
                >
                    <Box>
                        { label && <Label { ...label } /> }
                        <Header
                            margin={ 0 }
                            level={ titleLevel }
                            weight={ 900 }
                        >
                            { icon && <SectionIcon><Icon icon={ icon } /></SectionIcon> }
                            { title }
                        </Header>
                        <Text
                            color={ 'tertiary' }
                            margin={ [0,0,0,0] }
                        >
                            { subtitle }
                        </Text>
                    </Box>

                    { (button) && (
                        <Button
                            { ...button }
                            width={ [button.width || 30, button.width || 30, 100] }
                            mt={ [0,0,2] }
                        />
                    ) }

                    {!!(buttons && buttons.length) && (
                        <Flexbox ai='center' jc='flex-end' width={[50,50,100]}>
                            {buttons.map((btn, buttonIndex) => (
                                <Button
                                    {...btn}
                                    key={buttonIndex}
                                    width={[btn.width || 30, btn.width || 30, 100]}
                                    mt={[0,0,2]}
                                    ml={1}
                                />
                            ))}
                        </Flexbox>
                    )}
                </Flexbox>

                { textLink && <TextLink { ...textLink } /> }
            </Box>
        )
    }
}

PageHeader.defaultProps = {
    margin: [0,0,0,0],
    titleLevel: 1
};

PageHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    margin: PropTypes.array,
    button: PropTypes.object,
    buttons: PropTypes.arrayOf(PropTypes.object),
    textLink: PropTypes.object,
    label: PropTypes.object,
    breadcrumbs: PropTypes.array,
    icon: PropTypes.string,
    titleLevel: PropTypes.number
};