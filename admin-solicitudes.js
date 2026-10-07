/*
 * admin-solicitudes.js — Muestra en el panel las solicitudes del Filtro Legal.
 * Lee de store.js (FiltroStore), el mismo que usa encuesta.html para guardar.
 *
 * Seguridad: todo lo que escribe el cliente se inserta con textContent
 * (nunca con innerHTML), para que nadie pueda inyectar código en el panel.
 */
(function () {
    const cuerpo = document.getElementById('solicitudes-body');
    const vacio = document.getElementById('solicitudes-vacio');

    const CAMPOS_DETALLE = [
        ['Correo', (s) => s.correo || '—'],
        ['Situación', (s) => s.descripcion || '—'],
        ['Etapa del asunto', (s) => (s.etapa && s.etapa.length ? s.etapa.join('\n') : '—')],
        ['Qué desea obtener', (s) => s.objetivo || '—'],
        ['Preguntas específicas', (s) => s.preguntas || '—'],
        ['Modalidad', (s) => s.modalidad || '—'],
        ['Horario de disponibilidad', (s) => s.horario || '—']
    ];

    function celda(texto) {
        const td = document.createElement('td');
        td.textContent = texto;
        return td;
    }

    function formatearFecha(iso) {
        const f = new Date(iso);
        return isNaN(f) ? '—' : f.toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
    }

    function filaDetalle(s) {
        const tr = document.createElement('tr');
        tr.className = 'fila-detalle';
        tr.hidden = true;
        const td = document.createElement('td');
        td.colSpan = 5;
        CAMPOS_DETALLE.forEach(([titulo, valor]) => {
            const item = document.createElement('div');
            item.className = 'detalle-item';
            const strong = document.createElement('strong');
            strong.textContent = titulo;
            const span = document.createElement('span');
            span.textContent = valor(s);
            item.append(strong, span);
            td.appendChild(item);
        });
        tr.appendChild(td);
        return tr;
    }

    function filaSolicitud(s) {
        const tr = document.createElement('tr');
        tr.className = 'fila-solicitud';
        tr.title = 'Clic para ver el detalle';
        tr.append(celda(formatearFecha(s.fecha)), celda(s.nombre), celda(s.area), celda(s.whatsapp));

        const tdEstado = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = 'status-badge';
        badge.textContent = s.estado || 'Nuevo';
        tdEstado.appendChild(badge);
        tr.appendChild(tdEstado);

        const detalle = filaDetalle(s);
        tr.addEventListener('click', () => { detalle.hidden = !detalle.hidden; });
        return [tr, detalle];
    }

    async function mostrarSolicitudes() {
        const solicitudes = await FiltroStore.listarSolicitudes();
        cuerpo.replaceChildren();
        vacio.hidden = solicitudes.length > 0;
        solicitudes.forEach((s) => cuerpo.append(...filaSolicitud(s)));
    }

    mostrarSolicitudes();
    // Si llega una solicitud mientras el panel está abierto, se actualiza sola.
    window.addEventListener('storage', mostrarSolicitudes);
    window.addEventListener('focus', mostrarSolicitudes);
})();
