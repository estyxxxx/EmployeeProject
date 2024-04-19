import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RoleTypeService } from '../services/role-type.service';

@Component({
  selector: 'app-add-role-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-role-type.component.html',
  styleUrl: './add-role-type.component.css'
})
export class AddRoleTypeComponent {

  addTypeForm!: FormGroup;
  isClicked: boolean = false;

  constructor(
    private roleTypeService: RoleTypeService, public dialogRef: MatDialogRef<AddRoleTypeComponent>
  ) { }

  ngOnInit() {
    this.addTypeForm = new FormGroup({
      roleType: new FormControl('', Validators.required)
    });
  }
  save() {
    if (!this.addTypeForm.valid) {
      this.isClicked = true;
    } else {
      const roleType = this.addTypeForm.controls['roleType'].value;
      this.roleTypeService.addType(roleType).subscribe(
        () => {
          Swal.fire({ title: "Done!", text: "Role Type added successfully!", icon: "success"
          });
        },
        (error) => {
          console.error('Error occurred while add role type:', error);
          Swal.fire({ icon: "error", title: "Error", text: "Failed to add role!" });
        }
      );
      this.dialogRef.close();
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}