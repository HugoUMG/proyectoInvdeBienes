import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asset } from '../../../core/models/api.models';
import { AssetsApiService } from '../../../core/services/assets-api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Módulo de Inventario Central</h2>

    <form [formGroup]="assetForm" (ngSubmit)="createAsset()" class="form-grid">
      <input formControlName="name" placeholder="Nombre del bien" />
      <input formControlName="description" placeholder="Descripción" />
      <input formControlName="serialNumber" placeholder="Serie" />
      <input formControlName="acquisitionDate" type="date" />
      <input formControlName="acquisitionCost" type="number" placeholder="Costo" />
      <select formControlName="tagType"><option value="QR">QR</option><option value="RFID">RFID</option></select>
      <input formControlName="tagValue" placeholder="Etiqueta" />
      <input formControlName="location" placeholder="Ubicación" />
      <input formControlName="purchaseInvoiceId" type="number" placeholder="Factura ID" />
      <button type="submit">Registrar activo</button>
    </form>

    <button type="button" (click)="loadAssets()">Refrescar catálogo</button>
    <p *ngIf="message">{{ message }}</p>

    <table *ngIf="assets.length">
      <tr *ngFor="let asset of assets">
        <td>{{ asset.assetCode }}</td><td>{{ asset.name }}</td><td>{{ asset.status }}</td><td>{{ asset.location }}</td>
      </tr>
    </table>
  `,
  styles: '.form-grid{display:grid;gap:.6rem;max-width:560px} table{width:100%;margin-top:1rem;border-collapse:collapse}td{border:1px solid #e2e8f0;padding:.4rem}'
})
export class InventarioPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(AssetsApiService);

  assets: Asset[] = [];
  message = '';
  readonly assetForm = this.fb.nonNullable.group({
    assetCode: [''],
    name: ['', Validators.required],
    description: [''],
    serialNumber: ['', Validators.required],
    acquisitionDate: ['', Validators.required],
    acquisitionCost: [0, [Validators.required, Validators.min(0.01)]],
    tagType: this.fb.nonNullable.control<'QR' | 'RFID'>('QR', Validators.required),
    tagValue: ['', Validators.required],
    location: ['', Validators.required],
    purchaseInvoiceId: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void { this.loadAssets(); }

  createAsset(): void {
    if (this.assetForm.invalid) return;
    this.api.createAsset(this.assetForm.getRawValue()).subscribe({
      next: () => this.loadAssets(),
      error: (err) => (this.message = err?.error?.error ?? 'No se pudo registrar el activo.')
    });
  }

  loadAssets(): void {
    this.api.listAssets().subscribe({
      next: (assets) => (this.assets = assets),
      error: () => (this.message = 'No se pudo cargar el inventario (revise credenciales/rol).')
    });
  }
}
