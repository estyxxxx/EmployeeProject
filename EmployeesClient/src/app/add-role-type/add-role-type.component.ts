import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoleTypeService } from '../services/role-type.service';

@Component({
  selector: 'app-add-role-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-role-type.component.html',
  styleUrl: './add-role-type.component.css'
})
export class AddRoleTypeComponent {

  addTypeForm!: FormGroup;
  isClicked: boolean = false;

  @Output()
  saveEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private roleTypeService: RoleTypeService
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
          Swal.fire({
            title: "Done!",
            text: "Role Type added successfully!",
            icon: "success"
          });
          this.saveEvent.emit();
        },
        (error) => {
          console.error('Error occurred while add role type:', error);
        }
      );
    }
  }
  cancel() {
    this.saveEvent.emit();
  }
}