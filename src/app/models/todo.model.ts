export interface ToDo{
    id: string;
    title: string;
    author: string;
    tasks: {
        id: string,
        title: string,
        author: string,
        isCompleted: boolean,
        status: string,
        dateCreated: string,
        dateUpdated: string
    }[];
    taskCompleted: number;
    dueDate: Date;
    statusId: number;
    isArchived: boolean;
    dateCreated: string;
    dateUpdated: string;
}