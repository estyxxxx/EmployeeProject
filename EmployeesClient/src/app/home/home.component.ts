import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddRoleTypeComponent } from '../add-role-type/add-role-type.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent, EditEmployeeComponent, AddRoleTypeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isOpen = false;
  isTypeOpen = false;
  isLogin!: Boolean;

  ngOnInit() {
    this.isLogin = localStorage.getItem('isLogin') === 'true';
  }
  
  addEmployee() {
    this.isOpen = true;
  }
  saveAddEmployee(): void {
    this.isOpen = false; 
    console.log("comming here", this.isOpen);
  }
  addRoleType()
  {
    this.isTypeOpen = true;
  }
  saveTypeRole()
  {
    this.isTypeOpen = false;
  }
}