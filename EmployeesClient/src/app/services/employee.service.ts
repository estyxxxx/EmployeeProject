import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { Employee } from "../entities/employee.model";
import { RolePostModel } from "../entities/rolePostModel.model";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

  roles: RolePostModel[] = [];

  constructor(private http: HttpClient) { 
    this.refreshEmployee();
  }

  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`https://localhost:7272/api/Employee`);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7272/api/Employee/${id}`);
  }
  updateActivity(employee: Employee, isActive: boolean): Observable<void> {
    if (employee.id == null)
        employee.id = 0;
    const url = `https://localhost:7272/api/Employee/${employee.id}/isActive`;
    return this.http.put<void>(url, employee);
  }
  updateEmployee(id: Number, firstName : string, lastName : string, identityNumber: number, startDate: Date, dateOfBirth: Date, isFemale: Boolean): Observable<void> {
    const employee = {
      firstName: firstName,
      lastName: lastName,
      identityNumber: identityNumber,
      startDate: startDate,
      dateOfBirth: dateOfBirth,
      isFemale: isFemale,
      roles: this.roles
    };
    if (id == 0)
    {
      const url = 'https://localhost:7272/api/Employee';
      this.roles = [];
      console.log(employee);
      return this.http.post<void>(url, employee);
    }
    else
    {
      const url = `https://localhost:7272/api/Employee/${id}`;
      this.roles = [];
      return this.http.put<void>(url, employee);
    }
  }
  refreshEmployee() {
    this.getEmployees().subscribe(employees => {
      this.employeesSubject.next(employees);
    });
  }
  addRole(roleTypeId: number, entryDate : Date, isManager: boolean, employeeId: number) {
    const roleData = {
      roleTypeId: roleTypeId,
      entryDate: entryDate, 
      isManager: isManager, 
      employeeId: employeeId
    };
    this.roles.push(roleData);
  }
}