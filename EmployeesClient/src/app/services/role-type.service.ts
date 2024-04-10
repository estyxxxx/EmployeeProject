import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoleType } from '../entities/roleType.model';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeService {

  constructor(private http: HttpClient) { }

  getTypes():Observable<RoleType[]>{
    return this.http.get<RoleType[]>(`https://localhost:7272/api/RoleType`);
  }

  addType(roleType : string) {
    const url = 'https://localhost:7272/api/RoleType';
    const roleTypeData = {
      type: roleType
    };
    return this.http.post(url, roleTypeData);
  }
}
