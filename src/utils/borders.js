import { getBreakpointValue } from './breakpoints';

const defaultRadius = [ 0, 4, 8, 12, 16, 20 ];

export const getBorderRadiusProperty = (themeRadius, borderRadius, breakpoint) => {
    const radius = themeRadius || defaultRadius;

    if (breakpoint !== undefined && borderRadius) {
        borderRadius = getBreakpointValue(borderRadius, breakpoint);
    }

    return (borderRadius) ? `${ radius[borderRadius] }px` : '';
}

export const borders = (props, breakpoint) => `
    border-radius: ${ getBorderRadiusProperty(props.theme.radius, props.borderRadius, breakpoint) };
`;