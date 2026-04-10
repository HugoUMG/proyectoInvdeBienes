import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asset, Assignment } from '../../../core/models/api.models';
import { AssetsApiService } from '../../../core/services/assets-api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  template: `
    <h2>Módulo de Reportes</h2>
    <button type="button" (click)="loadSummary()">Reporte de bienes invertidos</button>
    <strong *ngIf="totalInvested !== null">{{ totalInvested | currency : 'USD' }}</strong>

    <form [formGroup]="employeeForm" (ngSubmit)="loadEmployeeReport()" class="inline-form">
      <input type="number" formControlName="employeeId" placeholder="Empleado ID" />
      <button type="submit">Reporte por empleado</button>
    </form>
    <ul><li *ngFor="let item of employeeAssignments">{{ item.asset.assetCode }} - {{ item.asset.name }} - {{ item.status }}</li></ul>

    <button type="button" (click)="loadUpcomingDisposals()">Bienes próximos a baja</button>
    <ul><li *ngFor="let asset of upcoming">{{ asset.assetCode }} - {{ asset.name }}</li></ul>

    <section class="inline-form">
      <button type="button" (click)="download('excel')">Exportar Excel</button>
      <button type="button" (click)="download('pdf')">Exportar PDF</button>
    </section>

    <p *ngIf="message">{{ message }}</p>
  `,
  styles: '.inline-form{display:flex;gap:.5rem;align-items:center;margin:.8rem 0}'
})
export class ReportesPage {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AssetsApiService);

  totalInvested: number | null = null;
  employeeAssignments: Assignment[] = [];
  upcoming: Asset[] = [];
  message = '';
  readonly employeeForm = this.fb.nonNullable.group({
    employeeId: [0, [Validators.required, Validators.min(1)]]
  });

  loadSummary(): void {
    this.api.investedSummary().subscribe({
      next: (summary) => (this.totalInvested = summary.totalInvested),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible cargar resumen financiero.')
    });
  }

  loadEmployeeReport(): void {
    if (this.employeeForm.invalid) return;
    this.api.employeeReport(this.employeeForm.getRawValue().employeeId).subscribe({
      next: (rows) => (this.employeeAssignments = rows),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible cargar reporte por empleado.')
    });
  }

  loadUpcomingDisposals(): void {
    this.api.upcomingDisposals().subscribe({
      next: (rows) => (this.upcoming = rows),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible cargar próximos a baja.')
    });
  }

  download(format: 'excel' | 'pdf'): void {
    this.api.exportInvested(format).subscribe({
      next: (blob) => {
        const ext = format === 'pdf' ? 'pdf' : 'csv';
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `reporte-bienes-invertidos.${ext}`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => (this.message = err?.error?.error ?? `No fue posible exportar ${format}.`)
    });
  }
}
