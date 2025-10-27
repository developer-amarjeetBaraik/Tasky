import { BoardSocketContext } from "@/stores/BoardSocketStore"
import { BoardContext } from "@/stores/BoardStore"
import { useContext } from "react"

export const useBoardFeatures = () => {
    const BoardCtx = useContext(BoardContext)
    const BoardSocketCtx = useContext(BoardSocketContext)
    if (BoardCtx === undefined) throw new Error("useBoardFeatures must be used within a BoardStore")
    if (BoardSocketCtx === undefined) throw new Error("useBoardFeatures must be used within a BoardSocketStore")
    return { ...BoardCtx, ...BoardSocketCtx }
}