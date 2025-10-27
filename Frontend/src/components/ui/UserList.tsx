import { useBoardFeatures } from '@/hooks/useBoardFeatures'
import UserAvatar from './UserAvatar'
import { useEffect, useState } from 'react'
import type { userObjectType } from '@/types'

const UserList = ({ searchQuery, hideId, hideEmail, hideAvatar, onUserClick }: { searchQuery?: string, hideId?: boolean, hideEmail?: boolean, hideAvatar?: boolean, onUserClick?: (user: userObjectType) => void }) => {
    const { activeBoard } = useBoardFeatures()
    const [listedUser, setListedUser] = useState<userObjectType[]>(activeBoard?.canEdit!)

    useEffect(() => {
        activeBoard?.canEdit && setListedUser(() => (
            activeBoard?.canEdit!.filter(user => user._id.includes(searchQuery!) || user.email.includes(searchQuery!) || user.name.includes(searchQuery!))
        ))
    }, [searchQuery])

    return (
        activeBoard ? <div className='relative p-2 max-h-44 border border-border rounded-lg flex flex-col items-center space-y-2 divide-y overflow-y-scroll custom-scrollbar'>
            <p className='self-start'>Total user count: {listedUser.length}</p>
            {
                listedUser.map(user => (
                    <li key={user._id} onClick={() => onUserClick && onUserClick(user)} className='flex justify-between items-center gap-1 flex-wrap [&>p]:max-w-[20%] [&>p]:truncate cursor-pointer'>
                        {!hideAvatar && <UserAvatar user={user} />}
                        <p>{user.name}</p>
                        {!hideEmail && <p>{user.email}</p>}
                        {!hideId && <p>{user._id}</p>}
                    </li>
                ))
            }
        </div> : null
    )
}

export default UserList
