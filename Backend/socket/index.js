import setupBoardNamespace from "./namespaces/boardNamespace.js";
import setupTaskAiNamespace from "./namespaces/taskAiNamespace.js";

export default function setupSocket(io) {
    // Apply global middleware
    //   io.use(authMiddleware);

    // Setup default namespace
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected to main namespace`);

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    });

    // Setup custom namespaces
    setupBoardNamespace(io);
    setupTaskAiNamespace(io);
}