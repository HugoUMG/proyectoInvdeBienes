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

---

## Error: `end tag name </parent> must match start tag name <properties>`

Este error significa que el XML quedó **desbalanceado** (se abrió `<properties>` y se cerró otra etiqueta distinta, o se movieron cierres de lugar).

### Estructura correcta (orden mínimo recomendado)

```xml
<project>
  <modelVersion>4.0.0</modelVersion>

  <parent>...</parent>

  <groupId>...</groupId>
  <artifactId>...</artifactId>
  <version>...</version>

  <properties>...</properties>
  <dependencies>...</dependencies>
  <build>...</build>
</project>
```

### Pasos rápidos

1. Reemplaza tu `pom.xml` por el `pom.xml` de este repositorio (está balanceado y válido).
2. Verifica que **cada etiqueta abierta tenga su cierre** en el mismo bloque lógico (`<parent>...</parent>`, `<properties>...</properties>`).
3. Ejecuta:

```bash
python -c "import xml.etree.ElementTree as ET; ET.parse('pom.xml'); print('POM XML OK')"
mvn test
```

### Nota sobre warnings de `sun.misc.Unsafe`

Los warnings mostrados al iniciar Maven (relacionados con Guice/Unsafe) **no son la causa del fallo del POM**. El problema real es de sintaxis XML.
