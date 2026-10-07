# Web Jurídica — Lic. Lilibeth Navarrete Rosas

Sitio web profesional de una abogada: presentación (perfil, experiencia, certificaciones, costos y contacto) y un **Filtro Legal** (formulario de solicitud de asesoría) que sirve para pre-calificar a quien quiere agendar una cita. Incluye un panel administrativo para ver las solicitudes.

Proyecto de aprendizaje de Javier, hecho con IA y terminal. Sitio estático: HTML + CSS + JavaScript, sin dependencias ni paso de compilación.

## Estructura

| Archivo | Qué es |
|---|---|
| `index.html` | Página principal: encabezado, Sobre mí, Formación y Certificaciones, Servicios, Costos y Contacto |
| `styles.css` | Estilos de la página principal |
| `encuesta.html` · `encuesta.css` · `encuesta.js` | **Filtro Legal**: formulario "Solicitud de Asesoría Jurídica" (réplica del Google Form original) |
| `store.js` | Capa de datos del filtro: `enviarSolicitud()` y `listarSolicitudes()` |
| `admin.html` · `admin.css` · `admin-solicitudes.js` | Panel administrativo: muestra las solicitudes recibidas |

## Cómo verlo en tu computadora

Es un sitio estático. Dos opciones:

```bash
# Opción 1: abrir directamente
start index.html            # Windows

# Opción 2 (recomendada): con un servidor local
python -m http.server 8000  # y abrir http://localhost:8000
```

## Cómo se publica

Está en **Vercel**, pero el proyecto **no está conectado a GitHub**: hacer `git push` **no** actualiza el sitio. Se publica a mano desde la carpeta del proyecto:

```bash
vercel          # despliegue de vista previa (URL temporal)
vercel --prod   # producción
```

## ⚠️ Estado actual (importante)

- Las solicitudes del Filtro Legal se guardan **solo en el navegador** de quien llena el formulario (`localStorage`). Sirve para construir y probar, pero **la abogada no las recibe**. No compartir el sitio con clientes reales hasta tener servidor.
- El inicio de sesión del panel administrativo es solo visual y las credenciales están en el código: **no es seguro** y es solo para práctica.
- Plan: servidor propio con base de datos y envío de las solicitudes por correo. Al conectarlo, solo hay que reescribir las dos funciones de `store.js`; el formulario y el panel no cambian.
- Pendientes: foto profesional, descripción de los servicios y menú para celular.

## Dónde está la documentación

El plan de trabajo, el análisis técnico y los datos de la abogada viven en el vault de Obsidian de Javier (`03 Projects/Web Juridica`).
