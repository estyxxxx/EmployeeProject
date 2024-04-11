import { Component, Inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { EmployeeService } from '../services/employee.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Employee } from '../entities/employee.model';
import { Role } from '../entities/role.model';
import { RoleService } from '../services/role.service';
import { RoleTypeService } from '../services/role-type.service';
import { RoleType } from '../entities/roleType.model';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddRoleComponent, MatInputModule, MatFormFieldModule, MatRadioModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {

  editForm!: FormGroup;
  tempId = 0;
  isClicked: boolean = false;
  roles: Role[] = [];
  types: RoleType[] = [];
  filteredTypes: RoleType[] = [];
  employee?: Employee;
  
  constructor(
    private employeeService: EmployeeService, private roleService: RoleService, private roleTypeService: RoleTypeService, private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditEmployeeComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
  ) { 
    this.employee = this.data.employee;
  }


  ngOnInit() {
    this.getTypes();
    this.getRoles();
    if(this.employee?.roles == null)
      this.employeeService.roles = [];
    else
      this.employeeService.roles = this.employee?.roles;
      this.editForm = new FormGroup({
        firstName: new FormControl(this.employee?.firstName, Validators.required),
        lastName: new FormControl(this.employee?.lastName, Validators.required),
        identityNumber: new FormControl(this.employee?.identityNumber, [Validators.required, Validators.pattern('^\\d{9}$')]),
        startDate: new FormControl(this.employee?.startDate, Validators.required),
        dateOfBirth: new FormControl(this.employee?.dateOfBirth, Validators.required),
        isFemale: new FormControl(this.employee?.isFemale, Validators.required)
    });
  }
  getRoles()
  {
    this.roleService.getRoles().subscribe( {
      next: (res) => {
        this.roles = res;
        this.roles = this.roles.filter(r => r.employeeId === this.employee?.id);
        for (const role of this.roles) {
          const foundType = this.types.find(t => t.id === role.roleTypeId);
          if (foundType) {
            this.filteredTypes.push(foundType);
          }
        }
      },
      error: (err) => { console.error(err); }
    });
  }
  getTypes()
  {
    this.roleTypeService.types$.subscribe( {
      next: (res) => {
        this.types = res;
      },
      error: (err) => { console.error(err); }
    });
  }
  save(): void {
    if (!this.editForm.valid) {
      this.isClicked = true;
    } else {
      if(this.employee?.id != null)
        this.tempId = this.employee?.id;
      const id = this.tempId;
      const firstName = this.editForm.controls['firstName'].value;
      const lastName = this.editForm.controls['lastName'].value;
      const identityNumber = this.editForm.controls['identityNumber'].value;
      const startDate = this.editForm.controls['startDate'].value;
      const dateOfBirth = this.editForm.controls['dateOfBirth'].value;
      const isFemale = this.editForm.controls['isFemale'].value;
      this.employeeService.updateEmployee(id, firstName, lastName, identityNumber, startDate, dateOfBirth, isFemale).subscribe(
        () => {
          this.employeeService.refreshEmployees();
          Swal.fire({ title: "Done!", text: "Employee updated successfully!", icon: "success"
          });
        },
        (error) => {
          console.error('Error occurred while updating employee:', error);
        }
      );
      this.dialogRef.close();
    }
  }
  cancel() {
    this.dialogRef.close();
  }
  addRole() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '500px',
      data: { types: this.types, employeeId: this.employee?.id || 0 }
    });
  }
}


