// Join specific board through board id
export const handleJoinBoard = async (socket, namespace, data) => {
    const { boardId, userId } = data
    console.log(`got request to join ${data.boardId} board.`)
    try {
        await socket.join(boardId)
        socket.boardId = boardId
        socket.userId = userId

        // Notify to the new user
        socket.emit('joined-successfully', {
            message: `You joind the board(${boardId}) successfully.`
        })

        // Notify others
        namespace.to(boardId).emit('user-joined-board', {
            userId,
            message: `${userId} joined the room`,
            totalConnectedUsers: namespace.adapter.rooms.get(boardId)?.size || 0
        });
    } catch (error) {
        console.error('Failed to join board:', error);
        socket.emit('error', { message: 'Failed to join room' });
    }
}

// Leave specific board through board id
export const handleLeaveBoard = async (socket, namespace, data) => {
    console.log('got request to leave board.')
    const { boardId, userId } = data
    try {
        await socket.leave(boardId)

        // Notify to the new user
        socket.emit('left-successfully', {
            message: `You left the board(${boardId}) successfully.`
        })

        // Notify others
        namespace.to(boardId).emit('user-left-board', {
            userId,
            message: `${userId} left the room`,
            totalConnectedUsers: namespace.adapter.rooms.get(boardId)?.size || 0
        });
    } catch (error) {
        socket.emit('error', { message: 'Failed to leave room' });
    }
}