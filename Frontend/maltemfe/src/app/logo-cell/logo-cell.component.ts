import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-logo-cell',
  standalone: true,
  imports: [],
  templateUrl: './logo-cell.component.html',
  styleUrl: './logo-cell.component.scss',
})
export class LogoCellComponent implements ICellRendererAngularComp {
  logoData?: number[];
  params?: ICellRendererParams<any, any, any>;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.logoData = params.value;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    this.logoData = params.value;
    return true;
  }
  utilityService = inject(UtilityService);
}
