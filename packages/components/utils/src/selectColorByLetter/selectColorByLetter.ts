import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const selectColorByLetter = (letter?: string): string => {
  if (typeof letter !== 'string' || !/^[a-z]$/i.test(letter)) {
    return theme.palette['orange-700'];
  }

  switch (letter.toUpperCase()) {
    case 'A':
      return theme.palette['pink-700'];
    case 'B':
      return theme.palette['pink-600'];
    case 'C':
      return theme.palette['violet-600'];
    case 'D':
      return theme.palette['violet-500'];
    case 'E':
      return theme.palette['blue-700'];
    case 'F':
      return theme.palette['blue-600'];
    case 'G':
      return theme.palette['blue-400'];
    case 'H':
      return theme.palette['blue-300'];
    case 'I':
      return theme.palette['cyan-700'];
    case 'J':
      return theme.palette['fern-600'];
    case 'K':
      return theme.palette['fern-500'];
    case 'L':
      return theme.palette['yellow-600'];
    case 'M':
      return theme.palette['orange-400'];
    case 'N':
      return theme.palette['yellow-500'];
    case 'O':
      return theme.palette['orange-600'];
    case 'P':
      return theme.palette['red-800'];
    case 'R':
      return theme.palette['grey-600'];
    case 'S':
      return theme.palette['grey-700'];
    case 'T':
      return theme.palette['pink-400'];
    case 'U':
      return theme.palette['fern-400'];
    case 'V':
      return theme.palette['blue-400'];
    case 'W':
      return theme.palette['pink-500'];
    case 'X':
      return theme.palette['orange-300'];
    case 'Y':
      return theme.palette['fern-200'];
    default:
      return theme.palette['orange-700'];
  }
};

export default selectColorByLetter;
