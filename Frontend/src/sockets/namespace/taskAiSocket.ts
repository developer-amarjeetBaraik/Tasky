import { SocketManager } from "../socketManager";

class taskAiSocketClass extends SocketManager{
    constructor(){
        super("task_ai")
    }

    newMessage(data:{taskId:string, prompt:string}){
        this.emit('new_prompt',data)
    }
}

export const TaskAiSocket = new taskAiSocketClass();