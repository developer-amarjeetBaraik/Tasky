import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'

const LandingPage = () => {
  return (
    <div className='w-full h-full bg-red flex flex-col items-center'>
      <Navbar/>
      <HeroSection/>
    </div>
  )
}

export default LandingPage
