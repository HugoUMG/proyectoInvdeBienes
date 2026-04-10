import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Arquitectura propuesta</h2>
      <p>
        Esta aplicación Angular está organizada por módulos funcionales del negocio: adquisiciones, inventario,
        asignaciones, bajas y reportes. Consume los endpoints del backend protegido con autenticación básica.
      </p>
      <ul>
        <li>UI por dominio funcional.</li>
        <li>Servicios API centralizados en <code>core/services</code>.</li>
        <li>Intercepción de credenciales HTTP Basic en cada request.</li>
        <li>Formularios reactivos para flujos críticos de negocio.</li>
      </ul>
    </section>
  `
})
export class DashboardPage {}
