# ToDo List App - Sistema de Gestión de Tareas

## 📋 Descripción
ToDo List App es una aplicación web profesional de gestión de tareas (CRUD) desarrollada como una **Single Page Application (SPA)**. Está diseñada para optimizar la productividad mediante una interfaz moderna, filtrado inteligente de tareas, persistencia local de datos y notificaciones en tiempo real.

## 🚀 Arquitectura Técnica
El proyecto ha sido construido siguiendo estándares modernos de desarrollo frontend:

* **React 18+:** Interfaz de usuario basada en componentes.
* **Vite:** Herramienta de compilación ultra rápida.
* **Tailwind CSS v4:** Estilos modernos y responsivos utilizando utilidades nativas.
* **React Router Dom:** Enrutamiento dinámico para SPA (`Routes`, `Route`, `Outlet`, `useParams`).
* **Estado:** Gestión de estado centralizado con `useState` y persistencia con `localStorage`.

## 🛠️ Características Destacadas

### 1. Gestión de Tareas (CRUD)
* **Creación y Edición:** Formulario unificado con validación inteligente.
* **Filtrado Dinámico:** Visualización selectiva de tareas activas, en progreso o completadas.
* **Eliminación Segura:** Notificaciones de confirmación mediante alertas modernas.

### 2. Persistencia y Datos
* **Base de Datos Local:** Utiliza `localStorage` para que tus tareas persistan al cerrar o recargar el navegador.
* **Data Seed:** El sistema inicializa automáticamente con 10 tareas de ejemplo cada vez que se reinicia la sesión para garantizar una experiencia funcional inmediata.

### 3. UX Profesional
* **Dashboard Inteligente:** Widget de rendimiento que calcula porcentajes reales de avance mediante **Anillos de Progreso SVG** dinámicos.
* **Notificaciones Modernas:** Sistema de alertas (*Toasts*) que informa el éxito de las operaciones (crear, editar, eliminar).
* **Modal de Revisión:** Vista rápida de detalles para tareas vitales con efecto de desenfoque (*backdrop-blur*).
* **Iconografía Nativa:** Uso de SVG nativos (Heroicons) para una interfaz limpia y profesional.

## 📁 Estructura del Proyecto

```text
src/
├── components/      # Componentes reutilizables (ej. AnilloProgreso)
├── data/            # Datos semilla (tareasSemilla.js)
├── layouts/         # Contenedores de estructura (MainLayout)
├── views/           # Vistas principales (Dashboard, CategoryView, TaskFormView)
├── App.jsx          # Lógica central, Enrutador y Estado Global
└── index.css        # Configuración base de Tailwind y animaciones
