<!--
  This file is part of muntineer, which visualizes window-pane algebra.

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

# muntineer - visualizing window-pane algebra

*Written in 2021 by Eliah Kagan &lt;degeneracypressure@gmail.com&gt;.*

**muntineer** computes the width of window panes given total window width,
number of panes in a row, and casing and muntin thicknesses, and it
illustrates the computation with an SVG visualization.

muntineer is [licensed](LICENSE) under
[0BSD](https://spdx.org/licenses/0BSD.html) (&ldquo;Zero-Clause BSD
License,&rdquo; also called the [Free Public License
1.0.0](https://opensource.org/licenses/0BSD)). Its dependencies are covered
under other licenses, detailed below.

[**Try muntineer on the web here.**](https://eliahkagan.github.io/muntineer/)

Or, to use a local copy, clone this repository and open `index.html` in a web
browser.

## Dependencies

All dependencies are retrieved from a CDN so everything should just work, so
long as you're connected to the internet. None of them are provided in this
repository.

Please note that while this project is licensed under 0BSD (which is a
&ldquo;public-domain equivalent&rdquo; license), its dependencies are not,
though they are all free software.

The dependencies, and their licenses, are:

- [SVG.js](https://svgjs.com) 3.0.16 by Wout Fierens ([MIT
  License](https://github.com/svgdotjs/svg.js/blob/3.0.16/LICENSE.txt))
- [KaTeX](https://katex.org/) 0.13.2 from Khan Academy, by Emily Eisenberg,
  Sophie Alpert, et al. ([MIT
  License](https://github.com/KaTeX/KaTeX/blob/v0.13.2/LICENSE))
- [normalize.css](https://necolas.github.io/normalize.css/) 8.0.1 by Nicolas
  Gallagher and Jonathan Neal ([MIT
  License](https://github.com/necolas/normalize.css/blob/8.0.1/LICENSE.md))
- [*Fork me on GitHub* CSS
  ribbon](https://simonwhitaker.github.io/github-fork-ribbon-css/) 0.2.3 by
  Simon Whitaker ([MIT
  License](https://github.com/simonwhitaker/github-fork-ribbon-css/blob/0.2.3/LICENSE))
- [Selawik](https://docs.microsoft.com/en-us/typography/font-list/selawik),
  designed for Microsoft by Aaron Bell ([SIL OFL
  1.1](https://github.com/microsoft/Selawik/blob/master/LICENSE.txt))
- [IBM Plex](https://www.ibm.com/plex/), designed for IBM by Mike Abbink and
  the [Bold Monday](https://boldmonday.com/custom/ibm/) team ([SIL OFL
  1.1](https://github.com/IBM/plex/blob/master/LICENSE.txt))

## Known Bugs

**A major bug impacts accessibility:** red outlines, and for the SVG image *the
distinction between a green or red outline*, are currently the only way the
interface informs the user of malformed or unusable input values. To fix this,
another way to inform the user of this should be added, and (whether or not the
color scheme is also changed) the current visual hints should be secondary.

Though not really a bug, it would be nice if this supported multiple rows of
panes.
