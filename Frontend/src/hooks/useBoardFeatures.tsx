import { BoardContext } from "@/stores/BoardStore"
import { useContext } from "react"

export const useBoardFeatures = () => {
    const context = useContext(BoardContext)
    if (context === undefined) throw new Error("useBoardFeatures must be used within a BoardStore")
    return context
}