import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../entities/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>('https://localhost:7272/api/Role');
  }

  addRole(roleTypeId: Number, entryDate : Date, isManager: boolean, employeeId: number) {
    const url = 'https://localhost:7272/api/Role';
    const roleData = {
      roleTypeId: roleTypeId, 
      entryDate: entryDate, 
      isManager: isManager, 
      employeeId: employeeId
    };
    console.log(roleData);
    return this.http.post(url, roleData);
  }
}
