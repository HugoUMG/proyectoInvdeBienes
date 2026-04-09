# Solución de errores comunes de Maven

## Error: `Non-parseable POM ... expected START_TAG or END_TAG not TEXT`

Si aparece un texto como `=======` en el error (por ejemplo en línea 19), el `pom.xml` tiene **marcadores de conflicto de Git**.

Marcadores típicos:

```text
<<<<<<< HEAD
...
=======
...
>>>>>>> branch
```

### Cómo corregirlo

1. Abre `pom.xml` y elimina todos los marcadores `<<<<<<<`, `=======`, `>>>>>>>`.
2. Conserva una sola versión válida del bloque XML.
3. Guarda y valida:

```bash
mvn -q help:effective-pom -Doutput=effective-pom.xml
mvn test
```

### Nota sobre warnings de `sun.misc.Unsafe`

Los warnings mostrados al iniciar Maven (relacionados con Guice/Unsafe) **no son la causa del fallo del POM**. El problema real es de sintaxis XML por conflicto no resuelto.
