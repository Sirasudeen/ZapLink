import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Lock, BarChart } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Zap className="h-6 w-6 text-indigo-400" />,
            title: 'Blazing Fast',
            description: 'Our Redis caching layer ensures your links are redirected in the blink of an eye.',
        },
        {
            icon: <Code className="h-6 w-6 text-indigo-400" />,
            title: 'Developer-First API',
            description: 'A simple, powerful API that’s easy to integrate into your own applications.',
        },
        {
            icon: <Lock className="h-6 w-6 text-indigo-400" />,
            title: 'Secure & Private',
            description: 'User-specific links and analytics mean your data stays yours, always.',
        },
        {
            icon: <BarChart className="h-6 w-6 text-indigo-400" />,
            title: 'Powerful Analytics',
            description: 'Track every click and understand your audience with our clean analytics dashboard.',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 text-white">
            <motion.main
                className="mx-auto max-w-4xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.section className="text-center mb-16" variants={itemVariants}>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ color: '#333' }}>
                        About ZapLink
                    </h1>
                    <p style={{ color: '#333' }} className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                        The snappy, modern way to shorten and share links without the fluff.
                    </p>
                </motion.section>

                <motion.section
                    className="bg-black/30 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/10"
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold text-white mb-4">What is ZapLink?</h2>
                    <p className="text-slate-300 leading-relaxed text-lg">
                        ZapLink is a sleek and powerful URL shortener built for developers and everyday users.
                        We believe long, ugly URLs are a thing of the past. Whether you're sharing links across
                        social media, sending a clean reference in an email, or using it in production APIs —
                        ZapLink keeps it fast, efficient, and stylish.
                    </p>

                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">Why ZapLink is Different</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-4"
                                    variants={itemVariants}
                                >
                                    <div className="flex-shrink-0 bg-indigo-500/10 p-3 rounded-full border border-indigo-500/20">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                                        <p className="mt-1 text-slate-400">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            </motion.main>
        </div>
    );
};

export default About;
