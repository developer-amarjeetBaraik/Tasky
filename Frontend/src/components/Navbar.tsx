import { NavLink } from 'react-router-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from './ui/mode-toggle';
import { Button } from './ui/button'
import AppLogo from './ui/AppLogo'
import { useUserAuth } from '@/hooks/useUserAuth';
import { Skeleton } from './ui/skeleton';
import ProfileMenu from './ui/ProfileMenu';

const navigationLinks: { name: string, path: string }[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Contact',
    path: '/contact'
  },
]

const Navbar = () => {
  const { user, isAuthenticated, authLoading } = useUserAuth()
  return (
    <nav className='w-full flex justify-between items-center'>
      {/* App logo */}
      <div className="left">
        <AppLogo />
      </div>
      {/* App navigation menu */}
      <div className="middle">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {
                navigationLinks.map(({ name, path }) => (
                  <NavLink key={path} to={path} className={({ isActive }: { isActive: boolean }) => cn(navigationMenuTriggerStyle(), isActive && "underline", "bg-transparent dark:text-white")}>
                    <NavigationMenuLink asChild>
                      <span>{name}</span>
                    </NavigationMenuLink>
                  </NavLink>
                ))
              }
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Auth or dashboard, profile links */}
      <div className="right flex justify-center items-center gap-2.5">
        {/* Theme toggler */}
        <ModeToggle />
        {/* conditional rendering loading, authenticated, not authnticated */}
        {
          authLoading ? <>
            <Skeleton className='w-[80px] h-[30px] rounded-sm' />
            <Skeleton className='w-[35px] h-[35px] rounded-[50%]' />
          </> : <>{isAuthenticated ? <div className='flex justify-center items-center gap-3.5'>
            {/* Dashboard link */}
            <NavLink to='/dashboard'><Button>Dashboard</Button></NavLink>
            {/* User avatar */}
            <ProfileMenu/>
          </div> : <>
            {/* User auth links */}
            <span className='flex justify-center items-center gap-2.5'>
              <NavLink to='/auth/login'><Button variant="outline">Login</Button></NavLink>
              <NavLink to='/auth/signup'><Button>Signup</Button></NavLink>
            </span>
          </>}
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar
