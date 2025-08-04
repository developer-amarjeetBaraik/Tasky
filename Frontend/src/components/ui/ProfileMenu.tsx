import { useUserAuth } from "@/hooks/useUserAuth"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toLocalDateOnly } from "@/lib/utils"
import { Button } from "./button"
import { toast } from "sonner"

const ProfileMenu = () => {
    const { user,logout } = useUserAuth()

    const handleLogoutClick = () => {
        logout((error, success)=>{
            if(error){
                return toast.error(error.message)
            }
            if(success){
                return toast.success(success.message)
            }
        })
    }

    return (<>
        <DropdownMenu>
            <Avatar className="h-full max-h-10 aspect-square p-2 flex justify-center items-center border-2 rounded-[50%]" >
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </DropdownMenuTrigger>
            </Avatar>
            <DropdownMenuContent className="relative right-0">
                <DropdownMenuLabel>User Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Id: {user?._id}</DropdownMenuItem>
                <DropdownMenuItem>Email: {user?.name}</DropdownMenuItem>
                <DropdownMenuItem>Email: {user?.email}</DropdownMenuItem>
                <DropdownMenuItem>CreatedAt: {toLocalDateOnly(user?.createdAt)}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Button onClick={handleLogoutClick} variant="destructive" className="w-full cursor-pointer">Logout</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
    )
}

export default ProfileMenu
