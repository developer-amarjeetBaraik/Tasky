import { SocketManager } from "../socketManager";

class taskAiSocketClass extends SocketManager{
    constructor(){
        super("task_ai")
    }
}

export const taskAiSocket = new taskAiSocketClass();