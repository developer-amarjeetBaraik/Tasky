import { NavLink } from 'react-router-dom';
import { useRef } from 'react';


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
            </div>

            {/* Hero Image/Visual */}
            <div className="mt-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 blur-3xl"></div>
                <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900">
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['To Do', 'In Progress', 'Completed'].map((column, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{column}</h3>
                                    <div className="space-y-2">
                                        {[1, 2].map((card) => (
                                            <div key={card} className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded w-1/2"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default HeroSection