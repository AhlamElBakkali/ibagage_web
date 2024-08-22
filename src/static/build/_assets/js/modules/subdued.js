document.addEventListener("DOMContentLoaded", function() {
    let elementosSubdued = document.querySelectorAll('.-subdued');

    if (elementosSubdued.length === 0) {
        return;
    }

    for (let i = 0; i < elementosSubdued.length; i++) {
        let elementoActual = elementosSubdued[i];
        let elementoSiguiente = elementosSubdued[i + 1];

        if (elementoSiguiente && elementoSiguiente.previousElementSibling === elementoActual) {
            elementoActual.classList.add('-firstchild');

            let indicePrimerElemento = i;
            while (elementoSiguiente && elementoSiguiente.previousElementSibling === elementoActual) {
                i++;
                elementoActual = elementoSiguiente;
                elementoSiguiente = elementosSubdued[i + 1];
            }

            elementoActual.classList.add('-lastchild');

            // Aplicar la clase '-middlechild' a los elementos entre el primero y el último
            for (let j = indicePrimerElemento + 1; j < i; j++) {
                elementosSubdued[j].classList.add('-middlechild');
            }
        }
    }
});

