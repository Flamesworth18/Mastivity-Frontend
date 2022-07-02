export interface Program{
    id: string;
    programAbbreviation: string;
    programName: string;
    semester: string;
    schoolYear: string;
    department: string;
    subjects: {
        id: string,
        subjectName: string,
    }[];
}