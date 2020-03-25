import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { space } from '../../utils';
import Flexbox from '../Flexbox/Flexbox.jsx';
import TextLink from '../TextLink/TextLink.jsx';
import Text from '../Text/Text.jsx';

const BreadcrumbsWrapper = Styled(Flexbox)`
    ${ props => space(props) };
`;

const Crumb = Styled(TextLink)`

`;

const CrumbSeparator = Styled(Text)`
    margin: 0 1rem;
`;

class Breadcrumbs extends Component {
    render() {
        const { breadcrumbs, ...rest } = this.props;

        return (
            <BreadcrumbsWrapper
                alignItems={ 'center' }
                justifyContent={ 'flex-start' }
                { ...rest }
            >
                { breadcrumbs && breadcrumbs.map((crumb, crumbIndex) => (
                    <Flexbox
                        key={ crumbIndex }
                        alignItems={ 'center' }
                        justifyContent={ 'flex-start' }
                    >
                        <Crumb
                            active={ crumb.active }
                            onClick={ crumb.onClick }
                            color={ crumb.active ? 'text' : 'textSecondary' }
                            text={ crumb.text }
                            margin={ [0,0,0,0] }
                            icon={ crumb.icon }
                            fontSize={ '11px' }
                        />

                        { (crumbIndex + 1) < breadcrumbs.length && (
                            <CrumbSeparator>/</CrumbSeparator>
                        ) }
                    </Flexbox>
                )) }
            </BreadcrumbsWrapper>
        )
    }
}

Breadcrumbs.defaultProps = {
    width: 100,
    breadcrumbs: [],
    margin: [1,0,1,0]
};

Breadcrumbs.propTypes = {
    width: PropTypes.number,
    breadcrumbs: PropTypes.array
};

export default Breadcrumbs;