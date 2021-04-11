<!--
  This file is part of mullionarie, which visualizes window-pane algebra.

  Copyright (c) 2021 Eliah Kagan

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
-->

# mullionaire - visualizing window-pane algebra

*Written in 2021 by Eliah Kagan &lt;degeneracypressure@gmail.com&gt;.*

**mullionaire** computes the width of window panes given total window width,
number of panes in a row, and casing and mullion thicknesses, and it
illustrates the computation with an SVG visualization.

It is [licensed](LICENSE) under [0BSD](https://spdx.org/licenses/0BSD.html)
(which is also called the [Free Public License
1.0.0](https://opensource.org/licenses/0BSD)).

To use a local copy, clone the repository and open `index.html` in a web
browser.

## Dependencies

All dependencies are retrieved from a CDN so everything should just work, so long as you're connected to the internet.

Please note that while this project is licensed under CC0 (which is a &ldquo;public-domain equivalent&rdquo; license), its dependencies are not, though they are all free software.

The dependencies, and their licenses, are:

- [SVG.js](https://svgjs.com) 3.0.16 by Wout Fierens ([MIT
  License](https://github.com/svgdotjs/svg.js/blob/3.0.16/LICENSE.txt))
- [normalize.css](https://necolas.github.io/normalize.css/) 8.0.1 by Nicolas
  Gallagher and Jonathan Neal ([MIT
  License](https://github.com/necolas/normalize.css/blob/8.0.1/LICENSE.md))
- [Selawik](https://docs.microsoft.com/en-us/typography/font-list/selawik), a font family designed by Aaron Bell for Microsoft ([SIL OFL 1.1](https://github.com/microsoft/Selawik/blob/master/LICENSE.txt))

## Known Bugs

The major bug is related to accessibility: red outlines, and for the SVG image
*the distinction between a green or red outline*, is currently the only way the
interface informs the user of malformed or unusable input values. To fix this,
another way to inform the user of this should be added, and (whether or not the
color scheme is also changed) the current visual hints should be secondary.

When an illustration cannot be produced/updated because the specified window
height is too small (smaller than twice the casing thickness), the &ldquo;Total
window height&rdquo; field should be marked as having an unusable value, but
currently this is not done.

This ought to be made usable from mobile devices with small screens.

I guess this could be made to work on Internet Explorer without too much
trouble, with a polyfill or two.

Though not really a bug, it would be nicer if this supported multiple rows of
panes.