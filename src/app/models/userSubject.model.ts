export interface UserSubject{
    id: string;
    subjectCode: string;
    subjectName: string;
    startingTime: any;
    endingTime: any;
    startingTimeView: string;
    endingTimeView: string;
    startingDate: string;
    endingDate: string;
    daysView: string;
    onMonday: boolean;
    onTuesday: boolean;
    onWednesday: boolean;
    onThursday: boolean;
    onFriday: boolean;
    department: string;
    students: {
        id: string,
        fullName: string;
        status: string;
        remarks: string;
    }[]
}