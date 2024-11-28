export type Color =
  | 'Red'
  | 'Green'
  | 'Blue'
  | 'Yellow'
  | 'Orange'
  | 'Magenta'
  | 'Cyan'
  | 'Grey';

const PieceColors: Color[] = [
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'Orange',
  'Magenta',
  'Cyan',
] as const;

export const getColorCode = (c: Color): string => {
  // prettier-ignore
  switch (c) {
    case 'Red': return '#cd0000';
    case 'Green': return '#00cd00';
    case 'Blue': return '#0000cd';
    case 'Yellow': return '#cdcd00';
    case 'Orange': return '#cd6600';
    case 'Magenta': return '#9a00cd';
    case 'Cyan': return '#00cdcd';
    case 'Grey': return '#787878';
    default:
      throw new Error(`Unknown color ${c}`);
  }
};

export const getRandomPieceColor = () => {
  return PieceColors[Math.floor(Math.random() * PieceColors.length)];
};
