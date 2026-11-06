export type WindowKind = 'rectangular' | 'hann' | 'hamming' | 'blackman';
export function window(kind: WindowKind, length: number, periodic = false): number[] {
  if (!['rectangular', 'hann', 'hamming', 'blackman'].includes(kind))
    throw new TypeError('Unknown window.');
  if (!Number.isInteger(length) || length < 1 || length > 1_000_000)
    throw new RangeError('Length must be 1..1000000.');
  if (length === 1) return [1];
  const denominator = periodic ? length : length - 1;
  return Array.from({ length }, (_, i) => {
    const a = (2 * Math.PI * i) / denominator;
    switch (kind) {
      case 'rectangular':
        return 1;
      case 'hann':
        return 0.5 - 0.5 * Math.cos(a);
      case 'hamming':
        return 0.54 - 0.46 * Math.cos(a);
      case 'blackman':
        return 0.42 - 0.5 * Math.cos(a) + 0.08 * Math.cos(2 * a);
    }
  });
}
