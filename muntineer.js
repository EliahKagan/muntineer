// This file is part of muntineer, which visualizes window-pane algebra.
//
// Copyright (c) 2021 Eliah Kagan
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
// SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
// OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
// CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function() {
    'use strict';

    const CH = Object.freeze({
        HAIRSP: '\u200a',
        NDASH: '\u2013',
        RSQUO: '\u2019',
    });

    const COLORS = Object.freeze({
        CASING: '#414a4c',
        MUNTIN: '#414a4c', // For now, casing and muntin have the same color.
        PANE: '#d7ecff',
    });

    const SCALABLE_PARAMETERS = Object.freeze([
        'totalHeight',
        'totalWidth',
        'casing',
        'muntin',
        'paneWidth',
        'paneHeight',
    ]);

    const inputs = {};
    let drawing = null;

    function getNumberKindValidator(mustBeInteger) {
        return mustBeInteger ? Number.isSafeInteger : Number.isFinite;
    }

    function isValid(value, mustBeInteger = false) {
        return getNumberKindValidator(mustBeInteger)(value) && value > 0;
    }

    function parse(field) {
        const value = Number(field.value);
        return isValid(value, field.id === 'panes') ? value : NaN;
    }

    function setBadness(element, isBad) {
        if (isBad) {
            element.classList.add('bad');
        } else {
            element.classList.remove('bad');
        }
    }

    function setParentBadness(element, parentIsBad) {
        setBadness(element.parentElement, parentIsBad);
    }

    function updateInput(field) {
        const value = parse(field);
        inputs[field.id] = value;
        setParentBadness(field, Number.isNaN(value));
    }

    function updateResult() {
        inputs.paneWidth =
            (inputs.totalWidth
             - 2 * inputs.casing
             + (1 - inputs.panes) * inputs.muntin) / inputs.panes;

        const paneWidthField = document.getElementById('paneWidth');

        setBadness(paneWidthField, !isValid(inputs.paneWidth));

        paneWidthField.textContent = (Number.isNaN(inputs.paneWidth)
                                        ? `?${CH.HAIRSP}?${CH.HAIRSP}?`
                                        : inputs.paneWidth.toFixed(4));
    }

    function getScaledDrawingParameters() {
        const params = {};

        for (const name of SCALABLE_PARAMETERS) {
            params[name] = inputs[name] * inputs.scale;
        }

        return params;
    }

    function resetDrawing(scaled) {
        if (drawing === null) {
            drawing = SVG().addTo('#drawing-div');
        } else {
            drawing.clear();
        }

        drawing.size(scaled.totalWidth, scaled.totalHeight);
    }

    function populateDrawing(scaled) {
        drawing.rect('100%', '100%').fill(COLORS.CASING);

        drawing.rect(scaled.totalWidth - scaled.casing * 2,
                     scaled.totalHeight - scaled.casing * 2)
               .move(scaled.casing, scaled.casing)
               .fill(COLORS.MUNTIN);

        const stride = scaled.paneWidth + scaled.muntin;

        for (let i = 0; i < inputs.panes; ++i) {
            drawing.rect(scaled.paneWidth, scaled.paneHeight)
                   .move(scaled.casing + i * stride, scaled.casing)
                   .fill(COLORS.PANE);
        }
    }

    // Returns true if the drawing could be updated, false otherwise.
    function updateDrawing() {
        inputs.paneHeight = inputs.totalHeight - 2 * inputs.casing;

        if (!isValid(inputs.paneHeight)) {
            if (!Number.isNaN(inputs.paneHeight)) {
                // Computed pane height is invalid, but the given casing width
                // is allowed. So the given total height is the problem.
                setParentBadness(document.getElementById('totalHeight'), true);
            }

            return false;
        }

        setParentBadness(document.getElementById('totalHeight'), false);

        if (Number.isNaN(inputs.scale) || !isValid(inputs.paneWidth)) {
            return false;
        }

        const scaled = getScaledDrawingParameters();
        resetDrawing(scaled);
        populateDrawing(scaled);
        return true;
    }

    function getBadFieldShortNames() {
        return [...document.getElementsByTagName('fieldset')]
            .filter(fieldset => fieldset.classList.contains('bad'))
            .map(fieldset => fieldset.dataset.shortname);
    }

    function asHumanReadableList(phrases) {
        switch (phrases.length) {
        case 0:
            throw "Can't make a human-readable list of zero phrases.";
        case 1:
            return phrases[0];
        case 2:
            return phrases.join(' and ');
        default:
            return `${phrases.slice(0, -1).join(', ')}, `
                 + `and ${phrases[phrases.length - 1]}`;
        }
    }

    function buildErrorDetail() {
        const shortnames = getBadFieldShortNames();

        if (shortnames.length > 0) {
            return `Check ${asHumanReadableList(shortnames)}`;
        } else if (inputs.paneWidth <= 0) {
            return '$p$ must be positive';
        } else {
            return `No details ${CH.NDASH} this is a bug`;
        }
    }

    function buildErrorMessage() {
        // FIXME: Apply KaTeX formatting to buildErrorDetail() return value.
        const prefix = `Can${CH.RSQUO}t draw window: ${buildErrorDetail()}.`;
        return drawing === null ? prefix : prefix + ' (Old drawing shown.)';
    }

    function updateOutput() {
        updateResult();
        const ok = updateDrawing();

        if (drawing !== null) {
            setBadness(drawing.node, !ok);
        }

        const status = document.getElementById('statusMessage');
        setBadness(status, !ok);
        status.textContent = (ok ? "OK" : buildErrorMessage());
    }

    function handleInput(e) {
        updateInput(e.target);
        updateOutput();
    }

    for (const field of document.getElementsByTagName('input')) {
        field.addEventListener('input', handleInput);
        updateInput(field);
    }

    updateOutput();
})();
