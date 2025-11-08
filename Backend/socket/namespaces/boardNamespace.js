import authenticateSocket from "../../middlewares/authenticateSocket.js";
import { handleJoinBoard, handleLeaveBoard } from "../handler/boardHandlers.js";

export default function setupBoardNamespace(io) {
  const boardNamespace = io.of('/board');

  boardNamespace.use(authenticateSocket)

  boardNamespace.on('connect', (socket) => {

    // Bind event handlers
    socket.on('join-board', (data) => handleJoinBoard(socket, boardNamespace, data));

    // Leave board
    socket.on('leave-board', (data) => handleLeaveBoard(socket, boardNamespace, data))

    socket.on('disconnect', () => {
      // Handle cleanup
      boardNamespace.emit('user-disconnect', { userId: socket.userId });
    });
  });
}