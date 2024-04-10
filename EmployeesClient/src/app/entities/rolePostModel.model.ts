export class RolePostModel {
    constructor(
        public roleTypeId: number,
        public entryDate: Date,
        public isManager: boolean,
        public employeeId: number,
    ){}
}