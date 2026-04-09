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


## Pruebas integrales de API

### 1) Pruebas rápidas con MockMvc (sin levantar servidor manual)

```bash
mvn test
```

Incluye validaciones de:
- endpoint público (`GET /`)
- endpoint protegido sin credenciales (`GET /api/inventory/assets`)
- intento de creación de factura sin autenticación (`POST /api/acquisitions/invoices`)

### 2) Pruebas manuales con curl

```bash
# Health público
curl -i http://localhost:8080/

# Inventario protegido (debe responder 401 si no envías usuario/clave)
curl -i http://localhost:8080/api/inventory/assets

# Inventario autenticado
curl -i -u inventario:inventario123 http://localhost:8080/api/inventory/assets
```

### 3) Próximo paso recomendado

Crear pruebas por módulo (adquisiciones, inventario, asignaciones, bajas, reportes) con datos de prueba y casos felices + casos de validación de reglas de negocio.
