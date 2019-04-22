export class Student {
    constructor(
        public ID: number,
        public FirstName: string,
        public Category: string,
        public DocumentsList: boolean[],
        public DOB: string,
        public FatherName: string,
        public MotherName: string,
        public LastScore: number
    ) { }
}
