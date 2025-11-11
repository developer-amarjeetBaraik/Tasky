import { Check } from 'lucide-react';
const PricingSection = () => {
    const plans = [
        {
            name: "Starter",
            price: "0",
            description: "Perfect for individuals",
            features: [
                "Up to 3 boards",
                "Basic AI assistance",
                "5 team members",
                "7-day history",
                "Email support"
            ]
        },
        {
            name: "Professional",
            price: "29",
            description: "For growing teams",
            features: [
                "Unlimited boards",
                "Advanced AI features",
                "Unlimited team members",
                "Unlimited history",
                "Priority support",
                "Custom workflows",
                "Analytics dashboard"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "99",
            description: "For large organizations",
            features: [
                "Everything in Professional",
                "Dedicated AI models",
                "SSO & SAML",
                "Advanced security",
                "Custom integrations",
                "24/7 phone support",
                "SLA guarantee"
            ]
        }
    ];
    return (
        <>
            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Choose the perfect plan for your team
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative rounded-2xl p-8 ${plan.popular
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-105'
                                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="px-4 py-1 rounded-full bg-yellow-400 text-gray-900 text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                                    {plan.description}
                                </p>
                                <div className="mb-6">
                                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                        ${plan.price}
                                    </span>
                                    <span className={plan.popular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}>
                                        /month
                                    </span>
                                </div>
                                <button
                                    className={`w-full py-3 rounded-lg font-medium transition ${plan.popular
                                        ? 'bg-white text-blue-600 hover:bg-gray-100'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                                        }`}
                                >
                                    Get Started
                                </button>
                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start space-x-3">
                                            <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                                            <span className={plan.popular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default PricingSection
