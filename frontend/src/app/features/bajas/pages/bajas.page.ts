import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Disposal } from '../../../core/models/api.models';
import { AssetsApiService } from '../../../core/services/assets-api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Módulo de Bajas y Enajenación</h2>
    <form [formGroup]="requestForm" (ngSubmit)="requestDisposal()" class="form-grid">
      <input type="number" formControlName="assetId" placeholder="ID activo" />
      <input formControlName="reason" placeholder="Motivo" />
      <input formControlName="disposalType" placeholder="Tipo" />
      <input formControlName="requestedBy" placeholder="Solicitado por" />
      <button type="submit">Solicitar baja</button>
    </form>

    <form [formGroup]="approveForm" (ngSubmit)="approveDisposal()" class="inline-form">
      <input type="number" formControlName="id" placeholder="ID baja" />
      <input formControlName="approvedBy" placeholder="Aprobado por" />
      <input type="number" formControlName="finalValue" placeholder="Valor final" />
      <button type="submit">Aprobar baja</button>
    </form>

    <button type="button" (click)="loadPending()">Ver pendientes</button>
    <ul><li *ngFor="let disposal of pending">#{{ disposal.id }} - {{ disposal.asset.assetCode }} - {{ disposal.status }}</li></ul>
    <p *ngIf="message">{{ message }}</p>
  `,
  styles: '.form-grid{display:grid;gap:.6rem;max-width:560px}.inline-form{display:flex;gap:.5rem;max-width:800px;margin:.8rem 0}'
})
export class BajasPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AssetsApiService);

  pending: Disposal[] = [];
  message = '';
  readonly requestForm = this.fb.nonNullable.group({
    assetId: [0, [Validators.required, Validators.min(1)]],
    reason: ['', Validators.required],
    disposalType: ['', Validators.required],
    requestedBy: ['', Validators.required]
  });
  readonly approveForm = this.fb.nonNullable.group({
    id: [0, [Validators.required, Validators.min(1)]],
    approvedBy: ['', Validators.required],
    finalValue: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void { this.loadPending(); }

  requestDisposal(): void {
    if (this.requestForm.invalid) return;
    this.api.requestDisposal(this.requestForm.getRawValue()).subscribe({
      next: () => this.loadPending(),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible solicitar la baja.')
    });
  }

  approveDisposal(): void {
    if (this.approveForm.invalid) return;
    const { id, approvedBy, finalValue } = this.approveForm.getRawValue();
    this.api.approveDisposal(id, { approvedBy, finalValue }).subscribe({
      next: () => this.loadPending(),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible aprobar la baja.')
    });
  }

  loadPending(): void {
    this.api.listPendingDisposals().subscribe({
      next: (rows) => (this.pending = rows),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible cargar pendientes.')
    });
  }
}
