import { handleTaskNewPrompt } from "../handler/taskAiHandlers.js";

export default function setupTaskAiNamespace(io) {
    const taskAiNamespace = io.of('/task_ai');

    taskAiNamespace.on('connect', (socket) => {
        console.log(`User ${socket.id} connected to task ai`);

        socket.on('new_prompt', (data) => handleTaskNewPrompt(socket, taskAiNamespace, data))

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected from task ai`);
            // Handle cleanup
            taskAiNamespace.emit('user-disconnect', { userId: socket.userId });
        });
    });
}