import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Employee } from '../entities/employee.model';
import { EmployeeService } from '../services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'tr[app-employee-row]',
  standalone: true,
  imports: [CommonModule, EditEmployeeComponent],
  templateUrl: './employee-row.component.html',
  styleUrl: './employee-row.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeRowComponent {

  @Input()
  employee!: Employee;
  @Input()
  isLogin!: Boolean;

  constructor(
    private employeeService: EmployeeService, private dialog: MatDialog
  ) { }

  delete(employee: Employee) {
    employee.isActive = false;
    this.employeeService.updateActivity(employee).subscribe(
      () => {
        Swal.fire({ title: "A deletion has occurred", text: `Employee ${employee.id} deleted successfully!`, icon: "success"
        });
        this.employeeService.refreshEmployees();
      },
      (error) => {
        console.error('Error occurred while deleting employee:', error);
      }
    );
  }
  editEmployee() {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '600px',
      data: { employee: this.employee }
    });
  }
}