const TestimonialsSection = () => {
    return (
        <>
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
        </>
    )
}

export default TestimonialsSection
