// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Tools from '../components/Tools/Tools';
import { Link } from 'react-router-dom';

const Home = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stats = [
        { number: '50K+', label: 'PDFs Processed', icon: '📊', color: 'from-blue-600 to-blue-700' },
        { number: '99.9%', label: 'Service Uptime', icon: '⚡', color: 'from-emerald-600 to-emerald-700' },
        { number: '24/7', label: 'Enterprise Support', icon: '🛡️', color: 'from-amber-600 to-amber-700' },
        { number: '256-bit', label: 'SSL Encryption', icon: '🔒', color: 'from-indigo-600 to-indigo-700' }
    ];

    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Enterprise Performance',
            description: 'Optimized infrastructure for lightning-fast processing with 99.9% uptime SLA',
            color: 'border-blue-500'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: 'Enterprise Security',
            description: 'Military-grade encryption with SOC 2 compliance and automated file deletion',
            color: 'border-emerald-500'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Professional Tools',
            description: 'Comprehensive suite for document management, conversion, and collaboration',
            color: 'border-purple-500'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            title: 'Seamless Integration',
            description: 'API-first architecture with webhooks and real-time synchronization',
            color: 'border-amber-500'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'Advanced Analytics',
            description: 'Real-time insights, usage metrics, and performance monitoring',
            color: 'border-cyan-500'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            title: 'Team Collaboration',
            description: 'Role-based access control and team management features',
            color: 'border-pink-500'
        }
    ];

    const testimonials = [
        {
            name: 'Alexandra Chen',
            role: 'CTO',
            company: 'Fortune 500 Tech',
            content: 'The enterprise tools have transformed our document workflow, saving us over 200 hours monthly.',
            avatar: 'AC',
            logo: '🏢'
        },
        {
            name: 'Marcus Rodriguez',
            role: 'Operations Director',
            company: 'Global Bank',
            content: 'Security compliance and reliability are exceptional. Perfect for regulated industries.',
            avatar: 'MR',
            logo: '🏦'
        },
        {
            name: 'Dr. Sarah Johnson',
            role: 'Research Director',
            company: 'Healthcare Corp',
            content: 'The batch processing capabilities have accelerated our research documentation by 3x.',
            avatar: 'SJ',
            logo: '🏥'
        }
    ];

    const partners = [
        { name: 'Microsoft', icon: '💼' },
        { name: 'Google', icon: '🔍' },
        { name: 'Amazon', icon: '☁️' },
        { name: 'IBM', icon: '🧠' },
        { name: 'Salesforce', icon: '⚡' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Minimal Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-indigo-500/5 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* Navigation Bar */}
            

            {/* Hero Section */}
            <div className="relative pt-40 pb-28 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-4 py-2 rounded-full mb-8">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-blue-700">
                                Trusted by enterprises worldwide
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                            <span className="text-gray-900">Enterprise-Grade</span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Document Solutions
                            </span>
                        </h1>
                        
                        {/* Subheadline */}
                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Professional toolkit for document processing, conversion, and management. 
                            Built for teams that demand security, reliability, and performance.
                        </p>

                        {/* CTA Buttons */}
                        {/* <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                            <Link 
                                to="/get-started" 
                                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <span>Start Free Trial</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            
                            <Link 
                                to="/demo" 
                                className="inline-flex items-center justify-center gap-3 bg-white text-gray-800 px-10 py-4 rounded-xl font-semibold text-lg border-2 border-gray-300 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Book a Demo</span>
                            </Link>
                        </div> */}

                        {/* Trust Indicators */}
                        {/* <div className="mb-12">
                            <p className="text-gray-500 text-sm font-medium mb-6">TRUSTED BY INDUSTRY LEADERS</p>
                            <div className="flex flex-wrap justify-center items-center gap-8">
                                {partners.map((partner, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                                        <span className="text-xl">{partner.icon}</span>
                                        <span className="font-medium">{partner.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div 
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300"
                                >
                                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Preview Section */}
            <div className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Professional Toolkit
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive suite of tools designed for professional workflows
                        </p>
                    </div>
                    <Tools limit={8} />
                    {/* <div className="text-center mt-12">
                        <Link 
                            to="/tools"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
                        >
                            Explore All Tools
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Features Grid */}
            {/* <div className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Enterprise Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Built with security, scalability, and performance in mind
                        </p>
                    </div> */}
                    
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="group bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 ${feature.color} bg-gradient-to-br from-white to-gray-50 mb-6 text-blue-600 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <Link to="/features" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Learn more
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div> */}
                {/* </div>
            </div> */}

            {/* Testimonials */}
            <div className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Trusted by Industry Leaders
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-3xl">{testimonial.logo}</div>
                                </div>
                                
                                <p className="text-gray-700 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                                    "{testimonial.content}"
                                </p>
                                
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="text-sm font-medium text-gray-900">{testimonial.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section
            <div className="py-24 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                        Ready to Transform Your Workflow?
                    </h2>
                    
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Join thousands of enterprises that trust our platform for mission-critical document operations.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/get-started"
                            className="group relative inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-12 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <span>Start Enterprise Trial</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        
                        <Link 
                            to="/contact-sales"
                            className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-12 py-5 rounded-xl font-bold text-lg border-2 border-white/30 hover:border-white transition-all duration-300 hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>Contact Sales</span>
                        </Link>
                    </div>
                    
                    <p className="mt-8 text-blue-200 text-sm">
                        30-day free trial • Enterprise SLA • Dedicated support • SOC 2 compliant
                    </p>
                </div>
            </div> */}

            {/* Footer */}
            
        </div>
    );
};

export default Home;