import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

// restrict if the user is unauthenticated
export const AuthProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, authLoading } = useUserAuth()
    if (authLoading) return <LoadingSpinner />
    if (isAuthenticated === false) {
        return <Navigate to='/auth/login' replace />
    }
    return <>{children}</>
}

// restrict if the user is authenticated
export const RestrictIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, authLoading } = useUserAuth()
    if (authLoading) return <LoadingSpinner />
    if (isAuthenticated) {
        return <Navigate to='/dashboard' replace />
    }
    return <>{children}</>
}

// restrict if the user is not member of board
export const CheckBoardMembership = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const { boardId } = useParams()
    const { boardLoading, boards, setActiveBoard } = useBoardFeatures()


    const b = boards?.filter(board => board._id === boardId)
    const activeBoard = b && b.length > 0 ? b[0] : null

    useEffect(() => {
        if (activeBoard) {
            setActiveBoard(activeBoard)
        }
    }, [activeBoard, setActiveBoard])

    useEffect(() => {
        if (!boardLoading && !activeBoard) {
            alert(`You are unauthorised for board id: ${boardId}`)
            navigate('/dashboard')
            return
        }
    }, [boardLoading, activeBoard])

    if (boardLoading) return <LoadingSpinner />

    return <>{children}</>
}