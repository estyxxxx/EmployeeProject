import { RoleType } from "./roleType.model";
import { Employee } from "./employee.model";

export class Role {
    constructor(
        public id: number,
        public roleTypeId: number,
        public roleType: RoleType,
        public entryDate: Date,
        public isManager: boolean,
        public employeeId: number,
        public employee: Employee,
    ){}
}