(function() {
    'use strict';

    const inputs = {};
    const paneCountElement = document.getElementById('pane-count');
    const paneWidthElement = document.getElementById('pane-width');

    function getValue(element) {
        const isNumber = (element === paneCountElement ? Number.isSafeInteger
                                                       : Number.isFinite);

        const value = Number(element.value);

        return isNumber(value) && value > 0 ? value : NaN;
    }

    function updateBadness(element, value) {
        if (Number.isNaN(value)) {
            element.classList.add('bad');
            return true;
        } else {
            element.classList.remove('bad');
            return false;
        }
    }

    function updateInput(element) {
        const value = getValue(element);
        inputs[element.id] = value;
        updateBadness(element.parentElement, value);
    }

    function tryComputePaneWidth() {
        const w = inputs['window-width'];
        const N = inputs['pane-count'];
        const c = inputs['casing-width'];
        const m = inputs['mullion-width'];

        const p = (w - 2 * c + (1 - N) * m) / N;

        paneWidthElement.innerText =
            (updateBadness(paneWidthElement, p) ? "???" : p.toPrecision(4));
    }

    for (const element of document.getElementsByTagName('input')) {
        element.addEventListener('input', function(e) {
            updateInput(e.target);
            tryComputePaneWidth();
        });

        updateInput(element);
    }

    tryComputePaneWidth();
})();
