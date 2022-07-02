export interface Subject{
    id: string;
    subjectCode: string;
    subjectName: string;
    startingTime: string;
    endingTime: string;
    startingTimeView: string;
    endingTimeView: string;
    startingDate: string;
    endingDate: string;
    days: {
        id: string;
        abbreviation: string
    }[];
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