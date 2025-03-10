    import React from 'react'

    export default function From() {
        return (
            <div className="max-w-lg mx-auto p-8 bg-gray-100 rounded-xl shadow-md" style={{height:"100%"}}>
                <h3 className="text-blue-600 font-semibold text-center">Get In Touch</h3>
                <h2 className="text-2xl font-bold text-center mb-6">Have Any Question?</h2>
                <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                    type="tel"
                    placeholder="phone Number"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    />
                    <input
                    type="text"
                    placeholder="Subject"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    />
                </div>
                <textarea
                placeholder="Message"
                className="w-full p-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required        
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                >
                    Submit Now
                </button>
                </form>
            </div>
            );
    }
