import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

export default class ThemeContext extends Component {
    render() {
        const { children, theme, className } = this.props;

        return (
            <ThemeProvider
                theme={ theme }
                className={ className }>

                { children }

            </ThemeProvider>
        )
    }
}

ThemeContext.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.object.isRequired,
    className: PropTypes.string
};