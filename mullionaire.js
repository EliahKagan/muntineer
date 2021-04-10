(function() {
    'use strict';

    const inputs = {};
    const paneCountField = document.getElementById('pane-count');
    const paneWidthField = document.getElementById('pane-width');

    function getNumberKindValidator(mustBeInteger) {
        return mustBeInteger ? Number.isSafeInteger : Number.isFinite;
    }

    function isValid(value, mustBeInteger) {
        return getNumberKindValidator(mustBeInteger)(value) && value > 0;
    }

    function parse(field) {
        const value = Number(field.value);
        return isValid(value, field === paneCountField) ? value : NaN;
    }

    function setBadness(element, isBad) {
        if (isBad) {
            element.classList.add('bad');
        } else {
            element.classList.remove('bad');
        }
    }

    function updateInput(field) {
        const value = parse(field);
        inputs[field.id] = value;
        setBadness(field.parentElement, Number.isNaN(value));
    }

    function tryComputePaneWidth() {
        const w = inputs['window-width'];
        const N = inputs['pane-count'];
        const c = inputs['casing-width'];
        const m = inputs['mullion-width'];

        const p = (w - 2 * c + (1 - N) * m) / N;
        setBadness(paneWidthField, !isValid(p, false));
        paneWidthField.innerText = (Number.isNaN(p) ? '???' : p.toFixed(4));
    }

    for (const field of document.getElementsByTagName('input')) {
        field.addEventListener('input', function(e) {
            updateInput(e.target);
            tryComputePaneWidth();
        });

        updateInput(field);
    }

    tryComputePaneWidth();
})();
