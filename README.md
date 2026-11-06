# @lp-labs/signal-windows

Actual rectangular, Hann, Hamming and Blackman sample windows with explicit symmetric and periodic lengths.

Standalone Node.js >=18 package. ESM and CommonJS with separate strict TypeScript declarations. No runtime, peer or sibling dependencies.

## Install

```sh
npm install @lp-labs/signal-windows
```

## Example

```js
import { window } from '@lp-labs/signal-windows';
console.log(window('hann', 5)); // symmetric taper
console.log(window('hamming', 4, true)); // periodic taper
```

## API, customization, numerical behavior and limits

window(kind, length, periodic=false) returns a fresh number array. WindowKind chooses rectangular=1, hann=0.5-0.5cos(θ), hamming=0.54-0.46cos(θ), or blackman=0.42-0.5cos(θ)+0.08cos(2θ). θ=2πi/(N-1) for symmetric and 2πi/N for periodic. N=1 returns [1] for every kind and either convention. Integer N is limited to 1..1000000. Unknown kinds raise TypeError; bad lengths raise RangeError. O(N) time/memory. Endpoints may differ from exact zero by about 1e-16; no clamping or amplitude/energy normalization is applied. These coefficients do not themselves implement a filter or guarantee leakage suppression for arbitrary signals. No callbacks.

## Full declarations

```ts
export type WindowKind = 'rectangular' | 'hann' | 'hamming' | 'blackman';
export declare function window(kind: WindowKind, length: number, periodic?: boolean): number[];
```

## Development

```sh
npm ci --offline --no-audit --no-fund
npm run build
npm run typecheck
npm test
npm run format:check
```

Tests use Node's built-in runner and include independent or analytic reference cases. No runtime global browser access, I/O or hidden dependencies.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
