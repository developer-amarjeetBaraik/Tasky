export interface JoinRoomPayload {
  roomId: string;
  room: string;
}

export interface MessagePayload {
  room: string;
  username: string;
  message: string;
}

export interface DrawData {
  room: string;
  userId: string;
  coordinates: { x: number; y: number };
}

export interface JoinBoardPayload {
  boardId: string;
  userId: string;
}

export type BoardSocketContextType = {
    isConnectedToBoradSocket: Boolean
    joinBoardRoom: (boardId: string) => void
    totalLiveBoardUser: number | undefined
}

export type TaskSocketContextType = {
    askTaskAi: (taskId:string, prompt:string) => void
}