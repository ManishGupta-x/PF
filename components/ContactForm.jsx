'use client';

import React, { useState } from 'react';
import { Send, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const validateForm = () => {
        const newErrors = {};

        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        
        const hasEmail = formData.email.trim();
        const hasPhone = formData.phone.trim();

        if (!hasEmail && !hasPhone) {
            newErrors.email = 'Either email or phone number is required';
            newErrors.phone = 'Either email or phone number is required';
        } else {
            
            if (hasEmail && !/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            
            if (hasPhone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
                newErrors.phone = 'Please enter a valid phone number';
            }
        }

        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        
        if ((name === 'email' || name === 'phone') && value.trim()) {
            setErrors(prev => ({
                ...prev,
                email: prev.email === 'Either email or phone number is required' ? '' : prev.email,
                phone: prev.phone === 'Either email or phone number is required' ? '' : prev.phone
            }));
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBpEMCwMH6JV1h76KDqfYW9Fef6yTms1F8-s4KiA2IVFrb22BtgnxVcw7qTUd3MhsjSA/exec';

            
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // This prevents CORS errors
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    message: formData.message
                })
            });

            
            
            console.log('Form submitted to Google Sheets');

            setSubmitStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="p-2 mb-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6'>
                        Get In Touch
                    </h1>
                </div>

                <div className="bg-light-tan/40 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-dark-brown/60 font-signika">
                    <div className="space-y-6">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                                    <User className="inline w-4 h-4 mr-2" />
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.name
                                        ? 'border-red-400 bg-red-50'
                                        : 'border-dark-brown/70 bg-white focus:border-amber-500'
                                        }`}
                                    placeholder="Enter your full name"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-amber-900 mb-2">
                                    <Phone className="inline w-4 h-4 mr-2" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.phone
                                        ? 'border-red-400 bg-red-50'
                                        : 'border-dark-brown/70 bg-white focus:border-amber-500'
                                        }`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                                <Mail className="inline w-4 h-4 mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.email
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-dark-brown/70 bg-white focus:border-amber-500'
                                    }`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                       

                        
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                                <MessageSquare className="inline w-4 h-4 mr-2" />
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none ${errors.message
                                    ? 'border-red-400 bg-red-50'
                                    : 'border-dark-brown/70 bg-white focus:border-amber-500'
                                    }`}
                                placeholder="Tell me about your project or inquiry... (minimum 10 characters)"
                            />
                            {errors.message && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${isSubmitting
                                ? 'bg-amber-400 cursor-not-allowed'
                                : 'bg-amber-900 hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-1'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </div>

                    
                    {submitStatus === 'success' && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center text-green-800">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span className="font-medium">Message sent successfully!</span>
                            </div>
                            <p className="mt-1 text-sm text-green-700">
                                Thank you for reaching out. I'll get back to you .
                            </p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center text-red-800">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                <span className="font-medium">Failed to send message</span>
                            </div>
                            <p className="mt-1 text-sm text-red-700">
                                Something went wrong. Please try again or contact me directly.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;