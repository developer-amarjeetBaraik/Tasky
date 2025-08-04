import { createContext, useEffect, useState, type ReactNode } from 'react'
import type { callbackErrorType, callbackSuccessType, UserAuthContextType, userObjectType } from '@/types'

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined)

const UserAuthStore = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<userObjectType | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [authLoading, setAuthLoading] = useState<boolean>(true)

    // validate user on page load
    useEffect(() => {
        fetch('/api/auth/validate-me', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            if (res.status === 200) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            return res.json()
        })
            .then(res => {
                if (res.statusCode === 200) {
                    setUser(res?.user)
                }
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
                setAuthLoading(false)
            })
    }, [])

    // login
    const login = (email: string, password: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then(async (res) => {
            if (res.status === 200) {
                setIsAuthenticated(true)
            }
            return res.json()
        }).then(res => {
            if (res?.statusCode === 200) {
                setUser(res?.user)
                callback(null, res)
            } else {
                setIsAuthenticated(false)
                callback(res, null)
            }
        }).catch(err => {
            console.log(err)
            callback({ message: "Internal server error.", error: err }, null)
        }).finally(() => {
            setAuthLoading(false)
        })
    }

    // signup
    const signup = (name: string, email: string, password: string, callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => {
        fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        }).then(async (res) => {
            if (res.status === 201) {
                setIsAuthenticated(true)
            }
            return res.json()
        }).then(res => {
            if (res?.statusCode === 201) {
                setUser(res?.user)
                callback(null, res)
            } else {
                setIsAuthenticated(false)
                callback(res, null)
            }
        }).catch(err => {
            console.log(err)
            callback({ message: "Internal server error.", error: err }, null)
        }).finally(() => {
            setAuthLoading(false)
        })
    }

    // logout
    const logout = (callback: (error: callbackErrorType | null, success: callbackSuccessType | null) => void) => {
        fetch('/api/auth/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async (res) => {
            if (res.status === 200) {
                setIsAuthenticated(false)
                setUser(null)
            }
            return res.json()
        }).then(res => {
            if (res?.statusCode === 200) {
                callback(null, res)
            } else {
                callback(res, null)
            }
        }).catch(err => {
            console.log(err)
            callback({ message: "Internal server error.", error: err }, null)
        }).finally(() => {
            setAuthLoading(false)
        })
    }
    return (
        <UserAuthContext.Provider value={{ user, isAuthenticated, authLoading, login, signup, logout, }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthStore
