import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../services/employee.service';
import { RoleType } from '../entities/roleType.model';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  addForm!: FormGroup;
  tempIsManager = true;
  isClicked: boolean = false;
  types!: RoleType[]; 
  employeeId!: number
  
  constructor(
    private employeeService: EmployeeService, public dialogRef: MatDialogRef<AddRoleComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { types: RoleType[], employeeId: number }
   ) { 
    this.types = this.data.types;
    this.types = this.data.types;
}
  
  ngOnInit() {
    this.addForm = new FormGroup({
      roleTypeId: new FormControl('', Validators.required),
      entryDate: new FormControl('', Validators.required),
      isManager: new FormControl('', Validators.required)
    });
  }
  save() {
    if (!this.addForm.valid) {
      this.isClicked = true;
    } else {
      if (this.addForm.controls['isManager'].value == 1)
        this.tempIsManager = false;
      this.employeeService.addRole(this.addForm.controls['roleTypeId'].value, this.addForm.controls['entryDate'].value, this.tempIsManager, this.employeeId);
      this.dialogRef.close();
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
