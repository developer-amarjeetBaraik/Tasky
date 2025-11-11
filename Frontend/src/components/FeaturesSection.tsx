import { Zap, Users, Brain, Layout, BarChart3, Lock } from 'lucide-react';

 const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Assistance",
      description: "Smart task suggestions, automated categorization, and intelligent insights to boost your productivity."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-Time Collaboration",
      description: "Work together seamlessly with WebSocket-powered live updates and instant synchronization."
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Advanced Board Management",
      description: "Customize workflows with unlimited boards, columns, and flexible organizational structures."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance ensuring smooth interactions even with thousands of tasks."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track team productivity with comprehensive reporting and visual dashboards."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and role-based access control to keep your data safe."
    }
  ];

const FeaturesSection = () => {
    return (<>
        {/* Features Section */}
        < section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50" >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Everything you need to succeed
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Powerful features designed to help teams collaborate better and achieve more.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:scale-105 transition transform"
                        >
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    </>
    )
}

export default FeaturesSection
