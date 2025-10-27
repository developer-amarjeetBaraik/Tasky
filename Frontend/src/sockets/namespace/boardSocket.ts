import { SocketManager } from "../socketManager";
import type { JoinBoardPayload, MessagePayload } from "../../types.socket";

class BoardSocketClass extends SocketManager {
    constructor() {
        super("board");
    }

    joinRoom(data: JoinBoardPayload) {
        this.emit("join-board", data);
    }

    sendMessage(data: MessagePayload) {
        this.emit("send-message", data);
    }

    leaveRoom(data: JoinBoardPayload) {
        this.emit("leave-board", data);
    }
}

export const BoardSocket = new BoardSocketClass();
