# Backend - Sistema de Gestión de Activos y Bienes Empresariales

## Módulos incluidos

- **Adquisiciones**: registro de facturas con proveedor y partida presupuestaria.
- **Inventario central**: alta de activos con trazabilidad por factura y etiquetado QR/RFID.
- **Asignaciones y resguardos**: préstamos, devoluciones e historial por empleado.
- **Bajas y enajenación**: solicitud y aprobación jerárquica de bajas.
- **Reportes**: resumen de bienes invertidos, reportes por empleado y exportación básica.

## Seguridad

Se incluye autenticación básica con usuarios en memoria:

- `admin / admin123`
- `compras / compras123`
- `inventario / inventario123`
- `finanzas / finanzas123`

## Endpoints principales

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


## Troubleshooting

Si Maven muestra `Non-parseable POM` con `=======`, revisa la guía en `docs/TROUBLESHOOTING.md`.
