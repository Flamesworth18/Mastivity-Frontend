import { Note } from './note.model';
import { ToDo } from './todo.model';
import { Schedule } from "./schedule.model";

export interface User{
    id: string,
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    passwordHash: string,
    passwordSalt: string,
    verificationToken: string,
    isVerify: boolean;
    passwordResetToken: string;
    passwordTokenExpires: Date;
    programHandled: {
        id: string;
        programName: string;
    }[];
    subjectHandled: {
        id: string;
        subjectName: string;
    }[];
    studentHandled: {
        id: string;
        studentName: string;
    }[];
    schedules: Array<Schedule>,
    notes: Array<Note>,
    todos: Array<ToDo>,
    role: string
    userCreated: any;
}