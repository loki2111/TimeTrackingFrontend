export class Task {

    id: number;
    username: string='';
    email: string='';
    task: string='';
    loginTime: string="";
    logoutTime: string=""; 

    constructor(id: number, username: string, email: string, task: string, 
        loginTime: string,logoutTime: string) 
        {
        this.id = id;
        this.username = username;
        this.email = email;
        this.task = task;
        this.loginTime = loginTime;
        this.logoutTime = logoutTime;
    }
}
