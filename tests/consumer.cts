import * as api from '@lp-labs/signal-windows';
const kind: api.WindowKind = 'hann';
const coefficients: number[] = api.window(kind, 8, true);
void coefficients;
// @ts-expect-error Invalid API input must be rejected.
api.window('triangle', 8);
