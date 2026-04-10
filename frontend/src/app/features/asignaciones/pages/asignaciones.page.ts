import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Assignment } from '../../../core/models/api.models';
import { AssetsApiService } from '../../../core/services/assets-api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Módulo de Asignaciones y Resguardos</h2>
    <form [formGroup]="assignmentForm" (ngSubmit)="assign()" class="form-grid">
      <input type="number" formControlName="assetId" placeholder="ID activo" />
      <input type="number" formControlName="employeeId" placeholder="ID empleado" />
      <input type="date" formControlName="assignedAt" />
      <input type="date" formControlName="expectedReturnAt" />
      <input formControlName="digitalSignature" placeholder="Firma digital" />
      <input formControlName="receiptConfirmation" placeholder="Confirmación" />
      <button type="submit">Registrar asignación</button>
    </form>

    <form [formGroup]="returnForm" (ngSubmit)="returnAsset()" class="inline-form">
      <input type="number" formControlName="assignmentId" placeholder="ID asignación" />
      <button type="submit">Registrar devolución</button>
    </form>

    <form [formGroup]="employeeForm" (ngSubmit)="loadEmployeeAssignments()" class="inline-form">
      <input type="number" formControlName="employeeId" placeholder="Empleado ID" />
      <button type="submit">Buscar historial</button>
    </form>

    <p *ngIf="message">{{ message }}</p>
    <ul><li *ngFor="let item of assignments">#{{ item.id }} - {{ item.asset.name }} - {{ item.status }}</li></ul>
  `,
  styles: '.form-grid{display:grid;gap:.6rem;max-width:560px}.inline-form{display:flex;gap:.5rem;margin-top:.8rem;max-width:560px}'
})
export class AsignacionesPage {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AssetsApiService);

  assignments: Assignment[] = [];
  message = '';
  readonly assignmentForm = this.fb.nonNullable.group({
    assetId: [0, [Validators.required, Validators.min(1)]],
    employeeId: [0, [Validators.required, Validators.min(1)]],
    assignedAt: ['', Validators.required],
    expectedReturnAt: [''],
    digitalSignature: ['', Validators.required],
    receiptConfirmation: ['', Validators.required]
  });
  readonly returnForm = this.fb.nonNullable.group({ assignmentId: [0, [Validators.required, Validators.min(1)]] });
  readonly employeeForm = this.fb.nonNullable.group({ employeeId: [0, [Validators.required, Validators.min(1)]] });

  assign(): void {
    if (this.assignmentForm.invalid) return;
    this.api.createAssignment(this.assignmentForm.getRawValue()).subscribe({
      next: (created) => (this.assignments = [created, ...this.assignments]),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible crear la asignación.')
    });
  }

  returnAsset(): void {
    if (this.returnForm.invalid) return;
    this.api.returnAssignment(this.returnForm.getRawValue().assignmentId).subscribe({
      next: (updated) => (this.message = `Asignación ${updated.id} devuelta.`),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible devolver el activo.')
    });
  }

  loadEmployeeAssignments(): void {
    if (this.employeeForm.invalid) return;
    this.api.listAssignmentsByEmployee(this.employeeForm.getRawValue().employeeId).subscribe({
      next: (rows) => (this.assignments = rows),
      error: (err) => (this.message = err?.error?.error ?? 'No fue posible consultar historial.')
    });
  }
}
