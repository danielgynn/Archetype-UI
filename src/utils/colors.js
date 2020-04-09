const hexCharacters = 'a-f\\d';
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');

export const hexToRgb = (hex, a) => {
	if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
		throw new TypeError('Expected a valid hex string');
	}

	hex = hex.replace(/^#/, '');
	let alpha = 1;

	if (hex.length === 8) {
		alpha = parseInt(hex.slice(6, 8), 16) / 255;
		hex = hex.slice(0, 6);
	}

	if (hex.length === 4) {
		alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
		hex = hex.slice(0, 3);
	}

	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	const num = parseInt(hex, 16);
	const red = num >> 16;
	const green = (num >> 8) & 255;
	const blue = num & 255;

	return `rgba(${ [red, green, blue, a || alpha] })`
};

const isValidColor = (color) => {
	const s = new Option().style;
	s.color = color;

	return s.color !== '';
}

const getcolorProperty = (themecolors, colorValue) => {
	const color = Array.isArray(colorValue) ? colorValue[0] : colorValue;
	const alpha = Array.isArray(colorValue) ? colorValue[1] : null;
	
	if (!color) {
		return '';
	} else if ((!themecolors || !themecolors[color]) && isValidColor(color)) {
		return alpha ? hexToRgb(color, alpha) : color;
	}

	return alpha ? hexToRgb(themecolors[color], alpha) : themecolors[color];
};

export const color = (props) => `
	color: ${ getcolorProperty(props.theme.colors, props.color) };
    background: ${ getcolorProperty(props.theme.colors, props.bg) };
`;