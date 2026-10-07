/*
 * store.js — Capa de datos del Filtro Legal.
 *
 * El formulario (encuesta.html) y el panel (admin.html) NO tocan el
 * almacenamiento directamente: solo usan estas dos funciones.
 *
 * HOY: guarda en el navegador (localStorage). Sirve para construir y probar,
 *      pero los datos solo existen en el navegador donde se llenó el formulario.
 *
 * DESPUÉS: cuando exista el servidor propio (base de datos + envío por correo),
 *      solo se reescriben estas dos funciones para que hagan fetch() al servidor.
 *      El formulario y el admin no necesitan cambiar.
 */
const FiltroStore = (() => {
    const CLAVE = 'filtro_solicitudes';

    function leer() {
        try {
            return JSON.parse(localStorage.getItem(CLAVE)) || [];
        } catch (e) {
            return [];
        }
    }

    function nuevoId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    // Guarda una solicitud nueva. Devuelve la solicitud ya con id, fecha y estado.
    async function enviarSolicitud(datos) {
        const solicitud = {
            id: nuevoId(),
            fecha: new Date().toISOString(),
            estado: 'Nuevo',
            ...datos
        };
        const todas = leer();
        todas.unshift(solicitud); // la más reciente primero
        localStorage.setItem(CLAVE, JSON.stringify(todas));
        return solicitud;
    }

    // Devuelve todas las solicitudes, la más reciente primero.
    async function listarSolicitudes() {
        return leer();
    }

    return { enviarSolicitud, listarSolicitudes };
})();
