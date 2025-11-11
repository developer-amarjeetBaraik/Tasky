
const CallToAction = () => {
    return (
        <>
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
        </>
    )
}

export default CallToAction
