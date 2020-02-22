const defaultRadius = [ 0, 4, 8, 12, 16, 20 ];

export const getBorderRadiusProperty = (themeRadius, borderRadius) => {
    const radius = themeRadius || defaultRadius;

    return (borderRadius) ? `${ radius[borderRadius] }px` : '';
}

export const borders = (props) => `
    border-radius: ${ getBorderRadiusProperty(props.theme.radius, props.borderRadius) };
`;