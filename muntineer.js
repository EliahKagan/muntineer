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

    const HAIRSP = '\u200a';

    const COLORS = {
        CASING: '#414a4c',
        MUNTIN: '#414a4c', // For now, casing and muntin have the same color.
        PANE: '#d7ecff',
    };

    const SCALABLE_PARAMETERS = [
        'totalHeight',
        'totalWidth',
        'casing',
        'muntin',
        'paneWidth',
        'paneHeight',
    ];

    const totalHeightField = document.getElementById('totalHeight');
    const paneWidthField = document.getElementById('paneWidth');
    const panesField = document.getElementById('panes');

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
        return isValid(value, field === panesField) ? value : NaN;
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

        setBadness(paneWidthField, !isValid(inputs.paneWidth));

        paneWidthField.innerText = (Number.isNaN(inputs.paneWidth)
                                        ? `?${HAIRSP}?${HAIRSP}?`
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

    function updateDrawing() {
        if (!Number.isNaN(inputs.casing)) {
            inputs.paneHeight = inputs.totalHeight - 2 * inputs.casing;
            const heightOk = isValid(inputs.paneHeight);
            setParentBadness(totalHeightField, !heightOk);

            if (!Number.isNaN(inputs.scale) && heightOk
                                            && isValid(inputs.paneWidth)) {
                const scaled = getScaledDrawingParameters();
                resetDrawing(scaled);
                populateDrawing(scaled);
                setBadness(drawing.node, false);
                return;
            }
        }

        if (drawing !== null) {
            setBadness(drawing.node, true);
        }
    }

    function updateOutput() {
        updateResult();
        updateDrawing();
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
