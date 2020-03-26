export const getBreakpointValue = (values, index, arrayAllowed) => {
    if (values && (typeof values === 'number' || typeof values === 'string' || (arrayAllowed && Array.isArray(values) && !Array.isArray(values[0])))) {
        return values;
    } else if (values && Array.isArray(values)) {
        return values[index || 0];
    }
}

export const hide = (props, breakpoint, fallback) => {
    let hide = false;

    if (breakpoint !== undefined && props.hide !== undefined) {
        hide = getBreakpointValue(props.hide, breakpoint);
    }

    return hide ? `
        display: none !important;
        opacity: 0 !important;
    ` : `
        opacity: ${ 'inherit' } !important;
        display: ${ fallback ? fallback : 'inherit' } !important;
    `;
}