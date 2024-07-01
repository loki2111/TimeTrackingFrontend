export class Task {

    id: number;
    username: string='';
    email: string='';
    task: string='';
    loginTime: string=""; // Assuming loginTime is a string; adjust as per your actual data type

    constructor(id: number, username: string, email: string, task: string, loginTime: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.task = task;
        this.loginTime = loginTime;
    }
}
