import { useUserAuth } from '@/hooks/useUserAuth'
import type { board, BoardContextType } from '@/types'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'


export const BoardContext = createContext<BoardContextType | undefined>(undefined)

const BoardStore = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useUserAuth()
    const [boards, setBoards] = useState<board[] | null>(null)
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const [boardLoading, setBoardLoading] = useState<boolean>(true)
    const [activeBoard, setActiveBoard] = useState<board | null>(null)

    // check if the user is admin of the board
    useEffect(() => {
        if (activeBoard?.canEdit) {
            for (const e of activeBoard?.canEdit!) {
                console.log(e)
                if (e._id === user?._id) {
                    setIsUserAdmin(true)
                    break;
                } else {
                    setIsUserAdmin(false)
                }
            }
        }
    }, [activeBoard])

    // fetch all boards
    useEffect(() => {
        if (isAuthenticated) {
            fetch('/api/board/all-boards', {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    if (res.statusCode === 200) {
                        setBoards(res.boards)
                        toast.success(res.message)
                    } else {
                        setBoards(null)
                        toast.error(res.message)
                    }
                }).catch(err => {
                    setBoards(null)
                    toast.error("Someting went wrong.")
                    console.log(err)
                }).finally(() => {
                    setBoardLoading(false)
                })
        }
    }, [isAuthenticated])

    return (
        <BoardContext.Provider value={{ boards, isUserAdmin, boardLoading, activeBoard, setActiveBoard }}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardStore
