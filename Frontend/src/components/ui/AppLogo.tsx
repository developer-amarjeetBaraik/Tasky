import { cn } from '@/lib/utils'
import React from 'react'
import { NavLink } from 'react-router-dom'

const AppLogo = ({ className, noRedirect }: { className?: String, noRedirect?: boolean }) => {
    return (
        <NavLink to={noRedirect ? '#' : '/'} className={cn("font-vibur text-black text-4xl dark:text-white", className)}>Tasky</NavLink>
    )
}

export default AppLogo
