import { useUserAuth } from '@/hooks/useUserAuth'
import type { board, BoardContextType } from '@/types'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'


export const BoardContext = createContext<BoardContextType | undefined>(undefined)

const BoardStore = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useUserAuth()
    const [boards, setBoards] = useState<board[] | null>(null)
    const [boardLoading, setBoardLoading] = useState<boolean>(true)
    const [activeBoard, setActiveBoard] = useState<board | null>(null)

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
        <BoardContext.Provider value={{ boards, boardLoading, activeBoard, setActiveBoard }}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardStore
