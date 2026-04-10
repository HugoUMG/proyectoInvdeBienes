import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetsApiService } from '../../../core/services/assets-api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Módulo de Adquisiciones (Compras)</h2>
    <form [formGroup]="invoiceForm" (ngSubmit)="submit()" class="form-grid">
      <input formControlName="invoiceNumber" placeholder="Número de factura" />
      <input type="date" formControlName="invoiceDate" />
      <input type="number" formControlName="totalAmount" placeholder="Total" />
      <input type="number" formControlName="supplierId" placeholder="ID proveedor" />
      <input type="number" formControlName="budgetLineId" placeholder="ID partida presupuestaria" />
      <textarea formControlName="notes" placeholder="Notas"></textarea>
      <button type="submit">Registrar factura</button>
    </form>

    <p *ngIf="message">{{ message }}</p>
  `,
  styles: '.form-grid{display:grid;gap:.6rem;max-width:560px}'
})
export class AdquisicionesPage {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AssetsApiService);

  message = '';
  readonly invoiceForm = this.fb.nonNullable.group({
    invoiceNumber: ['', Validators.required],
    invoiceDate: ['', Validators.required],
    totalAmount: [0, [Validators.required, Validators.min(0.01)]],
    supplierId: [0, [Validators.required, Validators.min(1)]],
    budgetLineId: [0, [Validators.required, Validators.min(1)]],
    notes: ['']
  });

  submit(): void {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    this.api.createInvoice(this.invoiceForm.getRawValue()).subscribe({
      next: (invoice) => {
        this.message = `Factura ${invoice.invoiceNumber} registrada (id ${invoice.id}).`;
      },
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible registrar la factura.')
    });
  }
}
