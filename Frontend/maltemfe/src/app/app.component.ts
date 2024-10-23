import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface ICafe {
  id: string;
  logo: string;
  name: string;
  description: string;
  employees: number;
  location: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
