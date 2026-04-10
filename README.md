# Sistema de Gestión de Activos y Bienes Empresariales

Repositorio con backend Java Maven (Spring Boot) y frontend Angular para la gestión integral del ciclo de vida de activos empresariales.

## Componentes

- `src/`: Backend Spring Boot con módulos de adquisiciones, inventario, asignaciones, bajas y reportes.
- `frontend/`: Frontend Angular 20 con interfaz por módulos y consumo de la API protegida con HTTP Basic.

## Backend

### Módulos incluidos

- **Adquisiciones**: registro de facturas con proveedor y partida presupuestaria.
- **Inventario central**: alta de activos con trazabilidad por factura y etiquetado QR/RFID.
- **Asignaciones y resguardos**: préstamos, devoluciones e historial por empleado.
- **Bajas y enajenación**: solicitud y aprobación jerárquica de bajas.
- **Reportes**: resumen de bienes invertidos, reportes por empleado y exportación básica.

### Seguridad

Se incluye autenticación básica con usuarios en memoria:

- `admin / admin123`
- `compras / compras123`
- `inventario / inventario123`
- `finanzas / finanzas123`

### Endpoints principales

- `POST /api/acquisitions/invoices`
- `POST /api/inventory/assets`
- `GET /api/inventory/assets`
- `POST /api/assignments`
- `POST /api/assignments/{assignmentId}/return`
- `POST /api/disposals`
- `POST /api/disposals/{id}/approve`
- `GET /api/reports/invested-assets/summary`
- `GET /api/reports/employee/{employeeId}`
- `GET /api/reports/invested-assets/export?format=excel|pdf`

## Frontend Angular

Ver guía detallada en [`frontend/README.md`](frontend/README.md).

Ejecución rápida:

```bash
cd frontend
npm install
npm start
```

## Troubleshooting

Si Maven muestra `Non-parseable POM` con `=======`, revisa la guía en `docs/TROUBLESHOOTING.md`.
