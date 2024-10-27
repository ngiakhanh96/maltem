import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-cell',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button-cell.component.html',
  styleUrl: './button-cell.component.scss',
})
export class ButtonCellComponent implements ICellRendererAngularComp {
  params?: any;
  displayText: string = '';
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.displayText = this.params.text;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.params = params;
    this.displayText = this.params.text;
    return true;
  }
  onClick() {
    this.params.click(this.params.data);
  }
}
