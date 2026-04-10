# Frontend Angular - Gestión de Activos y Bienes

Este frontend está diseñado para consumir el backend Spring Boot de este repositorio y cubrir los módulos definidos en el documento de requerimientos.

## Módulos implementados

- **Adquisiciones**: registro de facturas con proveedor y partida presupuestaria.
- **Inventario central**: alta de activos y catálogo maestro con estado, ubicación y etiquetado QR/RFID.
- **Asignaciones y resguardos**: préstamos, devoluciones e historial por empleado.
- **Bajas y enajenación**: solicitud de baja y aprobación jerárquica.
- **Reportes**: resumen de bienes invertidos, reporte por empleado, próximos a baja y exportación Excel/PDF.

## Seguridad y acceso

El backend utiliza autenticación HTTP Basic. El frontend incluye un panel de login simple (usuario/contraseña) y añade automáticamente las credenciales a cada request.

Usuarios por defecto (backend):

- `admin / admin123`
- `compras / compras123`
- `inventario / inventario123`
- `finanzas / finanzas123`

## Desarrollo local

1. Levantar backend (puerto `8080`).
2. Ingresar al frontend:

```bash
cd frontend
npm install
npm start
```

`npm start` usa `proxy.conf.json` para enrutar `/api` al backend local y evitar problemas de CORS.

## Estructura

- `src/app/core`: modelos, servicios API e interceptor de autenticación.
- `src/app/features`: páginas por dominio funcional.
- `src/app/app.routes.ts`: rutas principales del sistema.
