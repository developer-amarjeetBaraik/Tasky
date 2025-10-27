import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import heroImage from '../assets/react.svg'


const HeroSection = () => {
    const ctaButtonRef = useRef(null)

    return (
        <section className="relative min-h-full z-10 px-4 py-20 text-white"
        >
            <div className="max-w-7xl mx-auto text-center">
                <div className="mb-8">
                    <span
                        className="px-4 py-2 bg-glass rounded-full border-glassBorder text-accentLight text-sm font-medium border"
                    >
                        ✨ Your productivity hub — simple, fast, and focused.
                    </span>
                </div>

                {/* <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                    Where Creativity
                    <br />
                    Meets Clarity
                    <br />
                    Welcome to
                    <span
                        className="bg-linear-135 from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent ml-4"
                    >
                        {getComputedStyle(root).getPropertyValue('--brand-name')}
                    </span>
                    .
                </h1> */}
                <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                    Organize Smarter. Work Faster. Achieve More.
                </h1>

                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Tasky helps you stay on top of your work with an intuitive, drag-and-drop task board designed for productivity. Create, prioritize, and track your tasks effortlessly — all in one clean interface.
                </p>

                <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
                    <NavLink to={'/dashboard'} id='ctaButtonRef.current' ref={ctaButtonRef} className={`bg-linear-135 from-secondaryLight to-secondary text-white py-[1rem] px-[2rem] text-[1.1rem] rounded-[12px] inline-block font-semibold transition-all duration-2000 ease-[ease] relative overflow-hidden hover:transform -translate-y-[3px] shadow-[0_15px_30px_rgba(240,147,251,0.4)] hover:bg-black`}
                    >
                        Try Now →
                    </NavLink>
                    <NavLink to={'/guest-user'} id='ctaButtonRef.current' ref={ctaButtonRef} className={`bg-linear-135 from-secondaryLight to-secondary text-white py-[1rem] px-[2rem] text-[1.1rem] rounded-[12px] inline-block font-semibold transition-all duration-2000 ease-[ease] relative overflow-hidden hover:transform -translate-y-[3px] shadow-[0_15px_30px_rgba(240,147,251,0.4)] hover:bg-black`}
                    >
                        Try as Guest →
                    </NavLink>
                </div>
            </div>
            <div className='relative mx-auto mt-20 w-auto max-w-[900px] flex justify-center bg-glass rounded-xl border border-glassBorder'>
                <div className='absolute top-2 left-3 flex gap-2'>
                    <div className='w-[14px] h-[14px] rounded-[50%] bg-glass'></div>
                    <div className='w-[14px] h-[14px] rounded-[50%] bg-glass'></div>
                    <div className='w-[14px] h-[14px] rounded-[50%] bg-glass'></div>
                </div>
                <img src={heroImage} alt="" className='w-[98%] mt-8 mb-1.5 rounded-md' />
            </div>
        </section >
    )
}

export default HeroSection