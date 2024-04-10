import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { EmployeeRowComponent } from '../employee-row/employee-row.component';
import { Employee } from '../entities/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-table',
  imports: [CommonModule, EmployeeRowComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  public employees: Employee[] = [];
  public filteredEmployees: Employee[] = [];
  public filterForm!: FormGroup;
  @Input()
  isLogin!: Boolean;

  constructor(
    private employeeService: EmployeeService
  ) { }
  
  ngOnInit() {

    this.filterForm = new FormGroup({
      search: new FormControl('')
    });

    this.subscribeToFormChanges();

    this.employeeService.employees$.subscribe({
      next: (res) => {
        this.employees = res.filter(employee => employee.isActive);
        this.filterEmployees();
      },
      error: (err) => { console.error(err); }
    });
  }
  private subscribeToFormChanges() {
    this.filterForm.get('search')?.valueChanges.subscribe(() => {
      this.filterEmployees();
    });
  }
  filterEmployees() {
    const searchValue = this.filterForm.controls['search'].value.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => (
        searchValue === '' ||
        employee.firstName.toLowerCase().includes(searchValue) ||
        employee.lastName.toLowerCase().includes(searchValue) ||
        employee.identityNumber.toString().toLowerCase().includes(searchValue) ||
        employee.startDate.toString().toLowerCase().includes(searchValue)));
  }
  exportToExcel(): void {
    const filteredEmployees = this.employees.map(({ roles, isActive,...rest }) => rest);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredEmployees);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'Employees.xlsx');
  }
}