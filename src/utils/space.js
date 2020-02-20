const defaultSpace = [ 0, 15, 30, 45, 60, 75, 90 ];

export function getWidthProperty(width) {
    const widthValue = (width && typeof width === 'number') ? `${ width }%` : ((width) ? width : null);

    return (widthValue) ? widthValue : 'auto';
}

export function getHeightProperty(height) {
    const heightValue = (height && typeof height === 'number') ? `${ height }%` : ((height) ? height : null);

    return (heightValue) ? heightValue : 'auto';
}

export function getMarginProperties(themeSpace, margin) {
    const space = themeSpace || defaultSpace;

    return (margin) ? `
        ${ space[getPropertyValue(margin, 0)] }px 
        ${ space[getPropertyValue(margin, 1)] }px 
        ${ space[getPropertyValue(margin, 2)] }px 
        ${ space[getPropertyValue(margin, 3)] }px
    ` : '0';
}

export function getPaddingProperties(themeSpace, padding) {
    const space = themeSpace || defaultSpace;

    return (padding) ? `
        ${ space[getPropertyValue(padding, 0)] }px 
        ${ space[getPropertyValue(padding, 1)] }px 
        ${ space[getPropertyValue(padding, 2)] }px 
        ${ space[getPropertyValue(padding, 3)] }px
    ` : '0';
}

function getPropertyValue(prop, index) {
    return (prop && prop[index]) ? prop[index] : 0;
}