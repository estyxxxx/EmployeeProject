import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, FooterComponent, NavBarComponent],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeesClient';
}
