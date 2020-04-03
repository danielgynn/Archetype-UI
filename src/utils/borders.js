import { getBreakpointValue } from './breakpoints';

const defaultRadius = [ 0, 4, 8, 12, 16, 20 ];

export const getBorderRadiusProperty = (themeRadius, propRadius, breakpoint) => {
    const radius = themeRadius || defaultRadius;

    if (breakpoint !== undefined && propRadius) {
        propRadius = getBreakpointValue(propRadius, breakpoint);
    }

    return (radius) ? `${ radius[propRadius] }px` : '';
}

export const getBorderProperty = (border, breakpoint) => {
    if (breakpoint !== undefined && border) {
        border = getBreakpointValue(border, breakpoint);
    }

    const borderValue = border ? border : null;

    return (borderValue) ? borderValue : '';
}

export const borders = (props, breakpoint) => `
    border-radius: ${ getBorderRadiusProperty(props.theme.radius, props.radius, breakpoint) };
    ${ props.border ? `border: 1px solid ${ props.theme.colors[getBorderProperty(props.border, breakpoint)] }` : '' };
    ${ props.btr ? `border-top-right-radius: ${ getBorderRadiusProperty(props.theme.radius, props.btr, breakpoint) }` : ''};
    ${ props.bbl ? `border-bottom-left-radius: ${ getBorderRadiusProperty(props.theme.radius, props.bbl, breakpoint) }` : ''};
    ${ props.bbr ? `border-bottom-right-radius: ${ getBorderRadiusProperty(props.theme.radius, props.bbr, breakpoint) }` : ''};
    ${ props.btl ? `border-top-left-radius: ${ getBorderRadiusProperty(props.theme.radius, props.btl, breakpoint) }` : ''};
    ${ props.bt ? `border-top: 1px solid ${ props.theme.colors[getBorderProperty(props.bt, breakpoint)] }` : '' };
    ${ props.br ? `border-right: 1px solid ${ props.theme.colors[getBorderProperty(props.br, breakpoint)] }` : '' };
    ${ props.bb ? `border-bottom: 1px solid ${ props.theme.colors[getBorderProperty(props.bb, breakpoint)] }` : '' };
    ${ props.bl ? `border-left: 1px solid ${ props.theme.colors[getBorderProperty(props.bl, breakpoint)] }` : '' };
`;