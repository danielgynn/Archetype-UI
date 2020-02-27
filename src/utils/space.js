const defaultSpace = [ 0, 15, 30, 45, 60, 75, 90 ];

export const getWidthProperty = (width) => {
    const widthValue = (width && typeof width === 'number') ? `${ width }%` : ((width) ? width : null);

    return (widthValue) ? widthValue : '';
}

export const getHeightProperty = (height) => {
    const heightValue = (height && typeof height === 'number') ? `${ height }%` : ((height) ? height : null);

    return (heightValue) ? heightValue : '';
}

export const getMarginProperties = (themeSpace, margin) => {
    const space = themeSpace || defaultSpace;

    return (margin) ? `
        ${ space[getPropertyValue(margin, 0)] }px 
        ${ space[getPropertyValue(margin, 1)] }px 
        ${ space[getPropertyValue(margin, 2)] }px 
        ${ space[getPropertyValue(margin, 3)] }px
    ` : '';
}

export const getPaddingProperties = (themeSpace, padding) => {
    const space = themeSpace || defaultSpace;

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

export const space = (props) => `
    width: ${ getWidthProperty(props.width) };
    height: ${ getHeightProperty(props.height) };
    min-height: ${ getHeightProperty(props.minHeight) };
    max-height: ${ getHeightProperty(props.maxHeight) };
    margin: ${ getMarginProperties(props.theme.space, props.margin) };
    padding: ${ getPaddingProperties(props.theme.space, props.padding) };
`;