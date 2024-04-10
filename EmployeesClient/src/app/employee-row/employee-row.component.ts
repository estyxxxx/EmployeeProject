import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Employee } from '../entities/employee.model';
import { EmployeeService } from '../services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'tr[app-employee-row]',
  standalone: true,
  imports: [CommonModule, EditEmployeeComponent],
  templateUrl: './employee-row.component.html',
  styleUrl: './employee-row.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeRowComponent {
  
  isOpen: boolean = false;

  @Input()
  employee!: Employee;
  @Input()
  isLogin!: Boolean;

  @Output()
  saveEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private employeeService: EmployeeService
  ) { }

  delete(employee: Employee) {
    employee.isActive = false;
    console.log("employee", employee)
    this.employeeService.updateActivity(employee, false).subscribe(
      () => {
        Swal.fire({
          title: "A deletion has occurred",
          text: `Employee ${employee.id} deleted successfully!`,
          icon: "success"
        });
        this.saveEvent.emit();
        this.employeeService.refreshEmployee();
      },
      (error) => {
        console.error('Error occurred while deleting employee:', error);
      }
    );
  }
  editEmployee() {
    this.isOpen = true;
  }
  saveEditEmployee() {
    this.isOpen = false;
    console.log("save accured2");
  }
}