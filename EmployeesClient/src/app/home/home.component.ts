import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddRoleTypeComponent } from '../add-role-type/add-role-type.component';
import { Employee } from '../entities/employee.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent, EditEmployeeComponent, AddRoleTypeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isLogin!: Boolean;

  ngOnInit() {
    this.isLogin = localStorage.getItem('isLogin') === 'true';
  }
  
  constructor(
    private dialog: MatDialog
  ) { }

  addEmployee() {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '600px',
      data: { employee: Employee }
    });
  }
  addRoleType()
  {
    const dialogRef = this.dialog.open(AddRoleTypeComponent, {
      width: '500px'
    });
  }
}