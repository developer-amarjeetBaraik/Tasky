import CallToAction from '@/components/CallToAction'
import FeaturesSection from '@/components/FeaturesSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import PricingSection from '@/components/PricingSection'
import TestimonialsSection from '@/components/TestimonialsSection'

const LandingPage = () => {
  return (
    <div className='w-full h-full bg-red flex flex-col items-center'>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <PricingSection/>
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default LandingPage
