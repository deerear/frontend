import type { PixelValue } from './types';

const toPixelString = (value: PixelValue): string => (typeof value === 'number' ? `${value}px` : value);

export default toPixelString;
