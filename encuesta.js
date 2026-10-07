/*
 * encuesta.js — Lógica del formulario "Solicitud de Asesoría Jurídica".
 * Depende de store.js (FiltroStore).
 */
(function () {
    const form = document.getElementById('filtroForm');
    const contenedorForm = document.getElementById('filtro-formulario');
    const contenedorGracias = document.getElementById('filtro-gracias');
    const botonEnviar = document.getElementById('btn-enviar');
    const botonBorrar = document.getElementById('btn-borrar');
    const botonOtra = document.getElementById('btn-otra');
    const errorEtapa = document.getElementById('error-etapa');
    const errorEnvio = document.getElementById('error-envio');
    const otroRadio = document.getElementById('area-otro');
    const otroTexto = document.getElementById('area-otro-texto');
    const checksEtapa = form.querySelectorAll('input[name="etapa"]');

    // "Otro": el campo de texto solo se activa (y es obligatorio) si se elige esa opción.
    function actualizarOtro() {
        const esOtro = otroRadio.checked;
        otroTexto.disabled = !esOtro;
        otroTexto.required = esOtro;
        if (!esOtro) otroTexto.value = '';
    }
    form.querySelectorAll('input[name="area"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            actualizarOtro();
            if (otroRadio.checked) otroTexto.focus();
        });
    });

    // Etapa (casillas): HTML no permite "al menos una" de forma nativa, se valida aquí.
    function etapaValida() {
        return Array.from(checksEtapa).some((c) => c.checked);
    }
    checksEtapa.forEach((c) => c.addEventListener('change', () => {
        if (etapaValida()) errorEtapa.hidden = true;
    }));

    // Deja el formulario limpio (como recién abierto).
    function limpiarFormulario() {
        form.reset();
        actualizarOtro();
        errorEtapa.hidden = true;
        errorEnvio.hidden = true;
        botonEnviar.disabled = false;
        botonEnviar.textContent = 'Enviar';
    }

    // "Borrar formulario" (igual que en Google Forms, pide confirmar).
    botonBorrar.addEventListener('click', () => {
        if (confirm('¿Borrar formulario? Se quitarán todas tus respuestas y no se podrá deshacer.')) {
            limpiarFormulario();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // "Enviar otra respuesta" (enlace de la pantalla de confirmación).
    botonOtra.addEventListener('click', () => {
        limpiarFormulario();
        contenedorGracias.hidden = true;
        contenedorForm.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEnvio.hidden = true;

        if (!etapaValida()) {
            errorEtapa.hidden = false;
            document.getElementById('grupo-etapa').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const datos = new FormData(form);
        const area = datos.get('area') === '__otro__'
            ? 'Otro: ' + otroTexto.value.trim()
            : datos.get('area');

        const solicitud = {
            nombre: datos.get('nombre').trim(),
            whatsapp: datos.get('whatsapp').trim(),
            correo: datos.get('correo').trim(),
            area: area,
            descripcion: datos.get('descripcion').trim(),
            etapa: datos.getAll('etapa'),
            objetivo: datos.get('objetivo').trim(),
            preguntas: datos.get('preguntas').trim(),
            modalidad: datos.get('modalidad'),
            horario: datos.get('horario')
        };

        botonEnviar.disabled = true;
        botonEnviar.textContent = 'Enviando...';

        try {
            await FiltroStore.enviarSolicitud(solicitud);
            contenedorForm.hidden = true;
            contenedorGracias.hidden = false;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            errorEnvio.hidden = false;
            botonEnviar.disabled = false;
            botonEnviar.textContent = 'Enviar';
        }
    });
})();
