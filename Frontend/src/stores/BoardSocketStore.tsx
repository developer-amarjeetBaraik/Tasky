import React, { createContext, useEffect, useState } from 'react'
import { BoardSocket } from '@/sockets/namespace/boardSocket'
import { useUserAuth } from '@/hooks/useUserAuth'
import type { BoardSocketContextType } from '@/types.socket'

export const BoardSocketContext = createContext<BoardSocketContextType | undefined>(undefined)

const BoardSocketStore = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserAuth()

    const [isConnectedToBoradSocket, setIsConnectedToBoradSocket] = useState(false)
    const [totalLiveBoardUser, setTotalLiveBoardUser] = useState(undefined)

    // Socket events listeners
    useEffect(() => {
        // Connect board namespace
        BoardSocket.connect()

        // Joined board successfully
        BoardSocket.on('joined-successfully', (data) => {
            setIsConnectedToBoradSocket(true)
            console.log(data)
        })

        //Listen Join board
        BoardSocket.on('user-joined-board', (data) => {
            setTotalLiveBoardUser(data?.totalConnectedUsers)
        })

        // Left board successfully
        BoardSocket.on('left-successfully', (data) => {
            setIsConnectedToBoradSocket(false)
            console.log(data)
        })

        //Listen Leave board
        BoardSocket.on('user-left-board', (data) => {
            console.log(data)
            setTotalLiveBoardUser(data?.totalConnectedUsers)
        })

        return () => {
            BoardSocket.off('connect');
            BoardSocket.off('joined-successfully');
            BoardSocket.off('user-joined-board')
            BoardSocket.off('left-successfully');
            BoardSocket.off('user-left-board')
        };
    }, [])

    //Fn to join board room
    const joinBoardRoom:BoardSocketContextType['joinBoardRoom'] = (boardId) => {
        BoardSocket.joinRoom({ boardId, userId: user?._id! })
    }


    return (
        <BoardSocketContext.Provider value={{ isConnectedToBoradSocket, joinBoardRoom, totalLiveBoardUser }}>
            {children}
        </BoardSocketContext.Provider>
    )
}

export default BoardSocketStore
