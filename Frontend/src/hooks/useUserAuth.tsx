import { UserAuthContext } from '@/stores/UserAuthStore'
import { useContext } from 'react'

export const useUserAuth = () => {
    const context = useContext(UserAuthContext)
    if (context === undefined) throw new Error("useUserAuth must be used within a UserAuthStore")
    return context
}
