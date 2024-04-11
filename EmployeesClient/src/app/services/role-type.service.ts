import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoleType } from '../entities/roleType.model';

@Injectable({
  providedIn: 'root'
})
export class RoleTypeService {

  constructor(private http: HttpClient) { 
    this.refreshTypes();
  }

  private typesSubject: BehaviorSubject<RoleType[]> = new BehaviorSubject<RoleType[]>([]);
  public types$: Observable<RoleType[]> = this.typesSubject.asObservable();

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
  refreshTypes() {
    this.getTypes().subscribe(types => {
      this.typesSubject.next(types);
    });
  }
}
