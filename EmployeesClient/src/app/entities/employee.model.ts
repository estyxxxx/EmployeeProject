import { Role } from "./role.model";

export class Employee {
    constructor(
        public id: number,
        public firstName : string,
        public lastName : string,
        public identityNumber: number,
        public startDate: Date,
        public dateOfBirth: Date,
        public isFemale: Boolean,
        public roles: Role[],
        public isActive: Boolean
    ){}
}