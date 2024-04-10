import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { RoleType } from '../entities/roleType.model';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  addForm!: FormGroup;
  tempIsManager = true;
  isClicked: boolean = false;

  @Input()
  employeeId!: number;
  @Input()
  types: RoleType[] = [];
  
  @Output()
  saveEvent: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
    private employeeService: EmployeeService
  ) { }

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
      console.log("add role", this.employeeService.roles);
      this.saveEvent.emit();
    }
  }
  cancel() {
    this.saveEvent.emit();
  }
}
