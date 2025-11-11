import React, { useState, useEffect } from 'react';
import { Check, Zap, Users, Brain, Layout, BarChart3, Lock, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

const KanbanLandingPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for system theme preference or saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

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
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-950' : 'bg-white'}`}>

{/* Navbar */}
<Navbar/>
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Task Management</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Collaborate Smarter,
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Deliver Faster
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              The next-generation Kanban platform with AI assistance and real-time collaboration. 
              Transform how your team works together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                Watch Demo
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
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
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
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
      </section>

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
                className={`relative rounded-2xl p-8 ${
                  plan.popular
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
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    plan.popular
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what our customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "TaskFlow AI transformed how our team collaborates. The AI suggestions are incredibly accurate and save us hours every week.",
                author: "Sarah Johnson",
                role: "Product Manager at TechCorp"
              },
              {
                quote: "Real-time collaboration feels seamless. We've never been more productive. The best project management tool we've used.",
                author: "Michael Chen",
                role: "CTO at StartupXYZ"
              },
              {
                quote: "The analytics dashboard gives us insights we never had before. It's helped us optimize our entire workflow.",
                author: "Emily Rodriguez",
                role: "Operations Lead at InnovateCo"
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 p-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of teams already using TaskFlow AI to achieve more.
            </p>
            <button className="px-8 py-4 rounded-lg bg-white text-blue-600 font-medium hover:shadow-2xl hover:scale-105 transition transform">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 TaskFlow AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Twitter</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KanbanLandingPage;