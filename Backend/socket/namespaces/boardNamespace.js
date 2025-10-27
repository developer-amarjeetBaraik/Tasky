import { handleJoinBoard, handleLeaveBoard } from "../handler/boardHandlers.js";

export default function setupBoardNamespace(io) {
  const boardNamespace = io.of('/board');

  boardNamespace.on('connect', (socket) => {
    console.log(`User ${socket.id} connected to board`);

    // Bind event handlers
    socket.on('join-board', (data) => handleJoinBoard(socket, boardNamespace, data));

    // Leave board
    socket.on('leave-board', (data) => handleLeaveBoard(socket, boardNamespace, data))

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected from board`);
      // Handle cleanup
      boardNamespace.emit('user-disconnect', { userId: socket.userId });
    });
  });
}