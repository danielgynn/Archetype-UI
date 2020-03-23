import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Flexbox, Box, Header, Text, Button, TextLink, Label } from '../..';

export default class PageHeader extends Component {
    render() {
        const { title, subtitle, margin, button, textLink, label } = this.props;

        return (
            <Box margin={ margin }>
                <Flexbox
                    alignItems={ 'flex-start' }
                    justifyContent={ 'space-between' }
                    element={ 'section' }
                >
                    <Box>
                        { label && <Label { ...label } /> }
                        <Header
                            margin={ 0 }
                            level={ 1 }
                        >
                            { title }
                        </Header>
                        <Text
                            color={ 'tertiary' }
                            margin={ [0,0,0,0] }
                        >
                            { subtitle }
                        </Text>
                    </Box>

                    { (button) && <Button { ...button } /> }
                </Flexbox>

                { (textLink) && <TextLink { ...textLink } /> }
            </Box>
        )
    }
}

PageHeader.defaultProps = {
    margin: [0,0,0,0]
};

PageHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    margin: PropTypes.array,
    button: PropTypes.object,
    textLink: PropTypes.object,
    label: PropTypes.object
};