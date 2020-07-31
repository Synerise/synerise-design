import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export type Color = string | {color: string; hue: string};

const getColor = (colorString: string, forAvatar: boolean): Color => {
  if(!forAvatar) return theme.palette[colorString];
  return {
    color: colorString.split('-')[0],
    hue: colorString.split('-')[1],
  }
};

const selectColorByLetter = (letter?: string, forAvatar = false): Color => {
  if (typeof letter !== 'string' || !/^[a-z]$/i.test(letter)) {
    return getColor('orange-700', forAvatar);
  }

  switch (letter.toUpperCase()) {
    case 'A':
      return getColor('pink-700', forAvatar);
    case 'B':
      return getColor('pink-600', forAvatar);
    case 'C':
      return getColor('violet-600', forAvatar);
    case 'D':
      return getColor('violet-500', forAvatar);
    case 'E':
      return getColor('blue-700', forAvatar);
    case 'F':
      return getColor('blue-600', forAvatar);
    case 'G':
      return getColor('blue-400', forAvatar);
    case 'H':
      return getColor('blue-300', forAvatar);
    case 'I':
      return getColor('cyan-700', forAvatar);
    case 'J':
      return getColor('fern-600', forAvatar);
    case 'K':
      return getColor('fern-500', forAvatar);
    case 'L':
      return getColor('yellow-600', forAvatar);
    case 'M':
      return getColor('orange-400', forAvatar);
    case 'N':
      return getColor('yellow-500', forAvatar);
    case 'O':
      return getColor('orange-600', forAvatar);
    case 'P':
      return getColor('red-800', forAvatar);
    case 'R':
      return getColor('grey-600', forAvatar);
    case 'S':
      return getColor('grey-700', forAvatar);
    case 'T':
      return getColor('pink-400', forAvatar);
    case 'U':
      return getColor('fern-400', forAvatar);
    case 'V':
      return getColor('blue-400', forAvatar);
    case 'W':
      return getColor('pink-500', forAvatar);
    case 'X':
      return getColor('orange-300', forAvatar);
    case 'Y':
      return getColor('fern-200', forAvatar);
    default:
      return getColor('orange-700', forAvatar);
  }
};

export default selectColorByLetter;
