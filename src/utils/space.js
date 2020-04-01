import { getBreakpointValue } from './breakpoints';

const defaultSpace = [ 0, 15, 30, 45, 60, 75, 90 ];

export const getWidthProperty = (width, breakpoint) => {
    if (breakpoint !== undefined && width) {
        width = getBreakpointValue(width, breakpoint);
    }

    const widthValue = (width && typeof width === 'number') ? `${ width }%` : ((width) ? width : null);

    return (widthValue) ? widthValue : '';
}

export const getHeightProperty = (height, breakpoint) => {
    if (breakpoint !== undefined && height) {
        height = getBreakpointValue(height, breakpoint);
    }

    const heightValue = (height && typeof height === 'number') ? `${ height }%` : ((height) ? height : null);

    return (heightValue) ? heightValue : '';
}

export const getMarginProperties = (themeSpace, margin, breakpoint) => {
    const space = themeSpace || defaultSpace;

    if (breakpoint !== undefined && margin) {
        margin = getBreakpointValue(margin, breakpoint, true);
    }

    return (margin) ? `
        ${ space[getPropertyValue(margin, 0)] }px 
        ${ space[getPropertyValue(margin, 1)] }px 
        ${ space[getPropertyValue(margin, 2)] }px 
        ${ space[getPropertyValue(margin, 3)] }px
    ` : '';
}

export const getSpaceProperty = (themeSpace, value, breakpoint) => {
    const space = themeSpace || defaultSpace;

    if (breakpoint !== undefined && value) {
        value = getBreakpointValue(value, breakpoint);
    }

    const propValue = value !== undefined ? value : null;

    return (propValue !== null) ? `${ space[propValue] }px` : '';
}

export const getPaddingProperties = (themeSpace, padding, breakpoint) => {
    const space = themeSpace || defaultSpace;

    if (breakpoint !== undefined && padding) {
        padding = getBreakpointValue(padding, breakpoint, true);
    }

    return (padding) ? `
        ${ space[getPropertyValue(padding, 0)] }px 
        ${ space[getPropertyValue(padding, 1)] }px 
        ${ space[getPropertyValue(padding, 2)] }px 
        ${ space[getPropertyValue(padding, 3)] }px
    ` : '';
}

const getPropertyValue = (prop, index) => {
    return (prop && Array.isArray(prop)) ? prop[index] : (prop) ? prop : 0;
}

export const space = (props, breakpoint) => `
    width: ${ getWidthProperty(props.width, breakpoint) };
    height: ${ getHeightProperty(props.height, breakpoint) };
    min-height: ${ getHeightProperty(props.minHeight) };
    max-height: ${ getHeightProperty(props.maxHeight) };
    margin: ${ getMarginProperties(props.theme.space, props.margin, breakpoint) };
    ${ props.mt ? `margin-top: ${ getSpaceProperty(props.theme.space, props.mt, breakpoint) }` : '' };
    ${ props.mr ? `margin-right: ${ getSpaceProperty(props.theme.space, props.mr, breakpoint) }` : '' };
    ${ props.mb ? `margin-bottom: ${ getSpaceProperty(props.theme.space, props.mb, breakpoint) }` : '' };
    ${ props.ml ? `margin-left: ${ getSpaceProperty(props.theme.space, props.ml, breakpoint) }` : '' };
    padding: ${ getPaddingProperties(props.theme.space, props.padding, breakpoint) };
    ${ props.pt ? `padding-top: ${ getSpaceProperty(props.theme.space, props.pt, breakpoint) }` : '' };
    ${ props.pr ? `padding-right: ${ getSpaceProperty(props.theme.space, props.pr, breakpoint) }` : '' };
    ${ props.pb ? `padding-bottom: ${ getSpaceProperty(props.theme.space, props.pb, breakpoint) }` : '' };
    ${ props.pl ? `padding-left: ${ getSpaceProperty(props.theme.space, props.pl, breakpoint) }` : '' };
`;